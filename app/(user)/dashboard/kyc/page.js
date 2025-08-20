"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, IdCard, Landmark, CheckCircle, XCircle, Clock } from "lucide-react";

export default function KycPage() {
  const [kycStatus, setKycStatus] = useState("Pending"); // "Pending" | "Verified" | "Rejected"
  const [files, setFiles] = useState({
    aadhaar: null,
    pan: null,
    bank: null,
  });

  // Simulate fetch KYC status from API
  useEffect(() => {
    const fetchKyc = async () => {
      // Replace with actual API call
      const data = { status: "Pending" };
      setKycStatus(data.status);
    };
    fetchKyc();
  }, []);

  const handleFileChange = (e, type) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API to upload files
    console.log("Uploading KYC docs:", files);
    setKycStatus("Pending");
  };

  const renderStatus = () => {
    switch (kycStatus) {
      case "Verified":
        return (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <CheckCircle size={22} /> Verified
          </div>
        );
      case "Rejected":
        return (
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <XCircle size={22} /> Rejected
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
            <Clock size={22} /> Pending
          </div>
        );
    }
  };

  return (
    <main className="p-8 min-h-screen bg-gradient-to-b from-white to-orange-50">
      <h1 className="text-3xl font-extrabold mb-6 text-orange-600 drop-shadow-sm">
        🛡️ KYC Verification
      </h1>

      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-white rounded-xl shadow border-l-4 border-orange-400"
      >
        <h2 className="text-lg font-bold text-gray-700 mb-2">Current Status</h2>
        {renderStatus()}
      </motion.div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 space-y-6"
      >
        {/* Aadhaar */}
        <div>
          <label className=" font-medium text-gray-700 mb-1 flex items-center gap-2">
            <IdCard className="text-blue-500" size={20} />
            Upload Aadhaar
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "aadhaar")}
            className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* PAN */}
        <div>
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <IdCard className="text-purple-500" size={20} />
            Upload PAN
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "pan")}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Bank Details */}
        <div>
          <label className="font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Landmark className="text-green-500" size={20} />
            Upload Bank Details (Passbook / Cheque)
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, "bank")}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-orange-600 transition"
        >
          <Upload className="inline-block mr-2" size={18} />
          Submit for Verification
        </motion.button>
      </form>
    </main>
  );
}
