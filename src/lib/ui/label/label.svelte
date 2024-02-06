<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<label 
    class={twMerge("block text-sm font-medium text-gray-400", className)} 
    {...$$restProps}
>
    <slot />
</label>