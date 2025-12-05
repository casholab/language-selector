<script lang="ts">
    let { color = 'currentColor' } = $props<{
        color?: string;
    }>();
</script>

<svg xmlns="http://www.w3.org/2000/svg"  height="1em" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>