import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { placeUserInBinary } from "@/lib/mlm/placeUserInBinary";
import { updateAncestors } from "@/lib/mlm/ancestor";
import { updateLedger } from "@/lib/mlm/ledger";
import { updateWallet } from "@/lib/mlm/wallet";
import { calculateRewards } from "@/lib/mlm/rewards";

/**
 * Handles full registration + MLM workflow in a single transaction
 */
export async function runTransaction({
  name,
  email,
  password,
  contact,
  address,
  sponsorId,
}) {
  // --- Input validation ---
  if (!name?.trim()) throw new Error("Name is required");
  if (!email?.trim()) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (!contact?.trim()) throw new Error("Contact is required");
  if (!address?.trim()) throw new Error("Address is required");

  const normalizedEmail = email.toLowerCase().trim();

  return await prisma.$transaction(
    async (tx) => {
      // --- 1. Prevent duplicates ---
      const exists = await tx.Users.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
      });
      if (exists) throw new Error("User already exists with this email");

      // --- 2. Secure password ---
      const hashedPassword = await bcrypt.hash(password, 10);

      // --- 3. Create user ---
      const user = await tx.Users.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
          sponsorId,
          contact: contact.trim(),
          address: address.trim(),
        },
        select: { id: true, email: true, name: true },
      });

      // --- 4. Place in binary tree ---
      const node = await placeUserInBinary(tx, user.id, sponsorId);

      // --- 5. Update genealogy if sponsor exists ---
      if (sponsorId) {
        await updateAncestors(tx, user.id, sponsorId);
      }

      // --- 6. Log activity in ledger ---
      await updateLedger(tx, user.id, {
        type: "REGISTRATION",
        amount: 0,
        description: "User registered successfully",
      });

      // --- 7. Financial side-effects (sponsor only) ---
      if (sponsorId) {
        await updateWallet(tx, user.id, sponsorId);
        await calculateRewards(tx, user.id, sponsorId);
      }

      // --- Done ---
      return {
        success: true,
        message: "User registered & MLM flow completed",
        user,
        node,
      };
    },
    {
      timeout: 20000, // max runtime
      maxWait: 5000,  // wait time for slot
    }
  );
}
