// app/dashboard/layout.js
import Link from "next/link";

export const metadata = {
  title: "User Dashboard",
};

export default function DashboardLayout({ children }) {
  const sections = ["profile", "team", "income", "kyc", "wallet"];

  return (
    <div className="flex min-h-screen bg-[#0d0f1a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141726] p-6 flex flex-col border-r border-white/10">
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

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
