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

    async function refreshFeed() {
        const response = await fetch("/api/v1/posts");
        const posts = await response.json();

        feed = posts;
    };

    function getDayTimeDescriptor() {
        const hour = new Date().getHours();
        return hour >= 5 && hour < 12
            ? "morning"
            : hour >= 12 && hour < 17
              ? "afternoon"
              : "evening";
    }

    let welcomeString = `Good ${getDayTimeDescriptor()}.`;

    if (profile) {
        welcomeString = welcomeString.replace(".", `, ${profile.first_name}.`);
    }
</script>

{#if showPostModal}
    <PostModal
        on:post={async (ev) => {
            showPostModal = false;

            await refreshFeed();
        }}
        on:close={() => {
            showPostModal = false;
        }}
    />
{/if}

<div class="flex justify-center">
    <div class="grid col-span-5 container max-w-[1080px]">
        <div class="flex space-x-2">
            <div class="flex justify-end col-span-1 w-full max-w-[250px]">
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
            <div class="col-span-3 w-full h-full border border-gray-100">
                <div class="w-full border-b border-gray-100">
                    <div class="p-2">
                        <h1 class="text-xl font-semibold">
                            {welcomeString}
                        </h1>
                        <p class="text-gray-400">Here's what's happening.</p>
                    </div>
                </div>
                <Feed {feed} {profile} {session} {refreshFeed} />
            </div>
            <div class="w-full pt-1 col-span-1 max-w-[250px]">
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
