import db from "@/lib/db.js";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
    const {name, address, contact, email, password} = await req.json();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if(rows.length > 0){
        return NextResponse.json({ error: "Email alredy exsits"}, {status: 400 } );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query("INSERT INTO users (name, address, contact, email, password) VALUES (?, ?, ?, ?, ?)",
        [name, address, contact, email, hashedPassword]
    );
    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
}