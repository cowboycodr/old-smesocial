<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<h1 class={twMerge("text-xl font-semibold", className)} {...$$restProps}>
    <slot />
</h1>