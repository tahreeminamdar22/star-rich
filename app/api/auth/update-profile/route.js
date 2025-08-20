// app/api/auth/update-profile/route.js
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUserFromToken";
import db from "@/lib/db"; // mysql2 or pg connection

export async function POST(req) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email } = body;

  try {
    // Example raw SQL (MySQL)
    await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
