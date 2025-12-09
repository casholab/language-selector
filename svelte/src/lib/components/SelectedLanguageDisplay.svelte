<script lang="ts">
	import type { DisplayLanguage } from '../types.ts';
	import FlagDisplay from './FlagDisplay.svelte';

	let {
		language,
		showFlags = false,
		showEnglishName = true
	}: {
		language: DisplayLanguage;
		showFlags?: boolean;
		showEnglishName?: boolean;
	} = $props();
</script>

<div class="ls-selected">
	<div class="ls-selected-native">
		{language.endonym || language.name}
		{#if language.scriptNameLocal}
			<span class="ls-selected-script-local">({language.scriptNameLocal})</span>
		{/if}
		{#if language.regionNameNative}
			<span class="ls-selected-region-local">({language.regionNameNative})</span>
		{/if}
	</div>
	{#if showEnglishName}
		<div class="ls-selected-english">
			<span class="ls-selected-name">{language.name}</span>
			{#if language.regionNameEnglish || language.scriptNameEnglish}
				<span class="ls-selected-variant">
					{#if language.scriptNameEnglish && (!language.scriptNameLocal || language.scriptNameLocal.toLowerCase() !== language.scriptNameEnglish.toLowerCase())}
						({language.scriptNameEnglish})
					{/if}
					{#if language.regionNameEnglish && (!language.regionNameNative || language.regionNameNative.toLowerCase() !== language.regionNameEnglish.toLowerCase())}
						{language.regionNameEnglish}
					{/if}
				</span>
			{/if}
		</div>
	{/if}
	{#if showFlags && language.flagSvgDataUris.length > 0}
		<FlagDisplay srcList={language.flagSvgDataUris} size="lg" />
	{/if}
</div>

<style>
	.ls-selected {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.25rem;
		padding-bottom: 0.75rem;
		margin-bottom: 1rem;
	}

	.ls-selected-native {
		font-weight: 600;
		font-size: 2rem;
		color: var(--ls-fg);
	}

	.ls-selected-english {
		font-size: 1.25rem;
		color: var(--ls-fg-muted);
	}

	.ls-selected-script-local,
	.ls-selected-region-local {
		opacity: 0.75;
		margin-left: 0.25rem;
	}
</style>

