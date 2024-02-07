import { json } from "@sveltejs/kit";

export const GET = async ({ params, request, locals: { supabase, getSession } }) => {
    const { id } = params;

    const { data: { user }, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return json({ error: error.message }, 500);
    }

    return json({ user });
}