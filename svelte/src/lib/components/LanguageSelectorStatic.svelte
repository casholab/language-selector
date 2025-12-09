<script lang="ts">
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

	const { data:staticData, displayOptions:staticDisplayOptions } = loadDataFromFile(staticFileData);

</script>

<LanguageSelectorHandler
	bind:selectedLanguage
	{onSelection}
	{staticData}
	displayOptions={displayOptions ?? staticDisplayOptions ?? undefined}
/>
