<script lang="ts">
	import type { LanguageCode, DisplayOptions, LoadOptions } from '../types.ts';
	import LanguageSelectorHandler from './LanguageSelectorHandler.svelte';
	let {
		languages,
		displayOptions = {},
		loadOptions = {},
		selectedLanguage = $bindable<LanguageCode | null>(null),
		onSelection = () => {}
	}: {
		languages: string[];
		displayOptions?: DisplayOptions;
		loadOptions?: LoadOptions;
		selectedLanguage?: LanguageCode | null;
		onSelection?: (language: LanguageCode) => void;
	} = $props();

</script>

{#if languages && languages.length > 0}
		<LanguageSelectorHandler
			bind:selectedLanguage
			{onSelection}
			{languages}
			{displayOptions}
			{loadOptions}
		/>
{:else}
	{console.error('[LanguageSelectorEmbed] No languages provided.')}
{/if}
