<script lang="ts">
	import LanguageIcon from '$lib/icons/LanguageIcon.svelte';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import '$lib/language-selector.css';

	let {
		text = 'Localize',
		size = 'lg',
		onclick = () => {},
		onmouseenter = () => {}
	}: {
		text?: string;
		size?: 'sm' | 'lg';
		onclick?: () => void;
		onmouseenter?: ()=> void;
	} = $props();
</script>

<button class="ls-btn" class:sm={size === 'sm'} {onclick} {onmouseenter}>
	<LanguageIcon width="18" height="18" />
	{#if size === 'lg'}
		<span>{text}</span>
		<ChevronDownIcon width="16" height="16" />
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
</style>
