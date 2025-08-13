"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
    // ✅ Redirect to user dashboard
    window.location.href = "/dashboard";
  } else {
    alert(data.error || "Registration failed");
  }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f1a] text-white px-4">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">Register</h1>
        <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300" />
        <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300" />
        <input type="tel" placeholder="Contact No" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300" />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300" />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300" />
        <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full mb-6 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300" />
        <button className="w-full bg-orange-500 py-2 rounded-lg hover:bg-orange-600 transition-all hover:scale-105 font-semibold shadow-md shadow-orange-500/30">
          Register
        </button>
      </form>
    </div>
  );
}
