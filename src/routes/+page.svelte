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
    <div class="grid col-span-5 container max-w-[1120px]">
        <div class="flex space-x-2">
            <div class="flex justify-end col-span-1 w-full max-w-[300px]">
                <div class="w-min">
                    <div class="pt-3">
                        {#if session}
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
                </div>
            </div>
            <div class="col-span-3 w-full">
                <Feed {feed} {profile} />
            </div>
            <div class="w-full pt-1 col-span-1 max-w-[300px]">
                {#if session}
                    <Card.Root>
                        <Card.Title
                            >{profile.first_name}
                            {profile.last_name}</Card.Title
                        >
                        <Card.Description>
                            @{profile.username}
                        </Card.Description>
                        <Card.Content></Card.Content>
                    </Card.Root>
                {:else}
                    <AuthCard {supabase} />
                {/if}
            </div>
        </div>
    </div>
</div>
