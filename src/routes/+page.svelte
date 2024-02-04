<script>
    import * as Card from "$ui/card";
    import { Button } from "$ui/button";
    import { Separator } from "$ui/separator";
</script>

<Card.Root class="absolute-center max-w-[300px]">
    <Card.Header>Sign in</Card.Header>
    <Card.Description>Currently, we only support third-party providers.</Card.Description>
    <Separator class="mt-3 mb-3" />
    <Card.Content>
        <Button>
            Google
        </Button>
    </Card.Content>
</Card.Root>
