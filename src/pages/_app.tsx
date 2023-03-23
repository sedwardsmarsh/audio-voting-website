import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient>();

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey)
      throw new Error("Missing supabase env vars");
    let client = createBrowserSupabaseClient({ supabaseKey, supabaseUrl });
    setSupabaseClient(client);
  }, []);

  // short circuit if supabaseClient is not ready
  if (!supabaseClient) return <Component {...pageProps} />;

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />;
    </SessionContextProvider>
  );
}
