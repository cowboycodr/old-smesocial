<script>
    import moment from "moment";

    import { Trash } from "lucide-svelte";

    export let feed;
    export let profile;
    export let session;

    // e.g "Good morning, John."
    function getDayTimeDescriptor() {
        const hour = moment().hour();
        return hour >= 5 && hour < 12
            ? "morning"
            : hour >= 12 && hour < 17
              ? "afternoon"
              : "evening";
    }

    async function deletePost(postId) {
        await fetch(`/api/v1/posts/${postId}`, {
            method: "DELETE",
        });
    }

    let welcomeString = `Good ${getDayTimeDescriptor()}.`;

    if (profile) {
        welcomeString = welcomeString.replace(".", `, ${profile.first_name}.`)
    }
</script>

<div class="w-full h-full border-l border-r border-gray-100">
    <div class="p-2">
        <h1 class="text-xl font-semibold">
            {welcomeString}
        </h1>
        <p class="text-gray-400">Here's what's happening.</p>
    </div>
    {#each feed as post, idx}
        {@const postTimeDistance = moment(post.created_at).fromNow()}
        <div
            class="border-t border-gray-100"
            class:border-b-0={idx !== feed.length - 1}
        >
            <div class="p-2">
                <div class="flex justify-between">
                    <div>
                        <span class="font-semibold">
                            {post.author.first_name}
                            {post.author.last_name}
                        </span>
                        <span class="text-gray-400"
                            >@{post.author.username}</span
                        >
                    </div>
                    <div class="flex items-center space-x-1">
                        <div class="text-gray-400">
                            {postTimeDistance}
                        </div>
                        <div>
                            {#if session?.user_id === post.author.id}
                                <button on:click={() => { deletePost(post.id) }}>
                                    <Trash class="text-red-400" size={16} />
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
                <p>
                    {post.content}
                </p>
            </div>
            <div class="px-2">
                <!-- Interactive content goes here (e.g comments icon, like button, etc) -->
            </div>
        </div>
    {/each}
</div>
