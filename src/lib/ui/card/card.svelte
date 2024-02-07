<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<div class={twMerge("p-3 border border-gray-100 rounded-lg bg-white", className)} {...$$restProps}>
    <slot />
</div>