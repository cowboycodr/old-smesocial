<script>
    import { twMerge } from "tailwind-merge";

    export let primary = false;

    let className = "";
    export { className as class };
</script>

<button class={twMerge("p-2 border border-gray-100 rounded-lg w-full hover:bg-gray-100 transition-colors duration-75", 
                        className, 
                        primary ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white")} {...$$restProps} on:click>
    <slot />
</button>