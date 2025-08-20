"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Gift, ArrowDownCircle, ShieldCheck } from "lucide-react";

export default function IncomePage() {
  const [kycDone, setKycDone] = useState(false);
  const [income, setIncome] = useState({
    netProfit: 12500,
    rewards: 3200,
  });

  // Simulate fetch user KYC + income from API
  useEffect(() => {
    const fetchData = async () => {
      // Example: replace with API call
      const userData = { kycDone: true };
      setKycDone(userData.kycDone);
    };
    fetchData();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-b from-white to-orange-50">
      <h1 className="text-3xl font-extrabold mb-6 text-orange-600 drop-shadow-sm">
        💰 Income Summary
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Net Profit */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="text-green-500" size={28} />
            <h2 className="text-xl font-semibold text-gray-700">Net Profit</h2>
          </div>
          <p className="text-3xl font-bold text-green-600">
            ₹ {income.netProfit.toLocaleString()}
          </p>
        </motion.div>

        {/* Rewards */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <Gift className="text-purple-500" size={28} />
            <h2 className="text-xl font-semibold text-gray-700">Rewards</h2>
          </div>
          <p className="text-3xl font-bold text-purple-600">
            ₹ {income.rewards.toLocaleString()}
          </p>
        </motion.div>

        {/* Withdrawal Request */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200"
        >
          <div className="flex items-center gap-3 mb-3">
            <ArrowDownCircle className="text-orange-500" size={28} />
            <h2 className="text-xl font-semibold text-gray-700">
              Withdrawal Request
            </h2>
          </div>

          {kycDone ? (
            <button className="w-full mt-2 bg-orange-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-orange-600 transition">
              Request Withdrawal
            </button>
          ) : (
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-500">
                Complete <span className="font-semibold">KYC</span> to enable
                withdrawals.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
