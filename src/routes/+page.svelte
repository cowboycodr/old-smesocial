<script>
    import { Plus } from "lucide-svelte";

    import * as Card from "$ui/card";
    import { Button } from "$ui/button";
    import { Separator } from "$ui/separator";

    import AuthCard from "$components/auth-card.svelte";
    import PostModal from "$components/post-modal.svelte";

    import Feed from "$components/feed";

    export let data;
    let { supabase, session, profile, feed } = data;
    $: ({ supabase, session, profile, feed } = data);

    export let showPostModal = false;
</script>

{#if showPostModal}
    <PostModal
        on:close={() => {
            showPostModal = false;
        }}
    />
{/if}

<div class="flex justify-center">
    <div class="flex container max-w-[750px] space-x-2">
        <div class="pt-3">
            {#if !session}
                <AuthCard {supabase} />
            {:else}
                <Button
                    primary
                    class="rounded-full"

                    on:click={() => {
                        showPostModal = true;
                    }}
                >
                    <Plus size={18} />
                </Button>
            {/if}
        </div>
        <Feed {feed} />
        <div class="w-full max-w-[250px]">side panel</div>
    </div>
</div>
