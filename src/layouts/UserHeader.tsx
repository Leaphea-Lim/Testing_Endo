"use client";

import Link from "next/link";

export default function UserHeader() {
  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
      {/* Left side: logo / nav */}
      <div className="flex items-center gap-4">
        <span className="text-white font-semibold">Dashboard</span>
        <Link href="/dashboard" className="text-slate-400 hover:text-white">Home</Link>
      </div>

      {/* Right side: user profile placeholder */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-700 rounded-full" />
        <span className="text-slate-300 text-sm">User</span>
      </div>
    </header>
  );
}
