<script lang="ts">
	import type { DisplayLanguage, DisplayOptions } from '../types.ts';
	import LanguageIcon from '$lib/icons/LanguageIcon.svelte';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import '$lib/language-selector.css';

	let {
		displayOptions = {},
		onclick = () => {},
		onmouseenter = () => {},
		selectedLanguage = null
	}: {
		displayOptions?: DisplayOptions;
		onclick?: () => void;
		onmouseenter?: () => void;
		selectedLanguage?: DisplayLanguage | null;
	} = $props();

	let size = $derived(displayOptions.buttonSize ?? 'lg');
	let text = $derived(displayOptions.placeholderText ?? 'Language');
	let displaySelected = $derived(displayOptions.displaySelected ?? false);
	let showFlag = $derived(displayOptions.flagMode !== 'none');

	let displayText = $derived(displaySelected && selectedLanguage ? selectedLanguage.endonym || selectedLanguage.name : text);
	let flagSrc = $derived(showFlag && selectedLanguage?.flagSvgDataUris?.length ? selectedLanguage.flagSvgDataUris[0] : null);
	let hasSelection = $derived(displaySelected && selectedLanguage);
</script>

<button class="ls-btn" class:sm={size === 'sm'} {onclick} {onmouseenter}>
	{#if size === 'lg'}
		{#if hasSelection && flagSrc}
			<img class="ls-btn-flag" src={flagSrc} alt="" />
		{:else}
			<LanguageIcon width="18" height="18" />
		{/if}
		<span>{displayText}</span>
		<ChevronDownIcon width="16" height="16" />
	{:else}
		<LanguageIcon width="18" height="18" />
		{#if hasSelection && flagSrc}
			<img class="ls-btn-flag" src={flagSrc} alt="" />
		{/if}
	{/if}
</button>

<style>
	.ls-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
		background: var(--ls-btn-bg);
		border: 1px solid var(--ls-btn-border);
		border-radius: var(--ls-radius);
		color: var(--ls-fg);
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		white-space: nowrap;
		transition: background-color 0.15s, border-color 0.15s;
	}

	.ls-btn:hover {
		background: var(--ls-btn-bg-hover);
		border-color: var(--ls-border-hover);
	}

	.ls-btn:focus-visible {
		outline: 2px solid var(--ls-border-focus);
		outline-offset: 2px;
	}

	.ls-btn.sm {
		padding: 0.5rem;
	}

	.ls-btn-flag {
		width: 20px;
		height: 14px;
		object-fit: contain;
		border-radius: 2px;
		filter: drop-shadow(0 0 1px var(--ls-border));
	}
</style>
