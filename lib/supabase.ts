import { createBrowserClient } from '@supabase/ssr'

// Note: In a production app, these should be in .env.local
// For this environment, we are using the provided credentials directly as fallback.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qbphxwdcimjsckfjknbo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9MjB9eloog3SDesvQTLIHg_DDvOPYRe';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
