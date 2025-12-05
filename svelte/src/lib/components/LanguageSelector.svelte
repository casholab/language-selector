<script lang="ts">
	import type { LanguageCode, DisplayOptions, LoadOptions } from '../types.ts';
	import LanguageSelectorHandler from './LanguageSelectorHandler.svelte';
	import LocalizeButton from './LocalizeButton.svelte';

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

	let isOpen = $state(false);
	let preload=$state(false)
</script>

{#if languages && languages.length > 0}
	<div class="ls-embed-wrapper">
		<LocalizeButton onmouseenter={()=>{preload=true}} onclick={() => (isOpen = !isOpen)} size={displayOptions.buttonSize} />
		<LanguageSelectorHandler
			bind:preload
			bind:isOpen
			bind:selectedLanguage
			{onSelection}
			{languages}
			{displayOptions}
			{loadOptions}
		/>
	</div>
{:else}
	{console.error('[LanguageSelectorEmbed] No languages provided.')}
{/if}

<style>
	.ls-embed-wrapper {
		position: relative;
		display: inline-block;
	}
</style>
