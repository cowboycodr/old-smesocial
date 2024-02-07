import { json } from '@sveltejs/kit';

export const GET = async ({ params, locals: { supabase, getSession } }) => {
    const { count } = params;

    let posts;
    let error;

    if (count) {
        ({data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(count));
    } else {
        ({data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false }));
    }

    if (error) {
        return json({ error: error.message }, 500);
    }

    return json({ posts });
}

export const POST = async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        return json({ error: 'Unauthorized' }, 401);
    }

    const { content } = await request.json();

    if (!content) {
        return json({ error: 'Content is required' }, 400);
    }


    const { data: post, error } = await supabase
        .from('posts')
        .insert({ content, user_id: session.user.id })
        .single();

    if (error) {
        console.log(error);

        return json({ error: error.message }, 500);
    }

    return json({ "message": "Successfully posted", post })
}