"use client";

import { useMockStore, User } from "../../../hooks/useMockStore";
import { Plus, Search, Mail, Shield, Trash2, MoreVertical, User as UserIcon } from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
    const { users, addUser, deleteUser, isLoaded } = useMockStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user" as "user" | "admin"
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (formData.name.trim().length < 2) newErrors.name = "Full name is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
        };
        addUser(newUser);
        setShowForm(false);
        setFormData({ name: "", email: "", role: "user" });
        setErrors({});
    };

    if (!isLoaded) return <div className="p-8 text-center text-slate-500 font-bold">Loading user database...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Control access and manage platform members</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 scale-100 hover:scale-[1.02] active:scale-95"
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            {/* User Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-black text-slate-900">New Platform User</h2>
                                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
                                    <Plus className="rotate-45" size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                    <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${errors.name ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                                        }`}>
                                        <UserIcon className="text-slate-400 shrink-0" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Jane Cooper"
                                            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData({ ...formData, name: e.target.value });
                                                if (errors.name) setErrors({ ...errors, name: "" });
                                            }}
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs font-bold text-red-500 ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                    <div className={`flex items-center gap-3 px-4 py-3 border rounded-2xl transition-all ${errors.email ? "border-red-300 ring-4 ring-red-500/10" : "border-slate-200 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500"
                                        }`}>
                                        <Mail className="text-slate-400 shrink-0" size={18} />
                                        <input
                                            type="email"
                                            placeholder="jane@example.com"
                                            className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-slate-400"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                if (errors.email) setErrors({ ...errors, email: "" });
                                            }}
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs font-bold text-red-500 ml-1">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Role</label>
                                    <select
                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium appearance-none"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as "user" | "admin" })}
                                    >
                                        <option value="user">User / Candidate</option>
                                        <option value="admin">Administrator</option>
                                    </select>
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
                                        Create User
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
                        placeholder="Search users by name or email..."
                        className="flex-1 bg-transparent border-none outline-none placeholder-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">User</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Role</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-sm">
                                                    {user.avatar ? (
                                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        user.name.charAt(0)
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{user.name}</div>
                                                    <div className="text-sm text-slate-500 flex items-center gap-1">
                                                        <Mail size={12} /> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${user.role === 'admin'
                                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                                }`}>
                                                <Shield size={10} />
                                                {user.role}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
