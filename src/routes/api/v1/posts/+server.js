import { json } from '@sveltejs/kit';

export const GET = async ({ params, locals: { supabase, getSession } }) => {
    const { count } = params;
    let posts;
    let error;

    const selectString = `
        id,
        created_at,
        content,
        like_count,
        users:user_id(id, username, first_name, last_name)  // Fetching related user data
    `;

    try {
        if (count) {
            ({ data: posts, error } = await supabase
                .from('posts')
                .select(selectString)
                .order('created_at', { ascending: false })
                .limit(count));
        } else {
            ({ data: posts, error } = await supabase
                .from('posts')
                .select(selectString)
                .order('created_at', { ascending: false }));
        }

        if (error) throw error;

        const transformedPosts = posts.map(post => {
            const { users: author, ...rest } = post;
            return {
                ...rest,
                author
            };
        });

        return json(transformedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return json({ error: error.message }, 500);
    }
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
        .select()
        .single();

    if (error) {
        console.log(error);

        return json({ error: error.message }, 500);
    }

    return json({ "message": "Post uploaded successfully.", post })
}