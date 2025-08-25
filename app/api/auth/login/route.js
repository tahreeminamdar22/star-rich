// app/api/auth/login/route.js
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Use /api/auth/[...nextauth] instead of /api/auth/login" },
    { status: 410 } // Gone
  );
}
