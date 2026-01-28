"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Users, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 shadow-xl hidden md:flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            NextHire
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Overview
          </p>
          <NavLink href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === "/dashboard"} />
          <NavLink href="/dashboard/jobs" icon={<Briefcase size={20} />} label="Jobs" active={pathname === "/dashboard/jobs"} />
          <NavLink href="/dashboard/users" icon={<Users size={20} />} label="Users" active={pathname === "/dashboard/users"} />

          <div className="pt-6">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Configuration
            </p>
            <NavLink href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" active={pathname === "/dashboard/settings"} />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
          : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
        }`}
    >
      <span className={`${active ? "" : "group-hover:scale-110"} transition-transform duration-200`}>
        {icon}
      </span>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </Link>
  );
}
