<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<input class={twMerge("p-2 border border-gray-100 rounded-lg w-full transition-colors duration-75 focus:border-blue-500 focus:ring-1 focus:ring-blue-500", className)} {...$$restProps} />
