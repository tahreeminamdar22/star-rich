"use client";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // In a real app, fetch logged-in user details here
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-400 mb-4">
          Welcome {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-300 mb-8">
          This is your personal dashboard. You can manage your account, view stats, and explore your earnings here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-300 text-sm">
              View and edit your personal details.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-2">Team</h2>
            <p className="text-gray-300 text-sm">
              View your team members and growth stats.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-xl font-semibold mb-2">Earnings</h2>
            <p className="text-gray-300 text-sm">
              Track your income and payouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
