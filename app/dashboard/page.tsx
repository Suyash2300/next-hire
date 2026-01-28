"use client";

import Link from "next/link";
import { useMockStore } from "../../hooks/useMockStore";
import { Briefcase, Users, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { jobs, users, isLoaded } = useMockStore();

  if (!isLoaded) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;
  }

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back! Here's what's happening with your hiring platform.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Total Jobs"
          value={jobs.length}
          icon={<Briefcase className="text-blue-600" size={24} />}
          bg="bg-blue-50"
        />
        <StatCard
          label="Active Users"
          value={users.length}
          icon={<Users className="text-indigo-600" size={24} />}
          bg="bg-indigo-50"
        />
        <StatCard
          label="Applications"
          value={12}
          icon={<div className="text-emerald-600 font-bold text-xl">A</div>}
          bg="bg-emerald-50"
        />
        <StatCard
          label="Interviews"
          value={4}
          icon={<div className="text-purple-600 font-bold text-xl">I</div>}
          bg="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Job Postings</h2>
            <Link href="/dashboard/jobs" className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-200 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{job.company} • {job.location}</p>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Active
                  </span>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-6">No jobs posted yet.</p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">New Users</h2>
            <Link href="/dashboard/users" className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{user.name}</h3>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <div className="ml-auto">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-6">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon, bg }: { label: string; value: number | string; icon: React.ReactNode; bg: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
      </div>
    </div>
  );
}
