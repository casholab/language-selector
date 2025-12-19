<script lang="ts">
	import type { DisplayOptions, DisplayLanguage } from '../types.ts';
	import { loadDataFromFile } from '../language-file.ts';
	import LanguageSelectorHandler from './LanguageSelectorHandler.svelte';

	let {
		staticFileData,
		selectedLanguage = $bindable<DisplayLanguage | null>(null),
		onSelection = () => {},
		displayOptions
	}: {
		staticFileData: string | object;
		selectedLanguage?: DisplayLanguage | null;
		onSelection?: (language: DisplayLanguage) => void;
		displayOptions?: DisplayOptions;
	} = $props();

	const { data: staticData, displayOptions: staticDisplayOptions } = loadDataFromFile(staticFileData);
</script>

<LanguageSelectorHandler
	bind:selectedLanguage
	{onSelection}
	{staticData}
	displayOptions={displayOptions ?? staticDisplayOptions ?? undefined}
/>
