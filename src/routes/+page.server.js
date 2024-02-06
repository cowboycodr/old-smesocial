import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
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

    return { profile };
}