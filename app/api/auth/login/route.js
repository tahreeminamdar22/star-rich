import db from "@/lib/db.js";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", { expiresIn: "1d" });

    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
