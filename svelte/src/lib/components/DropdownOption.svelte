<script lang="ts">
	import { svgToDataUri, type DisplayLanguage } from '../language-selector.ts';

	let {
		language,
		flags,
		showFlags = false,
		showEnglishName = true,
		selected = false,
		onclick
	}: {
		language: DisplayLanguage;
		flags?: Record<string, string>;
		showFlags?: boolean;
		showEnglishName?: boolean;
		selected?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<button class="ls-dropdown-option" class:selected {onclick} type="button">
	{#if showFlags && language.flagCodes.length > 0 && flags && flags[language.flagCodes[0]]}
		<img class="ls-flag-sm" src={svgToDataUri(flags[language.flagCodes[0]])} alt="" />
	{/if}
	<div class="ls-dropdown-option-text">
		<span class="ls-dropdown-native">{language.endonym || language.name}</span>
		{#if showEnglishName && language.endonym && language.endonym.toLowerCase() !== language.name.toLowerCase()}
			<span class="ls-dropdown-english">{language.name}</span>
		{/if}
	</div>
	<div class="ls-dropdown-variant-container">
	{#if language.scriptNameLocal || language.scriptNameEnglish}
		<span class="ls-dropdown-variant">
			{language.scriptNameLocal} 
			{#if language.scriptNameLocal && language.scriptNameEnglish && language.scriptNameLocal.toLowerCase() !== language.scriptNameEnglish.toLowerCase()}
				|	
			{/if}
			{#if language.scriptNameEnglish && (!language.scriptNameLocal || language.scriptNameLocal.toLowerCase() !== language.scriptNameEnglish.toLowerCase())}
				{language.scriptNameEnglish}
			{/if}
		</span>
	{/if}
	{#if language.regionNameNative || language.regionNameEnglish}
		<span class="ls-dropdown-variant">
			{language.regionNameNative} 
			{#if language.regionNameNative && language.regionNameEnglish && language.regionNameNative.toLowerCase() !== language.regionNameEnglish.toLowerCase()}
				|	
			{/if}
			{#if language.regionNameEnglish && (!language.regionNameNative || language.regionNameNative.toLowerCase() !== language.regionNameEnglish.toLowerCase())}
				{language.regionNameEnglish}
			{/if}
		</span>
	{/if}
	</div>
</button>

<style>
	.ls-dropdown-variant-container {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		align-items: flex-end;
	}
	.ls-dropdown-option {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 0.75rem;
		border: none;
		background: transparent;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.1s;
	}

	.ls-dropdown-option:hover {
		background: var(--ls-bg-hover);
	}

	.ls-dropdown-option.selected {
		background: var(--ls-bg-selected);
	}

	.ls-flag-sm {
		height: 20px;
		max-width: 40px;
		object-fit: contain;
		border-radius: 2px;
		box-shadow: 0 0 0 1px var(--ls-border);
	}

	.ls-dropdown-option-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		flex-shrink:0;
		width: fit-content;
	}

	.ls-dropdown-native {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--ls-fg);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ls-dropdown-english {
		font-size: 0.75rem;
		color: var(--ls-fg-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ls-dropdown-variant {
		flex-shrink: 0;
		font-size: 0.6875rem;
		color: var(--ls-fg-muted);
		padding: 0.125rem 0.375rem;
		background: var(--ls-bg);
		border-radius: 0.25rem;
		width: fit-content;
	}
</style>
