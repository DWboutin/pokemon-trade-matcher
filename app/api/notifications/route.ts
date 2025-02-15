import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import populateOfferWithCardData from "@/utils/factories/populate-offer-with-card-data";
import { getUserData } from "@/actions/get-user-data";

export async function GET(request: Request) {
  const userData = await getUserData();

  if (!userData) {
    return NextResponse.json({ error: "No user data" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const supabase = await createClient();
  const query = supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userData.id)
    .order("created_at", { ascending: false });

  const { data, error } = await query.range((page - 1) * limit, page * limit - 1);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    data,
  });
}
