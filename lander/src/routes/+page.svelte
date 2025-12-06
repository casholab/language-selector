<script lang="ts">
	const apiUrl = "http://localhost:8787";
	import { LanguageSelector} from "language-selector-svelte";

	let activeTab = $state<'npm' | 'pnpm' | 'yarn' | 'bun'>('pnpm');
	let activeFramework = $state<'svelte' | 'react'>('react');
	let copiedStates = $state<Record<string, boolean>>({});

	const installCommands = {
		svelte: {
			npm: 'npm install language-selector-svelte',
			pnpm: 'pnpm add language-selector-svelte',
			yarn: 'yarn add language-selector-svelte',
			bun: 'bun add language-selector-svelte'
		},
		react: {
			npm: 'npm install language-selector-react',
			pnpm: 'pnpm add language-selector-react',
			yarn: 'yarn add language-selector-react',
			bun: 'bun add language-selector-react'
		}
	};

	const htmlEmbed = `<script src="https://lsapi.casholab.com/embed/loader.js"><\/script>`;
	const htmlUsage = `<div casholab-ls languages="en,es,fr,de"></div>`;
	const htmlUsageAlt = `<div id="casholab-ls" languages="en,es,fr,de"></div>`;

	const svelteUsage = `<script>
  import { LanguageSelector } from 'language-selector-svelte';
<\/script>

<LanguageSelector languages={["en", "es", "fr", "de"]} />`;

	const reactUsage = `import { LanguageSelector } from 'language-selector-react';

export default function App() {
  return <LanguageSelector languages={["en", "es", "fr", "de"]} />;
}`;

	async function copyToClipboard(text: string, key: string) {
		await navigator.clipboard.writeText(text);
		copiedStates[key] = true;
		setTimeout(() => {
			copiedStates[key] = false;
		}, 2000);
	}

	let openFaq = $state<number | null>(null);
	
		const faqs = [
	{
		q: "What is an endonym?",
		a: "An endonym is the name a language uses for itself (e.g., “Deutsch” for German). Using endonyms improves accessibility because many users cannot reliably identify their language when it is listed only in English. Endonyms allow speakers of all backgrounds to recognize their own language without depending on a foreign label."
	},
	{
		q: "Why can flags be useful?",
		a: "Flags help users visually identify languages even if they cannot read English or the language’s endonym. While flags do not perfectly map to languages, they offer quick recognition cues—especially for users who may not share any script or alphabet with the displayed names."
	},
	{
		q: "How does the bundle size stay small?",
		a: "The component libraries are fully tree-shakeable, loading only what your project imports. The embeddable HTML version lazy-loads resources and includes only the languages actually used. The initial embed is about 30 kB, with deeper data fetched asynchronously."
	}
];

</script>

<svelte:head>
	<title>CashoLab Language Selector - A Comprehesive Language Selector Component Library</title>
	<meta name="description" content="The most comprehensive language selector component library for modern web applications with libraries for React, Svelte, and embedded HTML.  Supporting 7000+ languages, 400+ endonyms, regions, and scripts. ">
	<meta name="author" content="CashoLab">
	<script src="http://localhost:8080/embed/loader.js" async></script>
</svelte:head>

<div class="home">
	<section class="hero">
		<div class="hero-left">
			<span class="hero-badge">Open Source</span>
			<h1 class="hero-title">The Most Comprehensive Language Selector</h1>
			<p class="hero-desc">
				Production-ready language selector components for modern web applications. 
				Built with accessibility and internationalization in mind.
			</p>
			
			<a href="/playground" class="hero-cta">
				View Component Playground
			</a>

			<div class="hero-links">
				<a href="https://github.com/casholab/language-selector" class="link-btn" target="_blank" rel="noopener">
					<svg viewBox="0 0 24 24" fill="currentColor" class="link-icon">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					GitHub
				</a>
				<a href="https://www.npmjs.com/package/language-selector-svelte" class="link-btn" target="_blank" rel="noopener">
					
					Svelte
				</a>
				<a href="https://www.npmjs.com/package/language-selector-react" class="link-btn" target="_blank" rel="noopener">
					
					React
				</a>
				<a href="#html-embed" class="link-btn">
					HTML/CSS
				</a>
			</div>
		</div>

		<div class="hero-right">
			<div class="demo-card">
				<span class="demo-label">Try the component</span>
				<LanguageSelector  languages={["en", "es", "fr"]} displayOptions={{flagMode: "none", buttonSize:"sm", isModal: false, showEnglishName: false}} />
				<div class="embed-label">3 languages, no flags, dropdown, small</div>
				<hr/>
				<LanguageSelector  languages={["en", "es", "fr", "id","ja", "ko"]} displayOptions={{flagMode: "single", showEnglishName: false, isModal: false}} />
				<div class="embed-label">6 languages, single flag, no english name, dropdown</div>
				<hr/>
				<LanguageSelector  languages={["en", "es", "fr", "id", "zh-TW", "zh-CN", "pt-BR", "pt-PT", "sr-Latn", "sr-Cyrl"]} displayOptions={{flagMode: "single"}} />
				<div class="embed-label">12 languages, single flag, modal</div>
				<hr/>
				<LanguageSelector  languages={["zh-Hant","zh-Hans-TW", "en-GB", "en-US", "sr-Latn", "sr-Cyrl", "id", "it", "es", "de", "fr", "ja", "ko", "nl", "pl", "pt", "ru", "tr", "uk", "vi"]} displayOptions={{flagMode: "all"}} />
				<div class="embed-label">20 languages, multi flag, regions, and scripts</div>
			</div>

			<div class="stats">
				<div class="stat">
					<span class="stat-value">7000+</span>
					<span class="stat-label">Languages</span>
					<span>(Really!)</span>
				</div>
				<div class="stat">
					<span class="stat-value">200+</span>
					<span class="stat-label">Flags</span>
				</div>
				<div class="stat">
					<span class="stat-value">400+</span>
					<span class="stat-label">Endonyms</span>
				</div>
			</div>
		</div>
	</section>

	<section class="install-section" id="install">
		<h2 class="section-title">Installation</h2>
		<p class="section-desc">A drop-in language selector widget you can add to any website.</p>
		<div class="install-cards">
			<div class="install-card">
				<h3 class="install-card-title">Component Library</h3>
				
				<div class="framework-tabs">
					<button 
					class="framework-tab" 
					class:active={activeFramework === 'react'}
					onclick={() => activeFramework = 'react'}
					>React</button>
					<button 
					class="framework-tab" 
					class:active={activeFramework === 'svelte'}
					onclick={() => activeFramework = 'svelte'}
					>Svelte</button>
				</div>
				
				<div class="pkg-tabs">
					<button 
					class="pkg-tab" 
					class:active={activeTab === 'npm'}
					onclick={() => activeTab = 'npm'}
					>npm</button>
					<button 
					class="pkg-tab" 
					class:active={activeTab === 'pnpm'}
					onclick={() => activeTab = 'pnpm'}
					>pnpm</button>
					<button 
					class="pkg-tab" 
					class:active={activeTab === 'yarn'}
					onclick={() => activeTab = 'yarn'}
					>yarn</button>
					<button 
					class="pkg-tab" 
					class:active={activeTab === 'bun'}
					onclick={() => activeTab = 'bun'}
					>bun</button>
				</div>
				
				<div class="code-block">
					<code>{installCommands[activeFramework][activeTab]}</code>
					<button class="copy-btn" onclick={() => copyToClipboard(installCommands[activeFramework][activeTab], 'install')}>
						{copiedStates['install'] ? '✓' : 'Copy'}
					</button>
				</div>
				
				<p class="usage-label">Usage:</p>
				<div class="code-block code-multiline">
					<pre>{activeFramework === 'svelte' ? svelteUsage : reactUsage}</pre>
					<button class="copy-btn" onclick={() => copyToClipboard(activeFramework === 'svelte' ? svelteUsage : reactUsage, 'usage')}>
						{copiedStates['usage'] ? '✓' : 'Copy'}
					</button>
				</div>
			</div>
			<div class="install-card" id="html-embed">
				<h3 class="install-card-title">HTML Embed</h3>
				<p class="install-card-desc">Add to any website with a single script tag</p>
				
				<div class="code-block">
					<code>{htmlEmbed}</code>
					<button class="copy-btn" onclick={() => copyToClipboard(htmlEmbed, 'html-embed')}>
						{copiedStates['html-embed'] ? '✓' : 'Copy'}
					</button>
				</div>

				<p class="usage-label">Then add an element:</p>
				<div class="code-block">
					<code>{htmlUsage}</code>
					<button class="copy-btn" onclick={() => copyToClipboard(htmlUsage, 'html-usage')}>
						{copiedStates['html-usage'] ? '✓' : 'Copy'}
					</button>
				</div>
			</div>
		</div>
	</section>

	<section class="why-section">
		<h2 class="section-title">Why Use a Component Library?</h2>
		
		<div class="comparison">
			<div class="comparison-card before">
				<span class="comparison-label">Without</span>
				<div class="comparison-content">
					<ul>
						<li>Build language data from scratch</li>
						<li>Handle 7000+ ISO language codes</li>
						<li>Source and maintain flag assets</li>
						<li>Implement endonym display</li>
						<li>Handle regions & scripts (zh-TW, sr-Latn)</li>
						<li>Accessibility concerns</li>
						<li>Edge cases & browser quirks</li>
					</ul>
				</div>
			</div>
			
			<div class="comparison-card after">
				<span class="comparison-label">With Language Selector</span>
				<div class="comparison-content">
					<ul>
						<li>One import, one component</li>
						<li>All languages built-in</li>
						<li>Flags included</li>
						<li>Endonyms handled</li>
						<li>Full region & script support</li>
						<!-- <li>ARIA-compliant</li> -->
						 <li>Offline mode supported</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="faq-section">
		<h2 class="section-title">FAQ</h2>
		
		<div class="faq-list">
			{#each faqs as faq, i}
				<div class="faq-item">
					<button 
						class="faq-question"
						onclick={() => openFaq = openFaq === i ? null : i}
					>
						<span>{faq.q}</span>
						<span class="faq-icon" class:open={openFaq === i}>+</span>
					</button>
					{#if openFaq === i}
						<div class="faq-answer">
							<p>{faq.a}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>
</div>

<style>

	hr{
		width:100%;
		color:rgba(128, 128, 128, 0.5);
	}
	.home {
		max-width: 1280px;
		margin: 0 auto;
		min-height: calc(100vh - 8rem);
		display: flex;
		flex-direction:column;
		align-items: center;
	}

	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		width: 100%;
		padding: 2rem 0;
	}

	.hero-left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
	}

	.hero-badge {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		background: color-mix(in srgb, var(--tb-accent) 12%, transparent);
		color: var(--tb-accent);
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.hero-title {
		font-size: 2.75rem;
		font-weight: 700;
		line-height: 1.15;
		color: var(--tb-fg);
	}

	.hero-desc {
		font-size: 1.0625rem;
		color: var(--tb-fg-muted);
		line-height: 1.65;
		max-width: 420px;
	}

	.hero-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.875rem 1.5rem;
		background: var(--tb-accent);
		color: white;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		transition: background 0.15s, transform 0.15s;
		margin-top: 0.5rem;
	}

	.hero-cta:hover {
		background: var(--tb-accent-hover);
		transform: translateX(2px);
	}


	.hero-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		margin-top: 1.5rem;
	}

	.link-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
		background: var(--tb-bg-card);
		color: var(--tb-fg);
		border: 1px solid var(--tb-border);
		border-radius: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 500;
		text-decoration: none;
		transition: border-color 0.15s, background 0.15s;
	}

	.link-btn:hover {
		border-color: var(--tb-fg-muted);
		background: var(--tb-bg);
	}

	.link-icon {
		width: 1rem;
		height: 1rem;
	}

	.hero-right {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}

	.demo-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2.5rem 3rem;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 1rem;
		text-align: center;
		min-width:500px;

	}

	.demo-label {
		font-size: 1.2rem;
		font-weight: 500;
		color: var(--tb-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.embed-label{
		font-size:.8rem;
	}

	.stats {
		display: flex;
		gap: 2.5rem;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.stat-value {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--tb-fg);
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--tb-fg-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: 1fr;
			gap: 3rem;
			text-align: center;
		}

		.hero-left {
			align-items: center;
		}

		.hero-desc {
			max-width: 100%;
		}

		.hero-links {
			justify-content: center;
		}

		.hero-title {
			font-size: 2.25rem;
		}
	}

	section{
		max-width:100%;
		width:100%;
	}


	@media (max-width: 640px) {
		.home {
			min-height: auto;
			padding: 1rem 0;
		}

		.hero {
			gap: 2rem;
			padding: 1rem 0;
		}

		.hero-title {
			font-size: 1.75rem;
		}

		.hero-desc {
			font-size: 1rem;
		}

		.demo-card {
			padding: 1.5rem 2rem;
			min-width:unset;
		}

		.stats {
			gap: 1.5rem;
		}

		.stat-value {
			font-size: 1.5rem;
		}
	}


	/* Installation Section */
	.install-section,
	.why-section,
	.faq-section {
		padding: 4rem 0;
		border-top: 1px solid var(--tb-border);
	}

	.section-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--tb-fg);
		margin-bottom: 0.5rem;
	}

	.section-desc {
		color: var(--tb-fg-muted);
		margin-bottom: 2rem;
	}

	.install-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.install-card {
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.75rem;
		padding: 1.5rem;
		height:fit-content;
		min-width: 0;
		overflow: hidden;
	}

	.install-card-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--tb-fg);
		margin-bottom: 0.25rem;
	}

	.install-card-desc {
		font-size: 0.875rem;
		color: var(--tb-fg-muted);
		margin-bottom: 1rem;
	}

	.framework-tabs,
	.pkg-tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.framework-tab,
	.pkg-tab {
		padding: 0.375rem 0.75rem;
		background: transparent;
		border: 1px solid var(--tb-border);
		border-radius: 0.375rem;
		color: var(--tb-fg-muted);
		font-size: 0.8125rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s;
	}

	.framework-tab:hover,
	.pkg-tab:hover {
		border-color: var(--tb-fg-muted);
	}

	.framework-tab.active {
		background: var(--tb-accent);
		border-color: var(--tb-accent);
		color: white;
	}

	.pkg-tab.active {
		background: var(--tb-fg);
		border-color: var(--tb-fg);
		color: var(--tb-bg);
	}

	.code-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		background: var(--tb-bg);
		border: 1px solid var(--tb-border);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.8125rem;
	}

	pre, code{
		text-wrap:wrap;
		word-break: break-word;
	}

	.code-block code,
	.code-block pre {
		color: var(--tb-fg);
		margin: 0;
		flex: 1;
		min-width: 0;
	}

	.code-multiline {
		align-items: flex-start;
	}

	.code-multiline pre {
		line-height: 1.5;
	}

	.copy-btn {
		padding: 0.25rem 0.5rem;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.25rem;
		color: var(--tb-fg-muted);
		font-size: 0.6875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s;
		flex-shrink: 0;
	}

	.copy-btn:hover {
		border-color: var(--tb-accent);
		color: var(--tb-accent);
	}

	.usage-label {
		font-size: 0.8125rem;
		color: var(--tb-fg-muted);
		margin: 1rem 0 0.5rem;
	}

	/* Why Section */
	.comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.comparison-card {
		border-radius: 0.75rem;
		padding: 1.5rem;
		position: relative;
	}

	.comparison-card.before {
		background: color-mix(in srgb, #ef4444 8%, var(--tb-bg-card));
		border: 1px solid color-mix(in srgb, #ef4444 20%, var(--tb-border));
	}

	.comparison-card.after {
		background: color-mix(in srgb, #22c55e 8%, var(--tb-bg-card));
		border: 1px solid color-mix(in srgb, #22c55e 20%, var(--tb-border));
	}

	.comparison-label {
		display: inline-block;
		padding: 0.25rem 0.625rem;
		border-radius: 0.25rem;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
	}

	.before .comparison-label {
		background: color-mix(in srgb, #ef4444 15%, transparent);
		color: #ef4444;
	}

	.after .comparison-label {
		background: color-mix(in srgb, #22c55e 15%, transparent);
		color: #22c55e;
	}

	.comparison-content ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.comparison-content li {
		font-size: 0.875rem;
		color: var(--tb-fg);
		padding-left: 1.25rem;
		position: relative;
	}

	.comparison-content li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5rem;
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
	}

	.before .comparison-content li::before {
		background: #ef4444;
	}

	.after .comparison-content li::before {
		background: #22c55e;
	}

	/* FAQ Section */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1.5rem;
		width:800px;
		max-width:100%;
	}

	.faq-item {
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.faq-question {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		background: transparent;
		border: none;
		color: var(--tb-fg);
		font-size: 0.9375rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		transition: background 0.15s;
	}

	.faq-question:hover {
		background: var(--tb-bg);
	}

	.faq-icon {
		font-size: 1.25rem;
		color: var(--tb-fg-muted);
		transition: transform 0.2s;
	}

	.faq-icon.open {
		transform: rotate(45deg);
	}

	.faq-answer {
		padding: 0 1.25rem 1rem;
	}

	.faq-answer p {
		color: var(--tb-fg-muted);
		font-size: 0.875rem;
		line-height: 1.6;
	}

	@media (max-width: 900px) {
		.comparison, .install-cards {
			grid-template-columns: 1fr;
		}
	}
</style>
