import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        return redirect(303, "/");
    }

    const profile = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (profile?.setup) {
        redirect(303, "/");
    }

    return { profile };
}

export const actions = {
    update: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const username = formData.get('username')
        const avatarUrl = formData.get('avatarUrl')

        const session = await getSession()

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            first_name: firstName,
            last_name: lastName,
            username,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        })

        if (error) {
            if (error.code === "23505") {
                // ERR 23505: Username already taken.
                return fail(500, {
                    firstName,
                    lastName,
                    username,
                    avatarUrl,
                    userNameTaken: true,
                })
            }

            return fail(500, {
                firstName,
                lastName,
                username,
                avatarUrl,
            })
        }

        const fields = [firstName, lastName, username];

        if (fields.every(field => field)) {
            await supabase.from('profiles').upsert({
                id: session?.user.id,
                setup: true,
                updated_at: new Date(),
            });
        }

        return redirect(303, "/");
    },
    signout: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (session) {
            await supabase.auth.signOut()
            throw redirect(303, "/")
        }
    },
}