<script lang="ts">
    import LanguageSelector from "$lib/components/LanguageSelector.svelte";
    import LanguageSelectorStatic from "$lib/components/LanguageSelectorStatic.svelte";
    let selectedLanguage=$state<string | null>(null);
    import staticConfig from "$lib/example-config.json" with {type: "json"}
</script>
<style>
    header{
        display:flex;
        justify-content: space-between;
    }
</style>
<b>Language Selector Example Page</b>
<header>
    <LanguageSelector languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]} displayOptions={{isModal: false}}/>
</header>
<hr/>
<LanguageSelector bind:selectedLanguage languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]} displayOptions={{isModal: false}}/>
<div>Selected Language: {selectedLanguage}</div>
<hr/>
<h3>Modal flags all</h3>
<LanguageSelector languages={["en", "es", "fr", "id", "zh-Hans", "zh-TW"]} displayOptions={{isModal: true, flagMode: "all"}}/>
<hr/>
<h3>Test with regions and scripts</h3>
<LanguageSelector languages={["en-US-Latn", "es-ES-Latn", "fr-FR-Latn", "id-ID-Latn", "zh-CN-Hans", "zh-TW-Hant"]} displayOptions={{showEnglishName:false}}/>
<hr/>

<h3>Test with regions and scripts, dropdown</h3>
<LanguageSelector languages={["en-US-Latn", "es-ES-Latn", "fr-FR-Latn", "id-ID-Latn", "zh-CN-Hans", "zh-TW-Hant"]} displayOptions={{isModal: false, flagMode: "all"}} />
<hr/>
<h3>Static configuration file</h3>
<LanguageSelectorStatic staticFileData={staticConfig}/>
