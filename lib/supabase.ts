import { createBrowserClient } from '@supabase/ssr';

type SupabaseBrowserClient = ReturnType<typeof createBrowserClient>;

let browserClient: SupabaseBrowserClient | null = null;

function getSupabaseClient(): SupabaseBrowserClient {
  if (browserClient) return browserClient;

  const runtimeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
  const supabaseUrl = runtimeEnv.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = runtimeEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}

// Lazy proxy prevents build-time evaluation errors during prerender.
export const supabase = new Proxy({} as SupabaseBrowserClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseClient() as Record<PropertyKey, unknown>;
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? (value as Function).bind(client) : value;
  },
});
