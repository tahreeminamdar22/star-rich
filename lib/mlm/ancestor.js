import prisma from "../prisma";

/**
 * Update ancestor counts when a new user is placed.
 * @param {number} userId - The newly registered user's ID
 * @param {"left" | "right"} side - Side where the user was placed under their sponsor
 */
export async function updateAncestors(userId, side) {
  // Start climbing up from this user’s sponsor
  let current = await prisma.users.findUnique({
    where: { id: userId },
    select: { sponsorId: true },
  });

  while (current && current.sponsorId) {
    const sponsorId = current.sponsorId;

    // Increment left or right count for this ancestor
    await prisma.users.update({
      where: { id: sponsorId },
      data: {
        leftCount: side === "left" ? { increment: 1 } : undefined,
        rightCount: side === "right" ? { increment: 1 } : undefined,
      },
    });

    // Move upward
    current = await prisma.users.findUnique({
      where: { id: sponsorId },
      select: { sponsorId: true },
    });
  }
}
