// app/dashboard/layout.js
"use client";
import Link from "next/link";
import { useState } from "react";



export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = ["profile", "team", "income", "kyc", "wallet"];

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white flex flex-col md:flex-row">
      {/* Header with Hamburger */}
      <header className="flex items-center justify-between bg-[#141726] p-4 md:hidden">
        <h2 className="text-2xl font-bold text-orange-400">Dashboard</h2>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Sidebar for md+ */}
      <aside className={`bg-[#141726] p-6 border-r border-white/10 md:flex md:flex-col md:w-64 hidden`}>
        <h2 className="text-2xl font-bold text-orange-400 mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {sections.map((sec) => (
            <Link
              key={sec}
              href={`/dashboard/${sec}`}
              className="text-left px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300"
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar / Drawer */}
      {menuOpen && (
        <aside className="fixed top-0 left-0 h-full w-64 bg-[#141726] p-6 border-r border-white/10 z-50 md:hidden">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Dashboard</h2>
          <nav className="flex flex-col gap-3">
            {sections.map((sec) => (
              <Link
                key={sec}
                href={`/dashboard/${sec}`}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Link>
            ))}
          </nav>
        </aside>
      )}

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
