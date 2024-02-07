<script>
    import { Separator } from "$ui/separator";

    import { Heart, MessageCircle, Share, BarChart } from "lucide-svelte";

    export let feed;

    $: console.log(feed);
</script>

<div class="w-full h-full border-l border-r border-gray-100">
    <div class="p-2">
        <h1 class="text-xl font-semibold">
            Good evening, Kian.
        </h1>
        <p class="text-gray-400">
            Here's what's happening.
        </p>
    </div>
    {#each feed as post, idx}
        <div
            class="border-t border-gray-100 space-y-2"
            class:border-b-0={idx !== feed.length - 1}
        >
            <div class="p-2">
                <div>
                    <span class="font-semibold">
                        {post.author.first_name}
                        {post.author.last_name}
                    </span>
                    <span class="text-gray-400">@{post.author.username}</span>
                </div>
                <p>
                    {post.content}
                </p>
            </div>
            <div>
                <!-- Engagement buttons will go here -->
            </div>
        </div>
    {/each}
</div>
