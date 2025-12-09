<script lang="ts">
	import type { LanguageCode, DisplayLanguage } from '../types.ts';
	import { filterLanguages } from '../language-selector.ts';
	import SearchInput from './SearchInput.svelte';
	import DropdownOption from './DropdownOption.svelte';

	let {
		languagesData= [],
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
	let openUpward = $state(false);
	let alignRight = $state(false);

	function handleClose() {
		close();
		searchTerm = '';
	}

	function handleSelect(code: LanguageCode) {
		selectLanguage(code);
		handleClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}

	function setupDropdown(node: HTMLDivElement) {
		// 1. Positioning
		const rect = node.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const viewportWidth = window.innerWidth;

		//PSeudo Code;
		//IF right top 

		
		// Vertical positioning
		const spaceBelow = viewportHeight - rect.top;
		const dropdownHeight = rect.height;
		openUpward = spaceBelow < dropdownHeight && rect.top > dropdownHeight;

		// Horizontal positioning
		if (rect.right > viewportWidth) {
			alignRight = true;
		}

		// 2. Click Outside Handler
		function handleWindowClick(e: MouseEvent) {
			// If click is inside the dropdown, do nothing (reset)
			if (node.contains(e.target as Node)) {
				return;
			}
			// If click is outside, close
			handleClose();
		}

		// Delay attaching the listener to avoid catching the opening click event
		const timer = setTimeout(() => {
			window.addEventListener('click', handleWindowClick);
		}, 0);

		return {
			destroy() {
				clearTimeout(timer);
				window.removeEventListener('click', handleWindowClick);
			}
		};
	}

	let filteredLanguages = $derived(filterLanguages(languagesData, searchTerm));
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		use:setupDropdown
		class="ls-dropdown"
		class:ls-dropdown-upward={openUpward}
		class:ls-dropdown-right={alignRight}
	>
		<div class="ls-dropdown-content">
			{#if isLoading}
				<div class="ls-dropdown-loading-overlay">
					<div class="ls-spinner-sm"></div>
				</div>
			{/if}

			<SearchInput
				bind:value={searchTerm}
				variant="compact"
				autofocus
				onkeydown={handleKeydown}
			/>

			<div class="ls-dropdown-list">
				{#if languagesData.length > 0}
					{#if filteredLanguages.length === 0}
						<div class="ls-dropdown-empty">No languages found</div>
					{/if}
					{#each filteredLanguages as language (language.code)}
						<DropdownOption
							{language}
							{showFlags}
							showEnglishName={showEnglishName && !!language.endonym && language.endonym !== language.name}
							selected={selectedEntry?.code === language.code}
							onclick={() => handleSelect(language.code)}
						/>
					{/each}
				{:else}
					{#each Array(languagesData.length) as _, i (i)}
						<div class="ls-dropdown-option-placeholder"></div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.ls-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		width: 280px;
		max-width: 100vw;
		max-height: 360px;
		background: var(--ls-modal-bg);
		border: 1px solid var(--ls-border);
		border-radius: var(--ls-radius);
		box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.1);
		z-index: 100;
		margin-top: 4px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.ls-dropdown-upward {
		top: auto;
		bottom: 100%;
		margin-top: 0;
		margin-bottom: 4px;
	}

	.ls-dropdown-right {
		left: auto;
		right: 0;
	}

	.ls-dropdown-content {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
	}

	.ls-dropdown-loading-overlay {
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

	.ls-dropdown-list {
		flex: 1;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--ls-border) transparent;
	}

	.ls-dropdown-empty {
		padding: 1.5rem 1rem;
		text-align: center;
		color: var(--ls-fg-muted);
		font-size: 0.875rem;
	}

	.ls-spinner-sm {
		width: 16px;
		height: 16px;
		border: 2px solid var(--ls-border);
		border-top-color: var(--ls-fg);
		border-radius: 50%;
		animation: ls-spin 0.8s linear infinite;
	}

	@keyframes ls-spin {
		to { transform: rotate(360deg); }
	}



	.ls-dropdown-option-placeholder {
		padding: 0.625rem 0.75rem;
		min-height: 2.5rem;
	}
</style>
