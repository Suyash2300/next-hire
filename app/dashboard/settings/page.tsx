"use client";

import { User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-slate-500 mt-2">Manage your account preferences and platform configuration.</p>
            </header>

            <div className="grid gap-6">
                <SettingsSection
                    icon={<User size={20} />}
                    title="Profile Information"
                    description="Update your personal details and public profile."
                >
                    <div className="grid gap-4 max-w-xl">
                        <div className="grid gap-2">
                            <label className="text-sm font-bold text-slate-700">Display Name</label>
                            <input
                                type="text"
                                defaultValue="Demo Developer"
                                className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-bold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                defaultValue="demo@example.com"
                                className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                </SettingsSection>

                <SettingsSection
                    icon={<Bell size={20} />}
                    title="Notifications"
                    description="Decide what updates you want to receive."
                >
                    <div className="space-y-4">
                        <Toggle label="Email notifications for new applications" checked />
                        <Toggle label="Newsletter and platform updates" />
                        <Toggle label="Security alerts" checked />
                    </div>
                </SettingsSection>

                <SettingsSection
                    icon={<Shield size={20} />}
                    title="Security"
                    description="Manage your password and account security."
                >
                    <button className="px-6 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition">
                        Change Password
                    </button>
                </SettingsSection>
            </div>
        </div>
    );
}

function SettingsSection({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    {icon}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    <p className="text-slate-500 text-sm">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

function Toggle({ label, checked = false }: { label: string, checked?: boolean }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-12 h-6 rounded-full relative transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${checked ? 'left-7' : 'left-1'}`} />
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{label}</span>
        </label>
    );
}
