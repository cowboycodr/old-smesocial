<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<button class={twMerge("p-2 border border-gray-100 rounded-lg w-full hover:bg-gray-100 transition-colors duration-75", className)} {...$$restProps} on:click>
    <slot />
</button>