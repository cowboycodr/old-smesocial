<script>
    import moment from "moment";

    import { Trash } from "lucide-svelte";

    export let feed;
    export let session;

    export let refreshFeed;

    async function deletePost(postId) {
        await fetch(`/api/v1/posts/${postId}`, {
            method: "DELETE",
        });
    }
</script>

{#each feed as post, idx}
    {@const postTimeDistance = moment(post.created_at).fromNow("LT")}
    <div
        class:border-b={idx !== feed.length - 1}
    >
        <div class="p-2">
            <div class="flex justify-between">
                <div>
                    <span class="font-semibold">
                        {post.author.first_name}
                        {post.author.last_name}
                    </span>
                    <span class="text-gray-400">@{post.author.username}</span>
                </div>
                <div class="flex items-center space-x-1">
                    <div class="text-gray-400">
                        {postTimeDistance}
                    </div>
                    <div>
                        {#if session?.user.id === post.author.id}
                            <button
                                on:click={async () => {
                                    await deletePost(post.id);
                                    await refreshFeed();
                                }}
                            >
                                <Trash class="text-red-400" size={16} />
                            </button>
                        {/if}
                    </div>
                </div>
            </div>
            <pre  class="font-sans">{post.content}</pre>
        </div>
        <div class="px-2">
            <!-- Interactive content goes here (e.g comments icon, like button, etc) -->
        </div>
    </div>
{/each}
