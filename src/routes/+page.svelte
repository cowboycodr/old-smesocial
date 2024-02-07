<script>
    import * as Card from "$ui/card";
    import { Button } from "$ui/button";
    import { Separator } from "$ui/separator";

    import AuthCard from "$components/auth-card.svelte";
    import PostModal from "$components/post-modal.svelte";

    export let data;
    let { supabase, session, profile } = data;
    $: ({ supabase, session, profile } = data);

    export let showPostModal = false;
</script>

{#if showPostModal}
    <PostModal on:post={() => { showPostModal = false; }} />
{/if}

<div class="container m-auto">
    <div>
        <div class="pt-3 w-full max-w-[250px]">
            {#if !session}
                <AuthCard {supabase} />
            {:else}
                <Card.Title>Good evening, {profile.first_name}.</Card.Title>
                <Card.Description>What's on your mind?</Card.Description>
                <div class="mt-3 mb-3" />
                <Button primary on:click={() => { showPostModal = true }}>Post</Button>
            {/if}
        </div>
        <div>

        </div>
    </div>
</div>
