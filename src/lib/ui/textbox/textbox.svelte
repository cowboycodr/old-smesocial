<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };

    export let value = "";
</script>

<div
    contenteditable="true"
    class={twMerge("p-3 border border-gray-100 rounded-lg bg-white", className)}
    bind:textContent={value}
    {...$$restProps}
/>

<style>
    [contenteditable="true"]:empty:before {
        content: attr(placeholder);
        color: #a0aec0;
        pointer-events: none;
        display: block; /* For Firefox */
    }
</style>
