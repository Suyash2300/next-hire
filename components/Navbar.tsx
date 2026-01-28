"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useSession, signOut } from "next-auth/react";
import { ArrowRight, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Post a Job", href: "/dashboard" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-lg border-b border-slate-100 py-3" : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            N
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Next<span className="text-indigo-600">Hire</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {status === "loading" ? (
            <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-lg" />
          ) : status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="px-6 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition flex items-center gap-2 group border border-red-100"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center gap-2 group"
              >
                Join Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 focus:outline-none hover:bg-slate-50 rounded-lg transition-colors"
          >
            {isOpen ? <RxCross2 size={28} /> : <RxHamburgerMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 text-center font-bold flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="w-full py-4 rounded-2xl bg-red-50 text-red-600 text-center font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-900 text-center">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-center font-bold"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
