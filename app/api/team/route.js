import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    // Get all users (with sponsorId)
    const users = await prisma.users.findMany({
      select: { id: true, name: true, email: true, sponsorId: true },
    });

    // Convert flat list into a tree
    const userMap = {};
    users.forEach((u) => (userMap[u.id] = { ...u, children: [] }));

    const tree = [];
    users.forEach((u) => {
      if (u.sponsorId && userMap[u.sponsorId]) {
        userMap[u.sponsorId].children.push(userMap[u.id]);
      } else {
        tree.push(userMap[u.id]); // Root (no sponsor)
      }
    });

    return NextResponse.json({ tree });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}
