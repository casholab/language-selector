<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import CasholabLogo from '$lib/CasholabLogo.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();

	let themeClass = $state('');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
</svelte:head>
<header>
<div class="header-inner">
	<div class="testbed-nav-left">
		<a href="/" class="testbed-logo">
			<CasholabLogo/> 
			<span class="testbed-logo-text">Language Selector</span>
		</a>
	</div>
	<nav class="testbed-nav-right">
		<a href="/" class="testbed-nav-link">Home</a>
		<a href="/playground" class="testbed-nav-link">Playground</a>
		<ThemeToggle bind:themeClass />
	</nav>
</div>
</header>
<main>
	{@render children()}
</main>
<footer>
	<div> <a href="https://ls.casholab.com">ls.casholab.com</a> | <a href="https://casholab.com">casholab.com</a> - © {new Date().getFullYear()} - All rights reserved - Privacy Policy - Terms of Service</div>
</footer>
<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html, body) {
		height: 100%;
	}
	main{
		padding:0 2rem;
	}

	:global(body) {
		font-family: 'Noto Sans', system-ui, -apple-system, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(:root) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--tb-bg);
		color: var(--tb-fg);
		transition: background-color 0.2s, color 0.2s;

		--tb-bg: #f8fafc;
		--tb-bg-card: #ffffff;
		--tb-fg: #0f172a;
		--tb-fg-muted: #64748b;
		--tb-border: #e2e8f0;
		--tb-accent: #3b82f6;
		--tb-accent-hover: #2563eb;
	}

	:global(:root.dark) {
		--tb-bg: #09090b;
		--tb-bg-card: #18181b;
		--tb-fg: #fafafa;
		--tb-fg-muted: #a1a1aa;
		--tb-border: #27272a;
		--tb-accent: #3b82f6;
		--tb-accent-hover: #60a5fa;
	}

	@media (prefers-color-scheme: dark) {
		:root:not(.light) {
			--tb-bg: #09090b;
			--tb-bg-card: #18181b;
			--tb-fg: #fafafa;
			--tb-fg-muted: #a1a1aa;
			--tb-border: #27272a;
			--tb-accent: #3b82f6;
			--tb-accent-hover: #60a5fa;
		}
	}

	header {
		border-bottom: 1px solid var(--tb-border);
		background: var(--tb-bg-card);
	}
	footer{
		text-align: center;
		padding: 1rem
	}
	.header-inner{
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width:1400px;
		margin:0 auto;
		padding: 0.75rem 1.5rem;

	}

	.testbed-nav-left {
		display: flex;
		align-items: center;
	}

	.testbed-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: var(--tb-fg);
		font-weight: 400;
		font-size:1rem;
		letter-spacing: -.05em;
	}

	.testbed-nav-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.testbed-nav-link {
		text-decoration: none;
		color: var(--tb-fg-muted);
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		transition: color 0.15s, background-color 0.15s;
	}

	.testbed-nav-link:hover {
		color: var(--tb-fg);
		background: var(--tb-bg);
	}


	@media (max-width: 640px) {
		.testbed-logo {
			flex-direction:column;
		}
		main{
			padding:0 1rem;
		}

	}
</style>
