import { createBrowserSupabaseClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useContext, createContext } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
console.log(supabaseUrl, supabaseKey)
const supabaseClient = createBrowserSupabaseClient({supabaseKey, supabaseUrl})
const SupabaseContext = createContext<SupabaseClient>(supabaseClient)

export function useSupabaseContext() {
    return useContext(SupabaseContext)
}