import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
    const getFeed = async () => {
        const response = await fetch("/api/v1/posts");
        const posts = await response.json();

        return posts;
    }

    const feed = await getFeed();

    return { feed };
}