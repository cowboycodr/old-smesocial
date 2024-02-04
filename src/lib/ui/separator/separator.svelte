<script>
    import { twMerge } from "tailwind-merge";

    let className = "";
    export { className as class };
</script>

<hr class={twMerge("border-t border-gray-100", className)} {...$$restProps} />