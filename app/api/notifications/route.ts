import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/actions/get-user-data";

export async function GET(request: Request) {
  const userData = await getUserData();

  if (!userData) {
    return NextResponse.json({ error: "No user data" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");
  const supabase = await createClient();

  let query = supabase
    .from("notifications")
    .select(
      `
      *,
      offer:offers (
        id,
        wanted_card,
        offered_card
      )
    `
    )
    .eq("user_id", userData.id)
    .order("seen", { ascending: true })
    .order("created_at", { ascending: false });

  if (!!status) {
    query = query.eq("seen", status !== "new");
  }

  const { data, error } = await query.range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    data,
  });
}
