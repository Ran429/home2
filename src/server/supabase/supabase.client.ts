import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
const supabaseKey =
  process.env.SUPABASE_API_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY ??
  null;

if (!supabaseKey || !supabaseUrl) {
  throw Error("supabase env is not defined!");
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const UPLOAD_BUCKET_NAME = "klea_uploads";
export const STATIC_BUCKET_NAME = "klea_static";

export default supabaseClient;
