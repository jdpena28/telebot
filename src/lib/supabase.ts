import { createClient } from "@supabase/supabase-js";
import type { SupabaseClientOptions } from "@supabase/supabase-js";
const options: SupabaseClientOptions<"public"> = {
  auth: {
    persistSession: false,
  },
};

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_APIKEY as string,
  options
);

export default supabase;
