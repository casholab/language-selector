<script lang="ts">
	import type { DisplayOptions, LoadOptions, DisplayLanguage } from '../types.ts';
	import LanguageSelectorHandler from './LanguageSelectorHandler.svelte';
	let {
		languages,
		displayOptions = {},
		loadOptions = {},
		selectedLanguage = $bindable<DisplayLanguage | null>(null),
		onSelection = () => {}
	}: {
		languages: string[];
		displayOptions?: DisplayOptions;
		loadOptions?: LoadOptions;
		selectedLanguage?: DisplayLanguage | null;
		onSelection?: (language: DisplayLanguage) => void;
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
