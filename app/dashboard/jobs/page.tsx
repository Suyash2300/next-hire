"use client";

import { useMockStore } from "../../../hooks/useMockStore";
import { Plus, Search, MapPin, Building2, Trash2, Calendar, Briefcase, Eye } from "lucide-react";
import { useState } from "react";
import { Job } from "../../../types";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function JobsPage() {
    const { jobs, addJob, deleteJob, isLoaded } = useMockStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            company: "",
            location: "",
            description: ""
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Job title is required"),
            company: Yup.string()
                .required("Company name is required"),
            location: Yup.string()
                .required("Location is required"),
            description: Yup.string()
                .min(10, "Description must be at least 10 characters")
                .required("Description is required"),
        }),
        validateOnChange: true,
        onSubmit: (values, { resetForm }) => {
            const newJob: Job = {
                id: Math.random().toString(36).substr(2, 9),
                ...values,
                createdAt: new Date().toISOString()
            };
            addJob(newJob);
            setShowForm(false);
            resetForm();
        },
    });

    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isLoaded) return <div className="p-8 text-center text-slate-500 font-bold">Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Job Listings</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track all your active positions</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 scale-100 hover:scale-[1.02] active:scale-95"
                >
                    <Plus size={18} />
                    Post New Job
                </button>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-black text-slate-900">Add New Position</h2>
                                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
                                    <Plus className="rotate-45" size={24} />
                                </button>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Job Title</label>
                                    <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${formik.errors.title && formik.touched.title ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                                        }`}>
                                        <Briefcase className="text-slate-400 shrink-0" size={18} />
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="e.g. Senior Frontend Engineer"
                                            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.title}
                                        />
                                    </div>
                                    {formik.errors.title && formik.touched.title && <p className="text-xs font-bold text-red-500 ml-1">{formik.errors.title}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Company</label>
                                        <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${formik.errors.company && formik.touched.company ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                                            }`}>
                                            <Building2 className="text-slate-400 shrink-0" size={18} />
                                            <input
                                                id="company"
                                                name="company"
                                                type="text"
                                                placeholder="TechFlow"
                                                className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.company}
                                            />
                                        </div>
                                        {formik.errors.company && formik.touched.company && <p className="text-xs font-bold text-red-500 ml-1">{formik.errors.company}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                                        <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${formik.errors.location && formik.touched.location ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                                            }`}>
                                            <MapPin className="text-slate-400 shrink-0" size={18} />
                                            <input
                                                id="location"
                                                name="location"
                                                type="text"
                                                placeholder="Remote / City"
                                                className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.location}
                                            />
                                        </div>
                                        {formik.errors.location && formik.touched.location && <p className="text-xs font-bold text-red-500 ml-1">{formik.errors.location}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        placeholder="Briefly describe the role requirements..."
                                        className={`w-full px-5 py-3.5 rounded-2xl border transition-all font-medium resize-none ${formik.errors.description && formik.touched.description ? "border-red-300 ring-4 ring-red-500/10 focus:border-red-500" : "border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                            }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                    />
                                    {formik.errors.description && formik.touched.description && <p className="text-xs font-bold text-red-500 ml-1">{formik.errors.description}</p>}
                                </div>
                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-100"
                                    >
                                        Create Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                <div className="flex-1 flex items-center gap-3 px-4 py-2 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
                    <Search className="text-slate-400 shrink-0" size={20} />
                    <input
                        type="text"
                        placeholder="Search jobs by title or company..."
                        className="flex-1 bg-transparent border-none outline-none placeholder-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Jobs List */}
            <div className="grid gap-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all duration-200 group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <Link href={`/jobs/${job.id}`}>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {job.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Building2 size={14} /> {job.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> {job.location}
                                        </span>
                                        {job.createdAt && (
                                            <span className="flex items-center gap-1 text-xs">
                                                <Calendar size={14} /> {new Date(job.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                        Active
                                    </span>
                                    <Link
                                        href={`/jobs/${job.id}`}
                                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="View Public Listing"
                                    >
                                        <Eye size={18} />
                                    </Link>
                                    <button
                                        onClick={() => deleteJob(job.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Job"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-3 text-slate-600 text-sm line-clamp-2">
                                {job.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                        <p className="text-slate-500">No jobs found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
