// components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0d0f1a] via-[#1a1f2e] to-[#331a0d] text-gray-300 py-6 mt-10 border-t border-white/10">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Developed By{" "}
        <Link
          href="https://www.kumarinfotech.net/"
          target="_blank"
          className="text-orange-400 hover:text-orange-300 transition"
        >
          Kumar Infotech
        </Link>. All rights reserved.
      </div>
    </footer>
  );
}
