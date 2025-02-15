import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/actions/get-user-data";

export async function GET() {
  const userData = await getUserData();

  if (!userData) {
    return NextResponse.json({ error: "No user data" }, { status: 400 });
  }

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userData.id)
    .eq("seen", false);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    count: count || 0,
  });
}
