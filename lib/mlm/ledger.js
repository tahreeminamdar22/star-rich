// lib/mlm/ledger.js
import prisma from "@/lib/prisma";

/**
 * Recommended types. Match these to your Prisma enum if you have one.
 */
export const LEDGER_TYPE = {
  REGISTRATION: "REGISTRATION",
  REWARD: "REWARD",
  INCOME_BINARY: "INCOME_BINARY",
  UPGRADE_CREDIT: "UPGRADE_CREDIT",
  UPGRADE_CREDIT_LOCKED: "UPGRADE_CREDIT_LOCKED",
  COMPANY_FUND: "COMPANY_FUND",
};

/**
 * Create a ledger entry.
 * - Works both standalone and inside prisma.$transaction
 * - If you pass a tx client, it uses that; otherwise uses the global prisma
 *
 * @param {object} entry
 * @param {number} entry.userId            // who receives this entry
 * @param {string} entry.type              // see LEDGER_TYPE
 * @param {number} entry.amount            // positive (credit) or negative (debit)
 * @param {string} [entry.description]     // optional note
 * @param {number} [entry.sourceUserId]    // e.g., the downline that triggered this
 * @param {object} [entry.meta]            // arbitrary JSON (orderId, txnId, etc.)
 * @param {object} [tx]                    // optional Prisma transaction client
 */
export async function addLedgerEntry(
  { userId, type, amount, description = "", sourceUserId = null, meta = {} },
  tx
) {
  if (!userId || !type || typeof amount !== "number") {
    throw new Error("userId, type and numeric amount are required for ledger entry");
  }

  const db = tx || prisma;

  // If you’re using a Prisma enum, you can validate here:
  // if (!Object.values(LEDGER_TYPE).includes(type)) throw new Error("Invalid ledger type");

  return db.ledger.create({
    data: {
      userId,
      type,
      amount,
      description,
      sourceUserId,
      meta,
    },
  });
}

/**
 * Alias kept for backwards compatibility with earlier code that calls updateLedger(userId, payload).
 * You can delete this later and import addLedgerEntry directly.
 */
export async function updateLedger(
  userId,
  { type, amount = 0, description = "", sourceUserId = null, meta = {} },
  tx
) {
  return addLedgerEntry({ userId, type, amount, description, sourceUserId, meta }, tx);
}

/**
 * Optional helpers
 */

/** Sum of all ledger amounts for a user (credits - debits) */
export async function getLedgerBalance(userId, tx) {
  const db = tx || prisma;
  const { _sum } = await db.ledger.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  return _sum.amount ?? 0;
}

/** Fetch recent entries for a user (for dashboard/history) */
export async function getRecentLedger(userId, limit = 20, tx) {
  const db = tx || prisma;
  return db.ledger.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
