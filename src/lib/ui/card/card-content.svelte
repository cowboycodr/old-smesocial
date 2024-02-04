<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<div class={twMerge("", className)} {...$$restProps}>
    <slot />
</div>