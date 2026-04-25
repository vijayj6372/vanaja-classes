declare module '@supabase/ssr' {
  export function createBrowserClient(url: string, anonKey: string): any;
  export function createServerClient(
    url: string,
    anonKey: string,
    options?: {
      cookies?: {
        getAll?: () => Array<{ name: string; value: string }>;
        setAll?: (cookiesToSet: Array<{ name: string; value: string; options?: any }>) => void;
      };
    }
  ): any;
}
