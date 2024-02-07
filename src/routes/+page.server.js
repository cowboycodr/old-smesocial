import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, locals: { supabase, getSession } }) => {
    const session = await getSession();

    let profile = undefined;

    if (session) {
        ({ data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single());

        if (!profile?.setup) {
            return redirect(303, "/profile/setup")
        }
    }

    const getFeed = async () => {
        const response = await fetch("/api/v1/posts");
        const { posts } = await response.json();

        return posts;
    }

    const feed = await getFeed();

    return { profile, feed };
}