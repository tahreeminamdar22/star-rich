import { NextResponse } from "next/server";
import { runTransaction } from "@/lib/mlm/transaction";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📩 Incoming registration:", body);

    const {
      name,
      email,
      password,
      confirmPassword,
      contact,
      address,
      referralCode, // 👈 sponsor’s referral code entered by user
    } = body;

    // ✅ Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Name, email, password, and confirmPassword are required" },
        { status: 400 }
      );
    }

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // ✅ Prevent duplicate emails
    const existingUser = await prisma.Users.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Resolve sponsorId from referralCode (if provided)
    let sponsorId = null;
    if (referralCode) {
      const sponsor = await prisma.Users.findUnique({
        where: { referralCode: referralCode.trim() },
        select: { id: true },
      });

      if (!sponsor) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        );
      }
      sponsorId = sponsor.id;
    }

    // ✅ Run user creation + placement transaction
    const result = await runTransaction({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword, // already hashed
      contact: contact?.trim() || null,
      address: address?.trim() || null,
      sponsorId,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("🔥 Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
