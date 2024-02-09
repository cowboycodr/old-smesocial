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

        const data = await response.json();
        const post = data.post;

        if (!response.ok) {
            dispatch("error", { message: "Failed to post." });
        }

        dispatch("post", { post });
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            close();
        }
    }
</script>

<div
    class="absolute w-full h-full bg-gray-500 bg-opacity-50"
    on:click|self={() => { dispatch("close"); }}
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

                    autofocus
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
