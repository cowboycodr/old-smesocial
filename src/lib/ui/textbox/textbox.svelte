<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };

    export let value = "";
    export let autofocus = false;

    function focus(node) {
        if (autofocus) {
            node.focus();
        }
    }
</script>

<div
    contenteditable="true"
    class={twMerge("p-3 border border-gray-100 rounded-lg bg-white", className)}
    bind:innerText={value}

    use:focus

    {...$$restProps}
/>

<style>
    [contenteditable="true"]:empty:before {
        content: attr(placeholder);
        color: #a0aec0;
        pointer-events: none;
        display: block;
    }
</style>
