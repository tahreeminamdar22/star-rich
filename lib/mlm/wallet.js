import prisma from "@/lib/prisma";

/**
 * Updates wallet balances for sponsor when new user registers
 */
export async function updateWallet(userId, sponsorId) {
  if (!sponsorId) return; // root user, no sponsor

  // Example: give direct bonus to sponsor’s wallet
  await prisma.wallet.upsert({
    where: { userId: sponsorId },
    update: {
      balance: { increment: 10 }, // you can set bonus rules here
    },
    create: {
      userId: sponsorId,
      balance: 10,
    },
  });

  return { success: true };
}
