<script lang="ts">
    import XIcon from '$lib/icons/XIcon.svelte';
    import { fade, scale } from 'svelte/transition';
    import '$lib/language-selector.css';
    
    let { close, bgCloses = true, children, xbutton = false } = $props<{
        close: () => void,
        xbutton?: boolean,
        bgCloses?: boolean,
        children: any
    }>();
    
    function handleBackdropClick(event: MouseEvent) {
        if (bgCloses && event.target === event.currentTarget) {
            close();
        }
    }
</script>
<svelte:window onkeydown={(e) => e.key === 'Escape' && bgCloses && close()}/>
<div class="ls-modal-outer">
    <div 
        transition:fade={{duration:100}}
        class="ls-modal-overlay" 
        onclick={handleBackdropClick}
        aria-label="Close modal"
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Escape' && bgCloses && close()}
    ></div>
    <div 
        class="ls-modal-container" 
        transition:scale={{ duration: 200, start: 0.95 }}
    >
        <div class="ls-modal-body">
            {#if xbutton}
                <button class="ls-modal-close" onclick={close} aria-label="close">
                    <XIcon />
                </button>
            {/if}
            {@render children()}
        </div>
    </div>
</div>

<style>
    .ls-modal-close {
        position: absolute;
        z-index: 2;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        color: var(--ls-fg);
        padding: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s;
    }

    .ls-modal-close:hover {
        background: var(--ls-bg-hover);
    }

    .ls-modal-outer {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .ls-modal-overlay {
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--ls-modal-overlay);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    }

    .ls-modal-container {
        overflow-y: auto;
        scrollbar-width: none;
        pointer-events: none;
        position: relative;
        padding: 2rem;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        z-index: 1001;
    }
    
    .ls-modal-body {
        height: fit-content;
        max-width: 90%;
        width: 800px;
        pointer-events: all;
        position: relative;
        background: var(--ls-modal-bg);
        border: 1px solid var(--ls-modal-border);
        border-radius: var(--ls-radius-lg);
        box-shadow: var(--ls-modal-shadow);
        padding: 1.25rem;
    }

    @media (max-width: 640px) {
        .ls-modal-container {
            padding-right:unset;
            padding-left:unset;
        }
        
    }
</style>
