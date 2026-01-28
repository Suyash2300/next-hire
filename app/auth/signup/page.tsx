"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMockStore } from "@/hooks/useMockStore";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { addUser } = useMockStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (name.trim().length < 2) newErrors.name = "Full name is required.";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        // ✅ Save to local mock store so it appears in User Management
        addUser({
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: email.includes("admin") ? "admin" : "user",
          avatar: `https://i.pravatar.cc/150?u=${email}`
        });

        router.push("/auth/login");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500">
          Start your journey with NextHire today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/50 border border-slate-100 sm:rounded-[2rem] sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
              <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${errors.name ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                }`}>
                <User className="text-slate-400 shrink-0" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 ml-1 text-xs font-bold text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email address</label>
              <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${errors.email ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                }`}>
                <Mail className="text-slate-400 shrink-0" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 ml-1 text-xs font-bold text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
              <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${errors.password ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                }`}>
                <Lock className="text-slate-400 shrink-0" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 ml-1 text-xs font-bold text-red-500">{errors.password}</p>}
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed gap-2"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Sign up
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-50">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-bold underline decoration-2 underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
