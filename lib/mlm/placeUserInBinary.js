// lib/mlm/placeUserInBinary.js
import prisma from "@/lib/prisma";

/**
 * Place a user into the binary tree using BFS.
 * Always fills the first available LEFT slot, then RIGHT slot.
 */
export async function placeUserInBinary(userId, sponsorId) {
  // 🚨 If no sponsor → put user at root
  if (!sponsorId) {
    console.warn("⚠️ No sponsor provided. Placing user at root.");
    return await prisma.binaryNode.create({
      data: {
        userId,
        sponsorId: null,
        leg: null,
      },
    });
  }

  // ✅ Verify sponsor exists
  const sponsor = await prisma.users.findUnique({
    where: { id: sponsorId },
  });

  if (!sponsor) {
    console.warn(`⚠️ Sponsor with ID ${sponsorId} not found. Assigning ROOT.`);
    return await prisma.binaryNode.create({
      data: {
        userId,
        sponsorId: null,
        leg: null,
      },
    });
  }

  // ---- BFS traversal queue ----
  let queue = [sponsorId];

  while (queue.length > 0) {
    const currentSponsorId = queue.shift();

    // Count children of current node
    const leftNode = await prisma.binaryNode.findFirst({
      where: { sponsorId: currentSponsorId, leg: "LEFT" },
    });

    const rightNode = await prisma.binaryNode.findFirst({
      where: { sponsorId: currentSponsorId, leg: "RIGHT" },
    });

    // ✅ If LEFT spot free → insert here
    if (!leftNode) {
      return await prisma.binaryNode.create({
        data: {
          userId,
          sponsorId: currentSponsorId,
          leg: "LEFT",
        },
      });
    }

    // ✅ If RIGHT spot free → insert here
    if (!rightNode) {
      return await prisma.binaryNode.create({
        data: {
          userId,
          sponsorId: currentSponsorId,
          leg: "RIGHT",
        },
      });
    }

    // Otherwise push children into queue for BFS
    queue.push(leftNode.userId);
    queue.push(rightNode.userId);
  }

  // 🚨 Should never hit this (unless DB is broken)
  throw new Error("No valid spot found in binary tree.");
}
