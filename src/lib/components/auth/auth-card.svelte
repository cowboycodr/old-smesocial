<script>
    import * as Card from "$ui/card";
    import { Button } from "$ui/button";
    import { Separator } from "$ui/separator";

    export let supabase;

    async function signUpWithGoogle() {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                }
            }
        });
    }
</script>

<Card.Root class="absolute-center max-w-[300px]">
    <Card.Title>Sign up</Card.Title>
    <Card.Description>Currently, we only support third-party providers.</Card.Description>
    <Separator class="mt-3 mb-3" />
    <Card.Content>
        <Button on:click={signUpWithGoogle}>
            Google
        </Button>
    </Card.Content>
</Card.Root>
