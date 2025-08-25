// app/api/team/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Recursive helper to build tree
async function buildTree(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
   console.log(user);
  if (!user) return null;

  // Find children based on binary tree logic
  const leftId = user.id * 2;
  const rightId = user.id * 2 + 1;

  const children = [];

  const leftChild = await prisma.users.findUnique({
    where: { id: leftId },
    select: { id: true, name: true, email: true },
  });
  if (leftChild) {
    const leftTree = await buildTree(leftChild.id);
    children.push(leftTree);
  }

  const rightChild = await prisma.users.findUnique({
    where: { id: rightId },
    select: { id: true, name: true, email: true },
  });
  if (rightChild) {
    const rightTree = await buildTree(rightChild.id);
    children.push(rightTree);
  }

  return { ...user, children };
}

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = parseInt(url.searchParams.get("userId")); // logged-in user ID

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const tree = await buildTree(userId);
    return NextResponse.json({ tree });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to build binary tree" },
      { status: 500 }
    );
  }
}
