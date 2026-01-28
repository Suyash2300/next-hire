"use client";

import { useMockStore } from "@/hooks/useMockStore";
import { useParams, useRouter } from "next/navigation";
import {
    MapPin,
    Building2,
    Calendar,
    ChevronLeft,
    Share2,
    Heart,
    ExternalLink,
    ArrowRight,
    Briefcase,
    Globe,
    Clock,
    CheckCircle
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function JobDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { jobs, isLoaded } = useMockStore();

    const job = jobs.find((j) => j.id === id);
    const [isApplied, setIsApplied] = useState(false);

    const handleApply = () => {
        setIsApplied(true);
    };

    if (!isLoaded) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 text-lg">Loading job details...</div>;

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-black text-slate-900 mb-4">Job Not Found</h1>
                <p className="text-slate-500 mb-8">The position you're looking for might have been closed or removed.</p>
                <Link
                    href="/jobs"
                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                    <ChevronLeft size={20} />
                    Back to Listings
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Link */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-12 transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to roles
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Job Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 pb-10 border-b border-slate-100">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-indigo-600 border border-slate-100">
                                        <Building2 size={40} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-black text-slate-900 mb-2">{job.title}</h1>
                                        <div className="flex flex-wrap items-center gap-4 text-slate-500 font-bold">
                                            <span className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-pointer">
                                                {job.company}
                                                <ExternalLink size={14} />
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5">{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100">
                                        <Heart size={24} />
                                    </button>
                                    <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100">
                                        <Share2 size={24} />
                                    </button>
                                </div>
                            </div>

                            <article className="prose prose-slate max-w-none">
                                <h2 className="text-2xl font-black text-slate-900 mb-6">About the Role</h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    {job.description}
                                </p>

                                <h2 className="text-2xl font-black text-slate-900 mb-6">Requirements</h2>
                                <ul className="space-y-4 mb-10">
                                    {[
                                        "3+ years of professional experience in the field",
                                        "Strong understanding of modern software development practices",
                                        "Excellent communication and collaboration skills",
                                        "Ability to work in a fast-paced environment",
                                        "Experience with Next.js, React and TypeScript is a plus"
                                    ].map((req, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-600 font-medium">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>

                                <h2 className="text-2xl font-black text-slate-900 mb-6">Benefits</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Competitive salary & equity pack",
                                        "Flexible hours & remote options",
                                        "Health, dental & vision insurance",
                                        "Generous PTO & holiday leave"
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-bold text-sm">
                                            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                                ✓
                                            </div>
                                            {benefit}
                                        </div>
                                    ))}
                                </div>
                            </article>
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200/20">
                            {isApplied ? (
                                <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black">Application Sent!</h3>
                                    <p className="text-slate-400 text-sm font-medium">
                                        We've received your application for the {job.title} position. Good luck!
                                    </p>
                                    <button
                                        onClick={() => router.push('/jobs')}
                                        className="w-full mt-4 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold transition-all"
                                    >
                                        Browse more jobs
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-black mb-8">Ready to apply?</h3>
                                    <button
                                        onClick={handleApply}
                                        className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 mb-4"
                                    >
                                        Apply for this role
                                        <ArrowRight size={20} />
                                    </button>
                                    <p className="text-slate-400 text-center text-sm font-medium">
                                        Takes less than 2 minutes
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                            <h3 className="text-xl font-black text-slate-900">Job Summary</h3>
                            <div className="space-y-6">
                                <SummaryItem
                                    icon={<Calendar size={20} />}
                                    label="Date Posted"
                                    value={job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Just now"}
                                />
                                <SummaryItem
                                    icon={<Globe size={20} />}
                                    label="Location"
                                    value={job.location}
                                />
                                <SummaryItem
                                    icon={<Briefcase size={20} />}
                                    label="Role Type"
                                    value="Full-time"
                                />
                                <SummaryItem
                                    icon={<Clock size={20} />}
                                    label="Reporting To"
                                    value="Engineering Manager"
                                />
                            </div>
                        </div>

                        <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100">
                            <h3 className="text-indigo-900 font-black mb-4">Hiring Process</h3>
                            <p className="text-indigo-700 text-sm font-medium leading-relaxed">
                                Our process usually takes 2-3 weeks from initial screening to final offer. We value your time!
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

function SummaryItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-slate-900 font-black">{value}</p>
            </div>
        </div>
    );
}
