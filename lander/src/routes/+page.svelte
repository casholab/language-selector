<script lang="ts">
	const apiUrl = "http://localhost:8787";
	import { LanguageSelector} from "language-selector-svelte";
</script>

<svelte:head>
	<title>CashoLab Language Selector - A Comprehesive Language Selector Component Library</title>
	<meta name="description" content="The most comprehensive language selector component library for modern web applications with libraries for React, Svelte, and embedded HTML.  Supporting 7000+ languages, 400+ endonyms, regions, and scripts. ">
	<meta name="author" content="CashoLab">
	<script src="http://localhost:8080/embed/loader.js" async></script>
</svelte:head>

<div class="home">
	<section class="hero">
		<div class="hero-left">
			<span class="hero-badge">Open Source</span>
			<h1 class="hero-title">The Most Comprehensive Language Selector</h1>
			<p class="hero-desc">
				Production-ready language selector components for modern web applications. 
				Built with accessibility and internationalization in mind.
			</p>
			
			<a href="/playground" class="hero-cta">
				View Component Playground
			</a>

			<div class="hero-links">
				<a href="https://github.com/casholab" class="link-btn" target="_blank" rel="noopener">
					<svg viewBox="0 0 24 24" fill="currentColor" class="link-icon">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					GitHub
				</a>
				<a href="#svelte" class="link-btn">
					
					Svelte
				</a>
				<a href="#react" class="link-btn">
					
					React
				</a>
				<a href="#html" class="link-btn">
					
					HTML/CSS
				</a>
			</div>
		</div>

		<div class="hero-right">
			<div class="demo-card">
				<span class="demo-label">Try the component</span>
				<LanguageSelector  languages={["en", "es", "fr"]} displayOptions={{flagMode: "none", buttonSize:"sm", isModal: false, showEnglishName: false}} />
				<div class="embed-label">3 languages, no flags, dropdown, small</div>
				<hr/>
				<LanguageSelector  languages={["en", "es", "fr", "id","ja", "ko"]} displayOptions={{flagMode: "single", showEnglishName: false, isModal: false}} />
				<div class="embed-label">6 languages, single flag, no english name, dropdown</div>
				<hr/>
				<LanguageSelector  languages={["en", "es", "fr", "id", "zh-TW", "zh-CN", "pt-BR", "pt-PT", "sr-Latn", "sr-Cyrl"]} displayOptions={{flagMode: "single"}} />
				<div class="embed-label">12 languages, single flag, modal</div>
				<hr/>
				<LanguageSelector  languages={["zh-Hant","zh-Hans-TW", "en-GB", "en-US", "sr-Latn", "sr-Cyrl", "in", "it", "es", "de", "fr", "ja", "ko", "nl", "pl", "pt", "ru", "tr", "uk", "vi"]} displayOptions={{flagMode: "all"}} />
				<div class="embed-label">20 languages, multi flag, regions, and scripts</div>
			</div>

			<div class="stats">
				<div class="stat">
					<span class="stat-value">7000+</span>
					<span class="stat-label">Languages</span>
					<span>(Really!)</span>
				</div>
				<div class="stat">
					<span class="stat-value">200+</span>
					<span class="stat-label">Flags</span>
				</div>
				<div class="stat">
					<span class="stat-value">400+</span>
					<span class="stat-label">Endonyms</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>

	hr{
		width:100%;
		color:rgba(128, 128, 128, 0.5);
	}
	.home {
		max-width: 1100px;
		margin: 0 auto;
		min-height: calc(100vh - 8rem);
		display: flex;
		align-items: center;
	}

	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		width: 100%;
		padding: 2rem 0;
	}

	.hero-left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		background: color-mix(in srgb, var(--tb-accent) 12%, transparent);
		color: var(--tb-accent);
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.hero-title {
		font-size: 2.75rem;
		font-weight: 700;
		line-height: 1.15;
		color: var(--tb-fg);
	}

	.hero-desc {
		font-size: 1.0625rem;
		color: var(--tb-fg-muted);
		line-height: 1.65;
		max-width: 420px;
	}

	.hero-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.875rem 1.5rem;
		background: var(--tb-accent);
		color: white;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		transition: background 0.15s, transform 0.15s;
		margin-top: 0.5rem;
	}

	.hero-cta:hover {
		background: var(--tb-accent-hover);
		transform: translateX(2px);
	}


	.hero-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		margin-top: 1.5rem;
	}

	.link-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
		background: var(--tb-bg-card);
		color: var(--tb-fg);
		border: 1px solid var(--tb-border);
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 500;
		text-decoration: none;
		transition: border-color 0.15s, background 0.15s;
	}

	.link-btn:hover {
		border-color: var(--tb-fg-muted);
		background: var(--tb-bg);
	}

	.link-icon {
		width: 1rem;
		height: 1rem;
	}

	.hero-right {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}

	.demo-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2.5rem 3rem;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 1rem;
		text-align: center;
		min-width:500px;

	}

	.demo-label {
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--tb-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.embed-label{
		font-size:.8rem;
	}

	.stats {
		display: flex;
		gap: 2.5rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--tb-fg);
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--tb-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: 1fr;
			gap: 3rem;
			text-align: center;
		}

		.hero-left {
			align-items: center;
		}

		.hero-desc {
			max-width: 100%;
		}

		.hero-links {
			justify-content: center;
		}

		.hero-title {
			font-size: 2.25rem;
		}
	}

	@media (max-width: 640px) {
		.home {
			min-height: auto;
			padding: 1rem 0;
		}

		.hero {
			gap: 2rem;
			padding: 1rem 0;
		}

		.hero-title {
			font-size: 1.75rem;
		}

		.hero-desc {
			font-size: 1rem;
		}

		.demo-card {
			padding: 1.5rem 2rem;
			min-width:unset;
		}

		.demo-button {
			padding: 1rem 1.5rem;
			font-size: 1.125rem;
		}

		.stats {
			gap: 1.5rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}
	}
</style>
