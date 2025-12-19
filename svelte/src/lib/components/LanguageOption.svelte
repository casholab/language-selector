<script lang="ts">
	import type { DisplayLanguage } from '../types.ts';
	import FlagDisplay from './FlagDisplay.svelte';

	let {
		language,
		showFlags = false,
		showEnglishName = true,
		selected = false,
		onclick
	}: {
		language: DisplayLanguage;
		showFlags?: boolean;
		showEnglishName?: boolean;
		selected?: boolean;
		onclick?: () => void;
	} = $props();

	let hasVariant = $derived(
		language.regionNameNative ||
			language.regionNameEnglish ||
			language.scriptNameLocal ||
			language.scriptNameEnglish
	);
</script>

<button class="ls-option" class:selected {onclick}>
	{#if showFlags && language.flagSvgDataUris.length > 0}
		<FlagDisplay srcList={language.flagSvgDataUris} size="md" />
	{/if}
	<div class="ls-option-content">
		<div class="ls-option-native">
			{language.endonym || language.name}
		</div>
		{#if showEnglishName}
			<div class="ls-option-english">
				<span class="ls-option-name">{language.name}</span>
			</div>
		{/if}
	</div>
	{#if hasVariant}
	<div class="ls-option-meta-container">
		{#if language.regionNameNative || language.regionNameEnglish}
			<div class="ls-option-meta">
				<div class="ls-meta-native">
					{language.regionNameNative || ''}
				</div>
				{#if showEnglishName && language.regionNameEnglish && (!language.regionNameNative || language.regionNameNative.toLowerCase() !== language.regionNameEnglish.toLowerCase())}
					<div class="ls-meta-english">
						{language.regionNameEnglish}
					</div>
				{/if}
			</div>
		{/if}
		{#if language.scriptNameLocal || language.scriptNameEnglish}
			<div class="ls-option-meta">
				<div class="ls-meta-native">
					{language.scriptNameLocal || ''}
				</div>
				{#if showEnglishName && language.scriptNameEnglish && (!language.scriptNameLocal || language.scriptNameLocal.toLowerCase() !== language.scriptNameEnglish.toLowerCase())}
					<div class="ls-meta-english">
						{language.scriptNameEnglish}
					</div>
				{/if}
			</div>
			{/if}
		</div>
	{/if}
</button>

<style>
	.ls-option {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 0.75rem;
		padding: var(--ls-padding);
		background: var(--ls-bg);
		border: 1px solid var(--ls-border);
		border-radius: var(--ls-radius);
		cursor: pointer;
		text-align: left;
		max-width: 260px;
		overflow:hidden;
		width: 100%;
	}

	@media(max-width:1000px){
		.ls-option{max-width: unset;}
	}

	.ls-option:hover {
		background: var(--ls-bg-hover);
		border-color: var(--ls-border-hover);
	}

	.ls-option.selected {
		background: var(--ls-bg-selected);
		border-color: var(--ls-border-selected);
	}

	.ls-option-content {
		margin: auto 0;
	}

	.ls-option-native,
	.ls-option-english {
		text-transform: capitalize;
	}

	.ls-option-native {
		font-weight: 500;
		color: var(--ls-fg);
		font-size: 1rem;
	}

	.ls-option-english {
		font-size: 0.8125rem;
		color: var(--ls-fg-muted);
	}
	.ls-option-meta-container{
		display: flex;
		flex-direction: column;
		gap:.2rem;
	}
	.ls-option-meta {
		display: flex;
		/* flex-direction: column; */
		flex-direction: row;
		gap:.5em;
		justify-content: flex-start;
		min-width: 50px;
	}

	.ls-meta-native {
		font-size: 0.75rem;
		font-weight: 500;
		color: color-mix(in srgb, var(--ls-fg) 60%, gray 40%);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.3;
		min-height: 1em;
	}

	.ls-meta-english {
		font-size: 0.6875rem;
		color: var(--ls-fg-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.3;
		min-height: 1em;
	}
</style>

