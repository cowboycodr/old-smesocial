<script>
    import AuthCard from "$components/auth/auth-card.svelte";

    export let data;
    let { supabase, session, profile } = data;
    $: ({ supabase, session, profile } = data);
</script>

{#if !session}
    <AuthCard {supabase} />
{/if}