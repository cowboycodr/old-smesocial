<script>
    import { createEventDispatcher } from "svelte";

    import { ArrowRight } from "lucide-svelte";

    import * as Card from "$ui/card";
    import { Button } from "$ui/button";
    import { TextBox } from "$ui/textbox";
    import { Separator } from "$ui/separator";

    const dispatch = createEventDispatcher();

    let value;

    async function post() {
        const response = await fetch("/api/v1/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: value }),
        });

        // dispatch("post");

        close();
    }

    function close() {
        dispatch("close");
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            close();
        }
    }
</script>

<div
    class="absolute w-full h-full bg-gray-500 bg-opacity-50"
    on:click|self={close}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
>
    <div class="absolute-center w-full max-w-[500px] p-3">
        <Card.Root>
            <Card.Content>
                <TextBox
                    class="p-0 border-none outline-none text-lg h-[100px] overflow-scroll"
                    placeholder="Let's get it started in here..."
                    bind:value
                />
            </Card.Content>
            <Separator class="mt-3 mb-3" />
            <div class="flex justify-end">
                <Button
                    class="flex items-center rounded-full justify-center w-min"
                    title="Post"
                    primary
                    on:click={post}
                >
                    <ArrowRight size={18} />
                </Button>
            </div>
        </Card.Root>
    </div>
</div>
