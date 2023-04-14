// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { Gafata } from "next/font/google";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
type Data = {
  data: unknown;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabaseClient = createBrowserSupabaseClient({
    supabaseKey,
    supabaseUrl,
  });
  async function getData() {
    const { data, error } = await supabaseClient
      .rpc("get_all_sound_links_shuffled")
      .select("*");
    return data;
  }
  getData().then((data) => {
    res.status(200).json({ data: data });
  });
}
