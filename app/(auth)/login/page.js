"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert(res?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f1a] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-orange-400 text-center">
          Log In
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 bg-white/20 border border-white/30 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-200 placeholder-gray-300"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 py-2 rounded-lg hover:bg-orange-600 transition-all hover:scale-105 font-semibold shadow-md shadow-orange-500/30"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-orange-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
