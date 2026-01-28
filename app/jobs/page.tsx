"use client";

import { useMockStore } from "@/hooks/useMockStore";
import { Search, MapPin, Building2, Calendar, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function PublicJobsPage() {
    const { jobs, isLoaded } = useMockStore();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isLoaded) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 text-lg">Loading jobs...</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <header className="bg-white border-b border-slate-100 pt-16 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Browse Open Roles</h1>
                    <p className="text-slate-500 text-xl max-w-2xl mx-auto">
                        Discover your next career move from our curated list of high-growth companies.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20">
                {/* Search & Filter Bar */}
                <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-4 mb-12">
                    <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all group">
                        <Search className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Search by job title, company name..."
                            className="bg-transparent border-none outline-none w-full text-lg font-medium placeholder-slate-400 text-slate-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        <Filter size={20} />
                        Filters
                    </button>
                    <button className="px-10 py-4 bg-indigo-600 rounded-2xl font-black text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        Search
                    </button>
                </div>

                {/* Job Count */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900">
                        Showing <span className="text-indigo-600">{filteredJobs.length}</span> positions
                    </h2>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                        Sort by: <span className="text-slate-900">Newest First</span>
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/30 hover:border-indigo-100 transition-all duration-300 group relative flex flex-col md:flex-row md:items-center justify-between gap-8"
                            >
                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-wider leading-none">
                                            {new Date(job.createdAt || Date.now()).toLocaleDateString() === new Date().toLocaleDateString() ? "New" : "Remote"}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-wider leading-none">
                                            Full-time
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 font-bold">
                                            <span className="flex items-center gap-2">
                                                <Building2 size={18} className="text-slate-400" />
                                                {job.company}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <MapPin size={18} className="text-slate-400" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Calendar size={18} className="text-slate-400" />
                                                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 leading-relaxed font-medium line-clamp-2">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center md:items-stretch lg:items-center gap-3">
                                    <Link
                                        href={`/jobs/${job.id}`}
                                        className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-center hover:bg-slate-800 transition-all shadow-lg"
                                    >
                                        Apply Now
                                    </Link>
                                    <Link
                                        href={`/jobs/${job.id}`}
                                        className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-center hover:bg-slate-50 transition-all"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-200 border-dashed">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={32} className="text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs matched your search</h3>
                            <p className="text-slate-500">Try adjusting your keywords or filters to find more roles.</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-8 text-indigo-600 font-black hover:text-indigo-700 transition-colors underline underline-offset-4"
                            >
                                Clear all search terms
                            </button>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-32 p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Want to post a job?</h2>
                        <p className="text-slate-500 text-lg font-medium">Get your roles in front of thousands of top candidates.</p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-10 py-5 bg-indigo-600 rounded-2xl font-black text-white text-xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-100 flex items-center gap-2"
                    >
                        Post a Job <ArrowRight />
                    </Link>
                </div>
            </main>
        </div>
    );
}
