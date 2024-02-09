import { json } from "@sveltejs/kit";

export const GET = async ({ params, request, locals: { supabase, getSession } }) => {
    const { id } = params;

    const { data: { post }, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return json({ error: error.message }, 500);
    }

    return json({ post });
}

export const DELETE = async ({ params, locals: { supabase, getSession } }) => {
    const { id } = params;

    const session = await getSession();

    if (!session) {
        return json({ error: 'Unauthorized' }, 401);
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {

        return json({ error: error.message }, 500);
    }

    return json({ success: true });
}