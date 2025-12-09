<script lang="ts">
	let {
		srcList,
		size = 'md'
	}: {
		srcList: string[];
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	let layoutClass = $derived(
		srcList.length > 2 ? 'grid' : srcList.length === 2 ? 'row' : 'single'
	);
</script>

{#if srcList.length > 0}
	<div class="ls-flags ls-flags-{layoutClass} ls-flags-{size}">
		{#each srcList as dataUri, i (i)}
			<img class="ls-flag" src={dataUri} alt="" />
		{/each}
	</div>
{/if}

<style>
	.ls-flags {
		flex-shrink: 0;
	}

	.ls-flag {
		display: block;
		object-fit: contain;
		border-radius: 5%;
		filter: drop-shadow(0 0 1px var(--ls-border));
	}

	/* Size: small (dropdown) */
	.ls-flags-sm.ls-flags-single {
		width: 20px;
		height: 14px;
	}
	.ls-flags-sm.ls-flags-single .ls-flag {
		width: 20px;
		height: 14px;
		border-radius: 2px;
	}

	/* Size: medium (default, modal list) */
	.ls-flags-md {
		margin: auto 0;
	}
	.ls-flags-md.ls-flags-single {
		width: 32px;
		height: 22px;
	}
	.ls-flags-md.ls-flags-single .ls-flag {
		width: 32px;
		height: 22px;
	}
	.ls-flags-md.ls-flags-row {
		display: flex;
		gap: 6px;
		height: 22px;
	}
	.ls-flags-md.ls-flags-row .ls-flag {
		height: 22px;
		max-width:36px;
	}
	.ls-flags-md.ls-flags-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
		height: 40px;
	}
	.ls-flags-md.ls-flags-grid .ls-flag {
		height: 16px;
		max-width: 24px;
	}

	/* Size: large (selected display) */
	.ls-flags-lg {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}
	.ls-flags-lg .ls-flag {
		height: 1.5rem;
	}

</style>
