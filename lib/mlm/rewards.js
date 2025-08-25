// lib/mlm/rewards.js
import prisma from "@/lib/prisma";
import { updateLedger } from "@/lib/mlm/ledger";
import { updateWallet } from "@/lib/mlm/wallet";

/**
 * Calculate and distribute rewards for a new registration/transaction
 * @param {number} userId - The ID of the new user
 * @param {number} sponsorId - The sponsor's ID
 * @param {string} preferredLeg - The leg chosen (left/right)
 */
export async function calculateRewards(userId, sponsorId, preferredLeg) {
  console.log("⚡ calculateRewards triggered:", { userId, sponsorId, preferredLeg });

  // Example reward percentages per level
  const rewardPercents = [0.1, 0.05, 0.02]; // level 1 → 10%, level 2 → 5%, level 3 → 2%

  let currentSponsor = sponsorId;
  let level = 1;

  while (currentSponsor && level <= rewardPercents.length) {
    const percent = rewardPercents[level - 1];
    const amount = 1000 * percent; // <-- temp logic: assume registration value = 1000

    console.log(
      `💰 Level ${level}: Giving ${amount} to sponsor ${currentSponsor} (from user ${userId})`
    );

    // Update sponsor's wallet
    await updateWallet(currentSponsor, amount);

    // Record in ledger
    await updateLedger({
      userId: currentSponsor,
      sourceUserId: userId,
      amount,
      level,
      type: "REWARD",
    });

    // Move up to next sponsor in the chain
    const sponsorRecord = await prisma.sponsors.findFirst({
      where: { userId: currentSponsor },
    });

    currentSponsor = sponsorRecord?.sponsorId || null;
    level++;
  }

  return { success: true, message: "Rewards calculated and distributed" };
}
