-- Casho Languages Database Schema for Cloudflare D1
-- This schema matches the source SQLite database structure

CREATE TABLE IF NOT EXISTS "language" (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    terminology_code TEXT NOT NULL DEFAULT '',
    bibliographic_code TEXT NOT NULL DEFAULT '',
    two_letter_code TEXT NOT NULL DEFAULT '',
    endonym TEXT NOT NULL DEFAULT '',
    default_direction TEXT,
    spacing TEXT,
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS "language_region" (
    language TEXT NOT NULL,
    region_code TEXT NOT NULL,
    region_name_english TEXT NOT NULL,
    region_name_native TEXT NOT NULL,
    language_name_in_region TEXT NOT NULL,
    PRIMARY KEY (language, region_code)
);

CREATE TABLE IF NOT EXISTS "language_script" (
    language TEXT NOT NULL,
    script_variant TEXT NOT NULL,
    script_name_local TEXT NOT NULL,
    language_in_script TEXT NOT NULL,
    PRIMARY KEY (language, script_variant)
);

CREATE TABLE IF NOT EXISTS "script" (
    code TEXT PRIMARY KEY,
    numeric_code INTEGER NOT NULL,
    name_english TEXT NOT NULL,
    pva TEXT NOT NULL DEFAULT '',
    unicode_version TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS "country" (
    numeric3 INTEGER PRIMARY KEY,
    alpha2 TEXT,
    alpha3 TEXT,
    name_english TEXT,
    name_local TEXT
);

CREATE TABLE IF NOT EXISTS "flag_svg" (
    code TEXT PRIMARY KEY,
    data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "language_flag_order" (
    language_code TEXT NOT NULL,
    country_code TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    PRIMARY KEY (language_code, country_code)
);

CREATE TABLE IF NOT EXISTS "language_script_flag_order" (
    language_code TEXT NOT NULL,
    script_variant TEXT NOT NULL,
    country_code TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    PRIMARY KEY (language_code, script_variant, country_code)
);

-- Create indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_language_two_letter ON language(two_letter_code);
CREATE INDEX IF NOT EXISTS idx_language_terminology ON language(terminology_code);
CREATE INDEX IF NOT EXISTS idx_language_bibliographic ON language(bibliographic_code);
CREATE INDEX IF NOT EXISTS idx_language_endonym ON language(endonym);
CREATE INDEX IF NOT EXISTS idx_language_name ON language(name);

CREATE INDEX IF NOT EXISTS idx_language_region_language ON language_region(language);
CREATE INDEX IF NOT EXISTS idx_language_script_language ON language_script(language);

CREATE INDEX IF NOT EXISTS idx_language_flag_order_lang ON language_flag_order(language_code);
CREATE INDEX IF NOT EXISTS idx_language_script_flag_order_lang ON language_script_flag_order(language_code, script_variant);

