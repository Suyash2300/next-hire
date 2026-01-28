"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, Briefcase, Users, Zap, Shield, Globe, Star } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Now hiring for 2,000+ open roles
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
                        Find your next <span className="text-indigo-600">dream job</span> <br />
                        in a few clicks.
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-12 leading-relaxed">
                        The modern job board for the next generation of builders.
                        Connect with top companies and grow your career with NextHire.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/auth/signup"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
                        >
                            Get Started Now
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/jobs"
                            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            Browse Jobs
                        </Link>
                    </div>

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center justify-center p-4">
                            <span className="text-2xl font-black text-slate-400">GOOGLE</span>
                        </div>
                        <div className="flex items-center justify-center p-4">
                            <span className="text-2xl font-black text-slate-400">META</span>
                        </div>
                        <div className="flex items-center justify-center p-4">
                            <span className="text-2xl font-black text-slate-400">AMAZON</span>
                        </div>
                        <div className="flex items-center justify-center p-4">
                            <span className="text-2xl font-black text-slate-400">APPLE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-2">
                            <h3 className="text-5xl font-black text-indigo-400">10k+</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Active Users</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-5xl font-black text-indigo-400">5k+</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Companies</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-5xl font-black text-indigo-400">24/7</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Why choose NextHire?</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            We've built the fastest, most intuitive platform for finding your next career move.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-amber-500" size={32} />}
                            title="Fast Applications"
                            description="Apply to jobs in seconds with our one-click application system and saved profiles."
                        />
                        <FeatureCard
                            icon={<Shield className="text-emerald-500" size={32} />}
                            title="Verified Companies"
                            description="Every company on our platform is hand-verified to ensure safe and legitimate opportunities."
                        />
                        <FeatureCard
                            icon={<Globe className="text-blue-500" size={32} />}
                            title="Remote Friendly"
                            description="Browse thousands of remote-first roles from companies all over the world."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-2xl" />

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">
                            Ready to take the next step?
                        </h2>
                        <p className="text-indigo-100 text-xl mb-12 max-w-xl mx-auto relative z-10">
                            Join thousands of professionals finding their dream roles every single day.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <Link
                                href="/auth/signup"
                                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-indigo-600 font-black text-xl hover:scale-105 transition-all shadow-xl"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black">
                            N
                        </div>
                        <span className="text-xl font-black text-slate-900">NextHire</span>
                    </div>
                    <div className="flex gap-8">
                        <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors font-medium">Privacy</Link>
                        <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors font-medium">Terms</Link>
                        <Link href="#" className="text-slate-400 hover:text-indigo-600 transition-colors font-medium">Contact</Link>
                    </div>
                    <p className="text-slate-400 font-medium">
                        © {new Date().getFullYear()} NextHire. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}
