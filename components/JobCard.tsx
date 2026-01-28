import Link from "next/link";
import { Job } from "../types";
import { MapPin, Building2, ArrowUpRight } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group relative bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
          <Building2 size={28} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
        </div>
        <div className="p-2 rounded-full bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="flex-1 space-y-3">
        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
          {job.title}
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <Building2 size={16} />
            {job.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} />
            {job.location}
          </span>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed pt-2">
          {job.description}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Time</span>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">Active</span>
      </div>
    </Link>
  );
}
