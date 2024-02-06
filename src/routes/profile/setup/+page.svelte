<script>
    import { enhance } from "$app/forms";
    import * as Card from "$ui/card";
    import { Input } from "$ui/input";
    import { Label } from "$ui/label";
    import { Button } from "$ui/button";
    import { Separator } from "$ui/separator";

    export let data;
    export let form;

    let { profile } = data;
    $: profile = data;

    $: console.log(form);
</script>

<form use:enhance method="post" action="?/update">
    <Card.Root class="absolute-center ml-2 mr-2 w-full max-w-[400px]">
        <Card.Title>Welcome.</Card.Title>
        <Card.Description>Let's personalize your profile with just a few questions!</Card.Description>
        <Separator class="mt-3 mb-3" />
        <Card.Content class="space-y-3">
            <div class="space-y-2">
                <div>
                    <Label>First name</Label>
                    <Input
                        type="text"
                        placeholder="John"
                        name="firstName"
                        value={form?.first_name || ""}
                    />
                </div>
                <div>
                    <Label>Last name</Label>
                    <Input
                        type="text"
                        placeholder="Smith"
                        name="lastName"
                        value={form?.last_name || ""}
                    />
                </div>
                <div>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        placeholder="jsmitty"
                        name="username"
                        value={form?.username || ""}
                    />
                    {#if form?.userNameTaken}
                        <p class="text-sm text-red-500">
                            '{form.username}' is taken. Try another one.
                        </p>
                    {/if}
                </div>
            </div>
            <div class="flex justify-end">
                <Button primary type="submit" class="w-24">Next</Button>
            </div>
        </Card.Content>
    </Card.Root>
</form>
