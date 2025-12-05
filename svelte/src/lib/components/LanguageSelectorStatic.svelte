<script lang="ts">
	import LocalizeButton from './LocalizeButton.svelte';
	import type { DisplayOptions } from '../types.ts';
	import { loadDataFromFile } from '../language-file.ts';
	import LanguageSelectorHandler from './LanguageSelectorHandler.svelte';

	let {
		staticFileData,
		selectedLanguage = $bindable<string | null>(null),
		onSelection = () => {},
		displayOptions
	}: {
		staticFileData: string | object;
		selectedLanguage?: string | null;
		onSelection?: (language: string) => void;
		displayOptions?: DisplayOptions;
	} = $props();

	let isOpen = $state(false);

	const { data:staticData, displayOptions:staticDisplayOptions } = loadDataFromFile(staticFileData);

	function handleSelection(code: string) {
		selectedLanguage = code;
		onSelection(code);
	}

	const buttonSize = displayOptions?.buttonSize ?? staticDisplayOptions?.buttonSize;
</script>

<div class="ls-embed-wrapper">
	<LocalizeButton onclick={() => (isOpen = !isOpen)} size={buttonSize} />
	<LanguageSelectorHandler
		bind:isOpen
		bind:selectedLanguage
		onSelection={handleSelection}
		{staticData}
		displayOptions={displayOptions ?? staticDisplayOptions ?? undefined}
	/>
</div>

<style>
	.ls-embed-wrapper {
		position: relative;
		display: inline-block;
	}
</style>
