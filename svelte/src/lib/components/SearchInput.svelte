<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	let {
		value = $bindable(''),
		placeholder = 'Search languages...',
		variant = 'default',
		autofocus = false,
		onkeydown
	}: {
		value?: string;
		placeholder?: string;
		variant?: 'default' | 'compact';
		autofocus?: boolean;
		onkeydown?: (e: KeyboardEvent) => void;
	} = $props();
</script>

{#if variant === 'default'}
	<label for="ls-search" class="ls-search">
		<SearchIcon width="18" height="18" />
		<input
			id="ls-search"
			type="text"
			{placeholder}
			bind:value
			{onkeydown}
		/>
	</label>
{:else}
	<div class="ls-search-compact">
		<SearchIcon width="16" height="16" />
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="text"
			{placeholder}
			bind:value
			{onkeydown}
			{autofocus}
		/>
	</div>
{/if}

<style>
	.ls-search {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		background: var(--ls-input-bg);
		border: 1px solid var(--ls-input-border);
		border-radius: var(--ls-radius);
		color: var(--ls-fg-muted);
		transition: border-color 0.15s, box-shadow 0.15s;
		width: 400px;
		max-width: 100%;
		margin: 0 auto;
		margin-bottom: 1rem;
	}

	.ls-search:focus-within {
		border-color: var(--ls-border-focus);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ls-border-focus) 20%, transparent);
	}

	.ls-search input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 0.9375rem;
		color: var(--ls-fg);
	}

	.ls-search input::placeholder {
		color: var(--ls-fg-muted);
	}

	.ls-search-compact {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 0.75rem;
		border-bottom: 1px solid var(--ls-border);
		color: var(--ls-fg-muted);
	}

	.ls-search-compact input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 0.875rem;
		color: var(--ls-fg);
	}

	.ls-search-compact input::placeholder {
		color: var(--ls-fg-muted);
	}
</style>

