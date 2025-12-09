<script lang="ts">
	import Modal from './Modal.svelte';
	import LanguageIcon from '$lib/icons/LanguageIcon.svelte';
	import type { LanguageCode, DisplayLanguage } from '../types.ts';
	import { filterLanguages } from '../language-selector.ts';
	import SearchInput from './SearchInput.svelte';
	import LanguageOption from './LanguageOption.svelte';
	import SelectedLanguageDisplay from './SelectedLanguageDisplay.svelte';

	let {
		languagesData = [],
		isLoading = false,
		selectedEntry = null,
		isOpen = $bindable(false),
		showEnglishName = true,
		showFlags = false,
		selectLanguage,
		close
	}: {
		languagesData: DisplayLanguage[];
		isLoading?: boolean;
		selectedEntry?: DisplayLanguage | null;
		isOpen?: boolean;
		showEnglishName?: boolean;
		showFlags?: boolean;
		selectLanguage: (code: LanguageCode) => void;
		close: () => void;
	} = $props();

	let searchTerm = $state('');

	function handleClose() {
		close();
		searchTerm = '';
	}

	function handleSelect(code: LanguageCode) {
		selectLanguage(code);
		handleClose();
	}

	let filteredLanguages = $derived(filterLanguages(languagesData, searchTerm));
</script>

{#if isOpen}
	<Modal close={handleClose} xbutton={true} bgCloses={true}>
		<div class="ls-container">
			<header class="ls-header">
				<LanguageIcon width="20" height="20" />
				<span>Select a Language</span>
			</header>
			<div class="ls-content">
				{#if isLoading}
					<div class="ls-loading-overlay">
						<div class="ls-spinner"></div>
					</div>
				{/if}

				{#if selectedEntry}
					<SelectedLanguageDisplay
						language={selectedEntry}
						{showFlags}
						showEnglishName={showEnglishName && !!selectedEntry.endonym && selectedEntry.endonym !== selectedEntry.name}
					/>
					<hr />
				{/if}

				<SearchInput bind:value={searchTerm} />

				<div class="ls-list">
					{#if languagesData.length > 0}
						{#each filteredLanguages as language (language.code)}
							<LanguageOption
								{language}
								{showFlags}
								showEnglishName={showEnglishName && !!language.endonym && language.endonym !== language.name}
								selected={selectedEntry?.code === language.code}
								onclick={() => handleSelect(language.code)}
							/>
						{/each}
					{:else}
						{#each Array(languagesData.length) as _, i (i)}
							<div class="ls-option-placeholder"></div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</Modal>
{/if}

<style>
	hr {
		width: 100%;
		border: none;
		outline: none;
		height: 1px;
		background-color: var(--ls-border);
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}

	.ls-container {
		display: flex;
		flex-direction: column;
	}

	.ls-content {
		position: relative;
	}

	.ls-loading-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--ls-modal-bg) 70%, transparent);
		z-index: 10;
		opacity: 0;
		animation: ls-fade-in 0.3s ease-out 0.15s forwards;
	}

	@keyframes ls-fade-in {
		to { opacity: 1; }
	}

	.ls-spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--ls-border);
		border-top-color: var(--ls-fg);
		border-radius: 50%;
		animation: ls-spin 0.8s linear infinite;
	}

	@keyframes ls-spin {
		to { transform: rotate(360deg); }
	}



	.ls-header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 1.125rem;
		color: var(--ls-fg);
		margin-bottom: 1rem;
	}

	.ls-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1rem;
		scrollbar-color: var(--ls-border) transparent;
	}

	.ls-option-placeholder {
		padding: var(--ls-padding);
		background: var(--ls-bg);
		border: 1px solid var(--ls-border);
		border-radius: var(--ls-radius);
		width: 100%;
		max-width: 360px;
		height: 58px;
	}
</style>
