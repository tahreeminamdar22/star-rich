"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowDownToLine, ArrowUpToLine, Clock, CheckCircle, XCircle } from "lucide-react";

export default function WalletPage() {
  const [kycStatus, setKycStatus] = useState("Pending"); // "Pending" | "Verified" | "Rejected"
  const [balance, setBalance] = useState(2500); // Example wallet balance
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulated API call
    const fetchWallet = async () => {
      // Replace with actual API call
      setKycStatus("Verified");
      setTransactions([
        { id: 1, type: "Deposit", amount: 5000, status: "Completed", date: "2025-08-10" },
        { id: 2, type: "Withdrawal", amount: 2000, status: "Pending", date: "2025-08-12" },
        { id: 3, type: "Reward", amount: 1000, status: "Completed", date: "2025-08-15" },
      ]);
    };
    fetchWallet();
  }, []);

  const handleWithdraw = () => {
    if (kycStatus !== "Verified") return alert("KYC not verified!");
    // API call to request withdrawal
    alert("Withdrawal request submitted!");
  };

  const statusBadge = (status) => {
    if (status === "Completed")
      return <span className="flex items-center gap-1 text-green-600 font-semibold text-sm"><CheckCircle size={16}/>Completed</span>;
    if (status === "Pending")
      return <span className="flex items-center gap-1 text-yellow-600 font-semibold text-sm"><Clock size={16}/>Pending</span>;
    return <span className="flex items-center gap-1 text-red-600 font-semibold text-sm"><XCircle size={16}/>Failed</span>;
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-b from-white to-orange-50">
      <h1 className="text-3xl font-extrabold mb-6 text-orange-600 drop-shadow-sm">
        <Wallet className="inline-block mr-2" size={28}/> Wallet
      </h1>

      {/* Wallet Balance */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-orange-500"
      >
        <h2 className="text-lg font-bold text-gray-700 mb-2">Available Balance</h2>
        <p className="text-3xl font-extrabold text-orange-600">₹ {balance.toLocaleString()}</p>
      </motion.div>

      {/* Withdraw Button (only if KYC approved) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={handleWithdraw}
          disabled={kycStatus !== "Verified"}
          className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2 transition ${
            kycStatus === "Verified"
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowDownToLine size={20}/>
          Withdraw to Bank
        </button>
        {kycStatus !== "Verified" && (
          <p className="text-sm text-gray-500 mt-2">⚠️ Complete KYC to enable withdrawals.</p>
        )}
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100"
      >
        <h2 className="text-lg font-bold text-gray-700 mb-4">Transaction History</h2>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-100 text-gray-700">
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-orange-50">
                    <td className="p-3 font-medium text-gray-800 flex items-center gap-2">
                      {tx.type === "Withdrawal" ? (
                        <ArrowUpToLine className="text-red-500" size={18}/>
                      ) : (
                        <ArrowDownToLine className="text-green-500" size={18}/>
                      )}
                      {tx.type}
                    </td>
                    <td className="p-3 text-gray-700">₹ {tx.amount.toLocaleString()}</td>
                    <td className="p-3 text-gray-600">{tx.date}</td>
                    <td className="p-3">{statusBadge(tx.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No transactions yet.</p>
        )}
      </motion.div>
    </main>
  );
}
