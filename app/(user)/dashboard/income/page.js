"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IndianRupee , Gift, ArrowDownCircle, ShieldCheck } from "lucide-react";

export default function IncomePage() {
  const [kycDone, setKycDone] = useState(false);
  const [income, setIncome] = useState({
    netProfit: 12500,
    rewards: 3200,
  });

  // Simulate fetch user KYC + income from API
  useEffect(() => {
    const fetchData = async () => {
      const userData = { kycDone: true }; // replace with API call
      setKycDone(userData.kycDone);
    };
    fetchData();
  }, []);

  const cardClasses =
    "bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between";

  return (
    <main className="p-8 min-h-screen ">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-10 text-orange-600 drop-shadow-sm"
      >
        💰 Income Summary
      </motion.h1>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Net Profit */}
        <motion.div whileHover={{ scale: 1.05 }} className={cardClasses}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <IndianRupee  className="text-green-500" size={30} />
              <h2 className="text-lg font-semibold text-gray-700">
                Net Profit
              </h2>
            </div>
            <p className="text-3xl font-bold text-green-600">
              ₹ {income.netProfit.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div whileHover={{ scale: 1.05 }} className={cardClasses}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Gift className="text-purple-500" size={30} />
              <h2 className="text-lg font-semibold text-gray-700">Rewards</h2>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              ₹ {income.rewards.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Withdrawal Request */}
        <motion.div whileHover={{ scale: 1.05 }} className={cardClasses}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ArrowDownCircle className="text-orange-500" size={30} />
              <h2 className="text-lg font-semibold text-gray-700">
                Withdrawal Request
              </h2>
            </div>

            {kycDone ? (
              <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-xl shadow hover:from-orange-600 hover:to-orange-700 transition-all">
                Request Withdrawal
              </button>
            ) : (
              <div className="flex flex-col items-center text-center py-6">
                <ShieldCheck className="text-gray-400 mb-2" size={28} />
                <p className="text-sm text-gray-500">
                  Complete <span className="font-semibold">KYC</span> to enable
                  withdrawals.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
