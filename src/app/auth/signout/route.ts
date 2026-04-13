import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { origin } = new URL(request.url);

  await supabase.auth.signOut();

  return NextResponse.redirect(`${origin}/`, { status: 302 });
}
