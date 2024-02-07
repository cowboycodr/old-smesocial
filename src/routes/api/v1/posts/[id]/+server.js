import { json } from "@svletejs/kit";

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