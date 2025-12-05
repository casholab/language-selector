<script lang="ts">
	import { onMount } from 'svelte';

	let {
		themeClass = $bindable(''),
        STORAGE_KEY = 'theme-preference'
	}: {
		themeClass?: string;
        STORAGE_KEY?: string;
	} = $props();

	let theme = $state<'light' | 'dark' | 'system'>('system');


	onMount(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') {
			theme = stored;
		}
	});

	function cycleTheme() {
		if (theme === 'system') {
			theme = 'light';
			localStorage.setItem(STORAGE_KEY, 'light');
		} else if (theme === 'light') {
			theme = 'dark';
			localStorage.setItem(STORAGE_KEY, 'dark');
		} else {
			theme = 'system';
			localStorage.removeItem(STORAGE_KEY);
		}
	}

	$effect(() => {
		themeClass = theme === 'system' ? '' : theme;
		document.documentElement.classList.toggle('dark', theme === 'dark');
		document.documentElement.classList.toggle('light', theme === 'light');

	});

	let themeIcon = $derived(
		theme === 'system' ? '◐' : theme === 'light' ? '☀' : '☾'
	);
	let themeLabel = $derived(
		theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark'
	);
</script>

<button class="theme-toggle" onclick={cycleTheme} title="Toggle theme">
	<span class="theme-toggle-icon">{themeIcon}</span>
	<span class="theme-toggle-label">{themeLabel}</span>
</button>

<style>
	.theme-toggle {
		display: flex;
		width: 5rem;
		height: 2.5rem;
		justify-content: center;
		align-items: center;
		gap: 0.375rem;
		background: var(--tb-bg);
		border: 1px solid var(--tb-border);
		border-radius: 0.375rem;
		cursor: pointer;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--tb-fg);
		transition: border-color 0.15s, background-color 0.15s;
	}

	.theme-toggle:hover {
		border-color: var(--tb-fg-muted);
	}

	.theme-toggle-icon {
		font-size: 1rem;
	}

	.theme-toggle-label {
		font-size: 0.8125rem;
	}

	@media (max-width: 640px) {
		.theme-toggle-label {
			display: none;
		}
	}
</style>
