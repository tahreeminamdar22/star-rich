"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ No need to check data.token because it’s in cookie
        router.push("/dashboard"); 
      } else {
        setError(data.error || "Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f1a] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">
          Log In
        </h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mb-6 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 py-2 rounded-lg hover:bg-orange-600 transition-all hover:scale-105 font-semibold shadow-md shadow-orange-500/30"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
