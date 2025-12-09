<script lang="ts">
    import { LanguageSelector, generateStaticDataFile, downloadStaticDataFile} from "language-selector-svelte";
import type {FlagDisplayMode, LanguageLookupResult, DisplayOptions, LoadOptions} from "language-selector-svelte";

	let selectedLanguage = $state<string | null>(null);
	let size = $state<"sm" | "lg">("lg");
	let flagMode = $state<FlagDisplayMode>("all");
	let isModal = $state(true);
	let showEnglishName = $state(true);
	
	const presets = {
		default: ["en", "es", "fr", "id", "zh-TW", "zh-CN", "pt-BR", "pt-PT", "sr-Latn", "sr-Cyrl"],
		minimal: ["en", "es", "fr"],
		asian: ["zh-TW", "zh-CN", "ja", "ko"],
		european: ["en", "de", "fr", "es", "it", "pt", "nl", "pl"],
		scripts: ["sr-Latn", "sr-Cyrl", "zh-Hans", "zh-Hant", "uz-Latn", "uz-Cyrl"],
		regions: ["en-US", "en-GB", "pt-BR", "pt-PT", "es-ES", "es-MX"],
		complexMix: ["zh", "zh-TW", "zh-CN", "zh-Hant-CN", "zh-Hant-SG", "zh-Hans-TW", "zh-Hans-MO", "en", "fr", "es"],
		empty: [] as string[]
	};

	let currentPreset = $state<keyof typeof presets>("default");
	let languages = $state<string[]>([...presets.default]);
	let languagesInput = $state(presets.default.join(", "));

	let displayOptions = $derived<DisplayOptions>({
		buttonSize: size,
		flagMode,
		isModal,
		showEnglishName
	})

	function applyPreset(preset: keyof typeof presets) {
		currentPreset = preset;
		languages = [...presets[preset]];
		languagesInput = presets[preset].join(", ");
	}

	function applyLanguages() {
		const parsed = languagesInput
			.split(",")
			.map(s => s.trim())
			.filter(s => s.length > 0);
		languages = parsed;
		currentPreset = "default";
	}

	function handleSelection(code: string) {
		console.log('[Testbed] Language selected:', code);
	}
	let timeoutId: NodeJS.Timeout;
	const throttledApplyLanguages = ()=>{
		clearTimeout(timeoutId);
		timeoutId = setTimeout(()=>{
			applyLanguages();
		}, 400);
	}

let languagesFileDownloading=$state(false);
let languagesFileDownloadError=$state<Error | null>(null);

const downloadLanguageData=async()=> {
if (languagesFileDownloading) return;
	languagesFileDownloading=true;
	languagesFileDownloadError=null;
	generateStaticDataFile(languages, displayOptions, {}, true ).then(staticData=>{
		downloadStaticDataFile(staticData);
	}).catch(error=>{
		languagesFileDownloadError=error instanceof Error ? error : new Error(String(error));
	}).finally(()=>{
		languagesFileDownloading=false;
	});
	
}
</script>

<svelte:head>
	<title>Playground | Casholab Language Selector</title>
	<meta name="description" content="Try out the component library with different languages and display options. Download static data for offline use. ">
	<meta name="author" content="CashoLab">
</svelte:head>

<style>
	.testbed {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 1.5rem;
		width:1400px;
		max-width:100%;
		margin: 0 auto;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.75rem;
		padding: 1.25rem;
		margin-top:1rem;
		height:90vh;
		max-height:90vh;
		position:relative;
	}
	.controls{
		max-height:100%;
		overflow-y: auto;
		scrollbar-width: thin;
	}

	@media (max-width:900px){
		.testbed{
			overflow-y:unset;
			max-height:unset;
		}
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.controls h1 {
		font-size: 1.125rem;
		font-weight: 600;
	}

	.preview {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.options-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		background: var(--tb-bg);
		border: 1px solid var(--tb-border);
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.control-group h2 {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--tb-fg-muted);
	}

	.preset-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.25rem;
	}
	.error-message {
		color: #ef4444;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.preset-btn {
		padding: 0.375rem 0.5rem;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.25rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--tb-fg);
		cursor: pointer;
		transition: all 0.15s;
	}

	.preset-btn:hover { border-color: var(--tb-fg-muted); }
	.preset-btn.active { background: var(--tb-accent); border-color: var(--tb-accent); color: white; }
	.preset-btn.danger { border-color: #ef4444; color: #ef4444; }
	.preset-btn.danger:hover { background: rgba(239, 68, 68, 0.1); }
	.preset-btn.danger.active { background: #ef4444; color: white; }

	.textarea-wrap {
		position: relative;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.375rem;
		transition: border-color 0.15s;
	}

	.textarea-wrap:focus-within { border-color: var(--tb-accent); }

	.textarea-wrap textarea {
		width: 100%;
		padding: 0.5rem;
		padding-bottom: 2rem;
		background: transparent;
		border: none;
		border-radius: 0.375rem;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.75rem;
		color: var(--tb-fg);
		resize: vertical;
		min-height: 60px;
	}

	.textarea-wrap textarea:focus { outline: none; }
	.btn-group {
		display: flex;
		gap: 0.25rem;
	}

	.btn-group button {
		flex: 1;
		padding: 0.375rem 0.5rem;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.25rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--tb-fg);
		cursor: pointer;
		transition: all 0.15s;
	}

	.btn-group button:hover { border-color: var(--tb-fg-muted); }
	.btn-group button.active { background: var(--tb-accent); border-color: var(--tb-accent); color: white; }

	.output-section h2 {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--tb-fg-muted);
		margin-bottom: 0.625rem;
	}
	.options-output {
		margin-top:auto;
	}

	.state-row {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		font-size: 0.8125rem;
		padding: 0.25rem 0;
	}

	.state-row span:first-child {
		color: var(--tb-fg-muted);
		min-width: 90px;
	}

	.state-row code {
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 0.75rem;
		color: var(--tb-accent);
	}

	.lang-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.lang-tags code {
		background: var(--tb-bg);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
	}

	.empty-state {
		color: var(--tb-fg-muted);
		font-style: italic;
		font-size: 0.75rem;
	}

	.component-area {
		display: flex;
		padding: 2rem 1rem;
	}

	.selected-value {
		display: block;
		font-family: 'SF Mono', 'Fira Code', monospace;
		font-size: 1rem;
		color: var(--tb-accent);
	}
	
	.action-btn {
		padding: 0.375rem 0.5rem;
		background: var(--tb-bg-card);
		border: 1px solid var(--tb-border);
		border-radius: 0.25rem;
		font-family: inherit;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--tb-fg);
		cursor: pointer;
		text-align: center;
	}
	
	.action-btn:hover { border-color: var(--tb-fg-muted); }
	@media (max-width: 700px) {
		.testbed {
			grid-template-columns: 1fr;
			height: unset;
		}

		.controls { order: 2; }
		.preview { order: 1; }

		.preset-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.controls-title{
			display:none;
		}
	}
</style>

<div class="testbed">
	<aside class="controls">
		<h1 class="controls-title">Language Selector Playground</h1>
		
		<div class="options-card">
			<section class="control-group">
				<h2>Language Presets</h2>
				<div class="preset-grid">
					{#each Object.keys(presets) as preset}
						<button 
							class="preset-btn" 
							class:active={currentPreset === preset}
							class:danger={preset === "empty"}
							onclick={() => applyPreset(preset as keyof typeof presets)}
						>
							{preset === "empty" ? "Empty ⚠" : preset.charAt(0).toUpperCase() + preset.slice(1)}
						</button>
					{/each}
				</div>
			</section>

			<section class="control-group">
				<h2>Languages</h2>
				<div class="textarea-wrap">
					<textarea 
						bind:value={languagesInput}
						placeholder="en, es, fr, zh-TW..."
						rows="3"
						oninput={throttledApplyLanguages}
					></textarea>
				</div>
			</section>

			<section class="control-group">
				<h2>Flags</h2>
				<div class="btn-group">
					<button class:active={flagMode === "none"} onclick={() => { flagMode = "none" }}>None</button>
					<button class:active={flagMode === "single"} onclick={() => { flagMode = "single" }}>Single</button>
					<button class:active={flagMode === "all"} onclick={() => { flagMode = "all" }}>All</button>
				</div>
			</section>

			<section class="control-group">
				<h2>Button Size</h2>
				<div class="btn-group">
					<button class:active={size === "sm"} onclick={() => size = "sm"}>Small</button>
					<button class:active={size === "lg"} onclick={() => size = "lg"}>Large</button>
				</div>
			</section>

			<section class="control-group">
				<h2>Display Mode</h2>
				<div class="btn-group">
					<button class:active={isModal} onclick={() => isModal = true}>Modal</button>
					<button class:active={!isModal} onclick={() => isModal = false}>Dropdown</button>
				</div>
			</section>

			<section class="control-group">
				<h2>Show English Name</h2>
				<div class="btn-group">
					<button class:active={showEnglishName} onclick={() => showEnglishName = true}>Show</button>
					<button class:active={!showEnglishName} onclick={() => showEnglishName = false}>Hide</button>
				</div>
			</section>

			<section class="control-group">
				<h2>Download Static Data File</h2>
				<button class="action-btn" onclick={downloadLanguageData}>
				{languagesFileDownloading ? "Downloading..." : "Download"}
				</button>
				{#if languagesFileDownloadError}
					<div class="error-message">Error: {languagesFileDownloadError.message}</div>
				{/if}
			</section>
		</div>
	</aside>

	<main class="preview">


		<section class="output-section">
			<h2>Component Preview</h2>
			<div class="component-area">
				{#key [flagMode, languages.join(",")]}
				<LanguageSelector 
					bind:selectedLanguage 
					{languages} 
					onSelection={handleSelection}
					displayOptions={{ 
						buttonSize: size,
						flagMode,
						isModal,
						showEnglishName
					}} 
				/>
				{/key}
			</div>
		</section>

		<section class="output-section">
			<h2>Selected Language</h2>
			<code class="selected-value">{selectedLanguage ?? 'null'}</code>
		</section>
		<section class="output-section options-output">
			<h2>Options Output</h2>
			<div class="state-row"><span>size</span><code>{size}</code></div>
			<div class="state-row"><span>flags</span><code>{flagMode}</code></div>
			<div class="state-row"><span>isModal</span><code>{isModal}</code></div>
			<div class="state-row"><span>showEnglishName</span><code>{showEnglishName}</code></div>
			<div class="state-row">
				<span>languages</span>
				<div class="lang-tags">
					{#each languages as lang}
						<code>{lang}</code>
					{:else}
						<span class="empty-state">none</span>
					{/each}
				</div>
			</div>
		</section>
	</main>
</div>
