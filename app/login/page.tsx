"use client";

import { useState } from "react";
import { login } from "@/app/actions";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await login(formData);

    if (res && !res.success) {
      setError(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 antialiased font-sans transition-colors duration-200">
      <header className="w-full border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-slate-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-mono font-bold text-xs">
              L
            </div>
            <span className="font-semibold text-sm tracking-tight">LeadDesk Admin</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 max-w-sm mx-auto w-full px-6 py-20 flex flex-col justify-center">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold tracking-tight">Sign In to Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Enter credentials to access lead workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-700 dark:text-zinc-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs outline-none focus:border-slate-900 dark:focus:border-zinc-100"
                placeholder="admin@leaddesk.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-700 dark:text-zinc-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2.5 bg-slate-50/50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs outline-none focus:border-slate-900 dark:focus:border-zinc-100"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 dark:bg-zinc-100 hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium text-xs rounded-xl shadow-md transition disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}