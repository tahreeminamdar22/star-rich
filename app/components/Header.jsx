"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#0d0f1a] via-[#1a1f2e] to-[#331a0d] text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/img/logo.jpg"
              alt="Star Rich Logo"
              className="w-14 h-14 object-contain rounded-full shadow-md shadow-orange-400/30"
            />
            <span className="text-2xl font-extrabold tracking-wide text-orange-400 drop-shadow-lg">
              StarRich
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-base font-medium">
            <Link href="/" className="hover:text-orange-400 transition-colors duration-300">Home</Link>
            <Link href="/About" className="hover:text-orange-400 transition-colors duration-300">About</Link>
            <Link href="/Contact" className="hover:text-orange-400 transition-colors duration-300">Contact</Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="ml-4 px-5 py-2 rounded-full bg-orange-500 font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              Get Started Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-3xl text-orange-400 hover:text-orange-500 transition"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1a1f2e] text-white px-6 py-4 space-y-4 border-t border-white/10 animate-[slideDown_0.3s_ease]">
            <Link href="/" className="block hover:text-orange-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block hover:text-orange-400 transition" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block hover:text-orange-400 transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <button 
              onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full px-5 py-2 rounded-full bg-orange-500 font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        )}
      </header>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-lg text-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative border border-white/20 animate-[scaleUp_0.3s_ease]">
            
            {/* Close */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-red-400 text-xl transition-colors"
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center text-orange-400 mb-6">
              Welcome to StarRich
            </h2>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => { setIsModalOpen(false); router.push("/login"); }}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
              >
                Log In
              </button>
              <button
                onClick={() => { setIsModalOpen(false); router.push("/register"); }}
                className="w-full bg-white/20 border border-orange-400 text-orange-400 py-3 rounded-lg font-semibold hover:bg-orange-400 hover:text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
