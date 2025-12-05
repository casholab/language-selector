<script lang="ts">
	import type { LanguageCode, LanguageLookupResult, DisplayOptions, LoadOptions } from '../types.ts';
	import type { DisplayLanguage } from '../language-selector.ts';
	import { buildDisplayLanguages } from '../language-selector.ts';
	import { loadLanguageData } from '../loader.ts';
	import '$lib/language-selector.css';
	import LanguageModal from './LanguageModal.svelte';
	import LanguageDropdown from './LanguageDropdown.svelte';

	let {
		staticData,
		languages = [],
		displayOptions = {},
		loadOptions = {},
		selectedLanguage = $bindable<LanguageCode | null>(null),
		isOpen = $bindable(false),
		onSelection = () => {},
		preload = $bindable(false)
	}: {
		preload?: boolean;
		languages?: string[];
		staticData?: LanguageLookupResult;
		displayOptions?: DisplayOptions;
		loadOptions?: LoadOptions;
		selectedLanguage?: LanguageCode | null;
		isOpen?: boolean;
		onSelection?: (language: LanguageCode) => void;
	} = $props();

	let showEnglishName = $derived(displayOptions.showEnglishName ?? true);
	let flagMode = $derived(displayOptions.flagMode ?? 'none');
	let isModal = $derived(displayOptions.isModal ?? true);

	let fetchedData = $state<LanguageLookupResult | null>(null);
	let error = $state<Error | null>(null);
	let isFetching = $state(false);

	async function loadData() {
		if (isFetching || fetchedData || staticData) return;
		if (!languages || languages.length === 0) {
			error = new Error('No languages provided');
			return;
		}

		isFetching = true;
		try {
			let data = await loadLanguageData(languages, displayOptions, loadOptions);
			fetchedData = data;
			error = null;
		} catch (e) {
			error = e instanceof Error ? e : new Error(String(e));
		}finally{
			isFetching=false;
		}
	}

	$effect(() => {
		if ((isOpen || preload) && !staticData && !fetchedData && !isFetching) {
			loadData();
		}
	});

	let languagesData = $derived(staticData ?? fetchedData);
	let isLoading = $derived(isFetching || (!languagesData && !error));

	let displayLanguages = $derived.by((): DisplayLanguage[] => {
		if (!languagesData) return [];
		return buildDisplayLanguages(languagesData, flagMode);
	});

	let selectedEntry = $derived.by((): DisplayLanguage | null => {
		if (!selectedLanguage) return null;
		return displayLanguages.find((l) => l.code === selectedLanguage) ?? null;
	});

	function selectLanguage(code: LanguageCode) {
		selectedLanguage = code;
		onSelection(code);
	}

	function close() {
		isOpen = false;
	}
</script>



{#if isModal}
	<LanguageModal
		{displayLanguages}
		flags={languagesData?.flags}
		{isLoading}
		{error}
		skeletonCount={languages.length}
		{selectedEntry}
		bind:isOpen
		{showEnglishName}
		showFlags={flagMode !== 'none'}
		{selectLanguage}
		{close}
	/>
{:else}
	<LanguageDropdown
		{displayLanguages}
		flags={languagesData?.flags}
		{isLoading}
		{error}
		skeletonCount={languages.length}
		{selectedEntry}
		bind:isOpen
		{showEnglishName}
		showFlags={flagMode !== 'none'}
		{selectLanguage}
		{close}
	/>
{/if}
