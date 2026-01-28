"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required"),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        setError("Invalid credentials. Try any email/password.");
      } else {
        router.push("/dashboard");
      }
      setLoading(false);
    },
  });

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your jobs and applications
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/50 border border-slate-100 sm:rounded-[2rem] sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email address</label>
                <div className={`flex items-center gap-3 px-4 py-3 search-input-group border rounded-2xl transition-all ${formik.errors.email && formik.touched.email ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                  }`}>
                  <Mail className="text-slate-400 shrink-0" size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                    placeholder="name@example.com"
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-1 ml-1 text-xs font-bold text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
                <div className={`flex items-center gap-3 px-4 py-3 search-input-group border rounded-2xl transition-all ${formik.errors.password && formik.touched.password ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                  }`}>
                  <Lock className="text-slate-400 shrink-0" size={18} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                    placeholder="••••••••"
                  />
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-1 ml-1 text-xs font-bold text-red-500">{formik.errors.password}</p>
                )}
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-100 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-slate-50">
              <p className="text-sm text-slate-500 font-medium">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-bold underline decoration-2 underline-offset-4">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              Hint: Use any email and password to log in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

