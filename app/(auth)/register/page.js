"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Capture referral code from URL (?ref=XXXX)
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setFormData((f) => ({ ...f, referralCode: ref }));
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Auto-login user after registration
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (loginRes?.ok) {
          router.push("/dashboard");
        } else {
          alert("Registered, but auto-login failed. Please login manually.");
          router.push("/login");
        }
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f1a] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
      >
        <h1 className="text-3xl font-bold mb-6 text-orange-400 text-center">
          Register
        </h1>

        {formData.referralCode && (
          <p className="mb-4 text-sm text-green-400">
            Joining under referral: <b>{formData.referralCode}</b>
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <input
          type="tel"
          placeholder="Contact No"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={formData.referralCode || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              referralCode: e.target.value || null,
            })
          }
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

       
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
          className="w-full mb-6 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold shadow-md shadow-orange-500/30 transition-all hover:scale-105 ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
