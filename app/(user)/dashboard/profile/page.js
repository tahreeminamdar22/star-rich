"use client";
import { useEffect, useState, useRef } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const cardRef = useRef(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
        setFormData(data.user);
      } catch (err) {
        console.error(err);
        alert("Please log in again.");
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = async () => {
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setUser(data.user || formData); // prefer updated user from API
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  // Print user card
  const handlePrint = () => {
    const printContents = cardRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(printContents);
    win.document.close();
    win.print();
  };

  // Copy referral link
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/register?ref=${user?.referralCode}`
    );
    alert("Referral link copied!");
  };

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-2 text-orange-400">
        Welcome {user?.name ? user.name : "Guest"} 👋
      </h1>
      <p className="text-gray-400 mb-6">
        Manage your account, view stats, and explore your earnings.
      </p>

      {/* Profile Info */}
      <div className="bg-white/5 p-6 rounded-xl shadow-lg border border-white/10 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Info</h2>

        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
              placeholder="Email"
            />
            <button
              onClick={handleSave}
              className="bg-green-600 px-4 py-2 rounded text-white"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-3 bg-blue-600 px-4 py-2 rounded text-white"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {/* Dynamic User ID Card */}
      <div
        ref={cardRef}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg text-white mb-6"
      >
        <h2 className="text-lg font-semibold mb-2">User ID Card</h2>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {user?.createdAt}</p>
      </div>
      <button
        onClick={handlePrint}
        className="bg-orange-500 px-4 py-2 rounded text-white mb-6"
      >
        Print ID Card
      </button>

      {/* Referral Link */}
      <div className="bg-white/5 p-6 rounded-xl shadow-lg border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Referral Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/register?ref=${user?.referralCode || "guest"}`}
            className="flex-1 p-2 rounded bg-gray-800 text-gray-300"
          />
          <button
            onClick={handleCopyReferral}
            className="ml-3 bg-green-600 px-4 py-2 rounded text-white"
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}
