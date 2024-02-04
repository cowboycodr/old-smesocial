<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<p class={twMerge("text-gray-400", className)} {...$$restProps}>
    <slot />
</p>