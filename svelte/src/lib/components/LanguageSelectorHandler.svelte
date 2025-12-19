<script lang="ts">
	import { onMount } from 'svelte';
	import type { LanguageLookupResult, DisplayOptions, LoadOptions, DisplayLanguage } from '../types.ts';
	import { buildDisplayLanguages, getBrowserLocales, findMatchingLanguage } from '../language-selector.ts';
	import { loadLanguageData } from '../loader.ts';
	import '$lib/language-selector.css';
	import LanguageModal from './LanguageModal.svelte';
	import LanguageDropdown from './LanguageDropdown.svelte';
	import LocalizeButton from './LocalizeButton.svelte';

	let {
		staticData,
		languages = [],
		displayOptions = {},
		loadOptions = {},
		selectedLanguage = $bindable<DisplayLanguage | null>(null),
		onSelection = () => {}
	}: {
		languages?: string[];
		staticData?: LanguageLookupResult;
		displayOptions?: DisplayOptions;
		loadOptions?: LoadOptions;
		selectedLanguage?: DisplayLanguage | null;
		onSelection?: (language: DisplayLanguage) => void;
	} = $props();

	let fetchedData = $state<LanguageLookupResult | null>(null);
	let error = $state<Error | null>(null);
	let isFetching = $state(false);
	let isOpen = $state(false);

	async function loadData() {
		if (isFetching || fetchedData || staticData) return;
		if (!languages || languages.length === 0) {
			error = new Error('No languages provided');
			return;
		}
		try {
			isFetching = true;
			fetchedData = await loadLanguageData(languages, displayOptions, loadOptions);
			error = null;
		} catch (e) {
			error = e instanceof Error ? e : new Error(String(e));
		} finally {
			isFetching = false;
		}
	}

	let languagesData = $derived(staticData ?? fetchedData);

	let displayLanguages = $derived.by((): DisplayLanguage[] => {
		if (!languagesData) return [];
		return buildDisplayLanguages(languagesData, displayOptions.flagMode ?? 'single', languagesData.flags);
	});


	onMount(() => {
		if (loadOptions.autoSelect && !staticData) {
			loadData().then(() => {
				if (loadOptions.autoSelect && displayLanguages.length > 0 && !selectedLanguage) {
					const browserLocales = getBrowserLocales();
					const match = findMatchingLanguage(browserLocales, displayLanguages);
					if (match) {
						selectedLanguage = match;
						onSelection(match);
					}
				}
			});
		}
	});
</script>

<div class="ls-embed-wrapper">
	<LocalizeButton
		onmouseenter={loadData}
		onclick={() => { isOpen = !isOpen; loadData(); }}
		{displayOptions}
		{selectedLanguage}
	/>
	{#if error}
		<div class="ls-error">
			<p>Failed to load languages</p>
			<p class="ls-error-details">{error.message}</p>
			<button onclick={()=>loadData()}>Retry</button>
			<hr/>
			<button onclick={()=>error=null}>Close</button>
		</div>
	{/if}
	{#if displayOptions.isModal}
		<LanguageModal
			languagesData={displayLanguages}
			isLoading={isFetching}
			bind:selectedLanguage
			bind:isOpen
			{displayOptions}
			{onSelection}
		/>
	{:else}
		<LanguageDropdown
			bind:isOpen
			languagesData={displayLanguages}
			isLoading={isFetching}
			{displayOptions}
			bind:selectedLanguage
			{onSelection}
		/>
	{/if}
</div>

<style>
	.ls-embed-wrapper {
		position: relative;
		display: inline-block;
	}

	.ls-error {
		background: var(--ls-modal-bg);
		border: 1px solid var(--ls-border);
		border-radius: var(--ls-radius);
		box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.1);
		z-index: 100;
		margin-top: 4px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		gap: 1rem;
		padding: 2rem 1rem;
		color: var(--ls-fg-muted);
		position: absolute;
		top: 100%;
		left: 0;
		width: 280px;
	}
</style>
