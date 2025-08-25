

/**
 * Generate a random alphanumeric referral code
 * @param {number} length - length of the referral code (default: 8)
 * @returns {string} referral code
 */
export function generateReferralCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
