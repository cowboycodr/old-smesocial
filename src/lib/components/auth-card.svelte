<script>
    import { dev } from "$app/environment";

    import Fa from "svelte-fa";
    import { faGoogle } from "@fortawesome/free-brands-svg-icons";

    import * as Card from "$ui/card";
    import { Button } from "$ui/button";
    import { Separator } from "$ui/separator";

    export let supabase;

    const OAUTH_REDIRECT_URL = dev
        ? "http://localhost:5173/"
        : "https://beta.smeast.org/";

    async function signUpWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
                redirectTo: OAUTH_REDIRECT_URL,
            },
        });
    }
</script>

<Card.Root class="max-w-[300px] p-2">
    <Card.Title>Sign up</Card.Title>
    <Card.Description
        >Currently, we only support third-party providers.</Card.Description
    >
    <Separator class="mt-3 mb-3" />
    <Card.Content>
        <Button
            class="flex justify-center items-center"
            on:click={signUpWithGoogle}
            primary
        >
            <Fa icon={faGoogle} />
        </Button>
    </Card.Content>
</Card.Root>
