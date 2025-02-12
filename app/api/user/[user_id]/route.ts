import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      username,
      icon,
      friend_id,
      created_at
    `
    )
    .eq("id", user_id)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
