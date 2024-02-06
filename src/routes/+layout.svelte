<!-- src/routes/+layout.svelte -->
<script>
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";

  import "../app.pcss";

  inject({ mode: dev ? "development" : "production" });

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<slot />
