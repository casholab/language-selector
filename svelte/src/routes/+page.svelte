<script lang="ts">
    import LanguageSelector from "$lib/components/LanguageSelector.svelte";
    import LanguageSelectorStatic from "$lib/components/LanguageSelectorStatic.svelte";
    import type { DisplayLanguage } from "$lib/index.js";
    let selectedLanguage=$state<DisplayLanguage | null>(null);
    import staticConfig from "$lib/example-config.json" with {type: "json"}


    let preSelectedLang=$state({code:"fr"})
</script>
<style>
    :root{
        margin:unset;
        padding:unset;
        *{
            box-sizing: border-box;
        }
    }
</style>
<h2>Button States & Display Options</h2>
<h3>
    Debug
</h3>
<LanguageSelector languages={["en", "fr", "zh-tw", "sr-Cyrl-RS"]} displayOptions={{flagMode:"all", isModal:false, showEnglishName:false}}/>

<hr/>
<h3>Default</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-bottom: 1rem;">
<div>
    <small>default:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de"]}/>
</div>
<div>
    <small>Modal:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: true}}/>
</div>
<div>
    <small>Modal+ English Names:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: true, showEnglishName:true}}/>
</div>

<div>
    <small>Modal+ English Names:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de", "zh-TW", "zh-Hans-CN"]} displayOptions={{isModal: true, showEnglishName:true}}/>
</div>
<div>
    <small>noModal+ English Names:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de", "zh-TW", "zh-Hans-CN"]} displayOptions={{isModal: false, showEnglishName:true}}/>
</div>

<div>
    <small>Modal+ English Names:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de", "zh-TW", "zh-Hans-CN"]} displayOptions={{isModal: true, showEnglishName:true, flagMode:"all"}}/>
</div>
<div>
    <small>Modal+ noEnglish Names:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de", "zh-TW", "zh-Hans-CN"]} displayOptions={{isModal: true, showEnglishName:false, flagMode:"all"}}/>
</div>
<div>
    <small>Modal+ noEnglish Names:</small><br/>
    <LanguageSelector languages={["en", "es", "fr", "de", "zh-TW", "zh-Hans-CN"]} displayOptions={{isModal: true, showEnglishName:false, flagMode:"single"}}/>
</div>
</div>
<hr/>
<h3>Large Button States</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-bottom: 1rem;">
    <div>
        <small>Default:</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false}}/>
    </div>
    <div>
        <small>Custom Text:</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false, placeholderText: "Choose Language"}}/>
    </div>
    <div>
        <small>Display Selected (no flags):</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false, displaySelected: true, placeholderText:"Languages"}}/>
    </div>
    <div>
        <small>Display Selected + Flag:</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false, flagMode: "single", displaySelected: true}}/>
    </div>
</div>

<hr/>

<h3>Small Button States</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-bottom: 1rem;">
    <div>
        <small>Default (icon only):</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false, buttonSize: "sm"}}/>
    </div>
    <div>
        <small>Display Selected (no flags - shows nothing until selected):</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false, buttonSize: "sm", displaySelected: true}}/>
    </div>
    <div>
        <small>Display Selected + Flag (shows flag when selected):</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de"]} displayOptions={{isModal: false, buttonSize: "sm", flagMode: "single", displaySelected: true}}/>
    </div>
</div>

<hr/>

<h3>Auto Select (loads on mount, selects browser locale)</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-bottom: 1rem;">

    <div>
        <small>Large + Auto Select + Display:</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de", "ja", "zh-Hans"]} displayOptions={{isModal: false, flagMode: "single", displaySelected: true}} loadOptions={{autoSelect: true}}/>
    </div>
    <div>
        <small>Small + Auto Select + Display + Flag:</small><br/>
        <LanguageSelector languages={["en", "es", "fr", "de", "ja", "zh-Hans"]} displayOptions={{isModal: false, buttonSize: "sm", flagMode: "single", displaySelected: true}} loadOptions={{autoSelect: true}}/>
    </div>
    <div>
        <small>Small + Auto Select + Display + Flag:</small><br/>
        <LanguageSelector languages={["gd", "cy", "is", "mt", "fo", "kl"]} displayOptions={{isModal: false, buttonSize: "lg", flagMode: "single", displaySelected: true}} loadOptions={{autoSelect: true}}/>
    </div>

    <div>
        <small>Auto Select + Preselected Language:</small><br/>
        <LanguageSelector bind:selectedLanguage={preSelectedLang} languages={["en", "es", "fr", "de", "ja", "zh-Hans"]} displayOptions={{isModal: false, flagMode: "single", displaySelected: true}} loadOptions={{autoSelect: true}}/>
    </div>
</div>

<hr/>

<h3>Binding Selected Language</h3>
<LanguageSelector bind:selectedLanguage languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]} displayOptions={{isModal: false, flagMode: "single", displaySelected: true}}/>
<div>Selected: {selectedLanguage ? `${selectedLanguage.code} - ${selectedLanguage.endonym} (${selectedLanguage.name})` : 'None'}</div>

<hr/>

<h3>Dropdown Positioning Tests</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
    <span style="margin-left:0rem;">
        <LanguageSelector languages={["fr", "es", "ru", "de", "pt"]} displayOptions={{flagMode:"single", buttonSize:"sm", isModal:false}}/>
    </span>
    <span style="margin-left:4rem;">
        <LanguageSelector languages={["fr", "es", "ru", "de", "pt"]} displayOptions={{flagMode:"single", buttonSize:"sm", isModal:false}}/>
    </span>
    <div style="margin-left:auto;">
        <LanguageSelector languages={["fr", "es", "ru", "de", "pt"]} displayOptions={{flagMode:"single", buttonSize:"sm", isModal:false}}/>
    </div>
</div>

<hr/>

<h3>Modal with All Flags</h3>
<LanguageSelector languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]} displayOptions={{isModal: true, flagMode: "all"}}/>

<hr/>

<h3>Regions and Scripts</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
    <div>
        <small>Modal (no English names):</small><br/>
        <LanguageSelector languages={["en-US-Latn", "es-ES-Latn", "fr-FR-Latn", "id-ID-Latn", "zh-CN-Hans", "zh-TW-Hant"]} displayOptions={{showEnglishName:false}}/>
    </div>
    <div>
        <small>Dropdown + All Flags:</small><br/>
        <LanguageSelector languages={["en-US-Latn", "es-ES-Latn", "fr-FR-Latn", "id-ID-Latn", "zh-CN-Hans", "zh-TW-Hant"]} displayOptions={{isModal: false, flagMode: "all"}} />
    </div>
</div>

<hr/>

<h3>Static Configuration File</h3>
<LanguageSelectorStatic staticFileData={staticConfig}/>
