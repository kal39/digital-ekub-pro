"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, TrendingUp, ShieldAlert, ArrowUpRight, CheckCircle } from "lucide-react";

export default function LedgerAnalyticsPage() {
  // Mock analytical parameters mapping
  const ledgerHistory = [
    { id: "TX-9022", date: "2026-05-10", pool: "Weekly Tech Alpha", type: "Contribution", amount: 1000, status: "Settled" },
    { id: "TX-8911", date: "2026-05-03", pool: "Weekly Tech Alpha", type: "Contribution", amount: 1000, status: "Settled" },
    { id: "TX-7041", date: "2026-04-26", pool: "Real-Estate Seed Beta", type: "Disbursal Payout", amount: 120000, status: "Settled" },
    { id: "TX-6620", date: "2026-04-19", pool: "Weekly Tech Alpha", type: "Contribution", amount: 1000, status: "Settled" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-slate-950 text-slate-100 min-h-screen font-sans">
      
      {/* Ledger Workspace Navigation Header */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-100 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-black text-slate-100 uppercase tracking-tight">Ledger & Audits Center</h1>
            <p className="text-xs font-mono text-slate-500 mt-0.5">Immutable Transaction History Matrix</p>
          </div>
        </div>
      </div>

      {/* 1. Analytical Metric Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Total Lifetime Savings</span>
          <h3 className="text-2xl font-black font-mono mt-1 text-slate-100">143,000.00 <span className="text-xs text-orange-500 font-normal">ETB</span></h3>
          <span className="text-[10px] text-emerald-400 font-mono mt-2 block flex items-center gap-1">
            <TrendingUp size={10} /> +12.4% vs last quarter
          </span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Smart Collateral Reserve</span>
          <h3 className="text-2xl font-black font-mono mt-1 text-purple-400">15,000.00 <span className="text-xs text-slate-400 font-normal">ETB</span></h3>
          <span className="text-[10px] text-slate-500 font-mono mt-2 block">Locked safely within smart contracts</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Defaults / Latency Score</span>
          <h3 className="text-2xl font-black font-mono mt-1 text-slate-100">0 <span className="text-xs text-orange-500 font-normal">Missed</span></h3>
          <span className="text-[10px] text-purple-400 font-mono mt-2 block flex items-center gap-1">
            <CheckCircle size={10} /> Perfect contribution velocity verified
          </span>
        </div>
      </div>

      {/* 2. Graphical Pure-Tailwind CSS Bar Chart Visualization Component */}
      <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-3xl">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-1.5">
          <BarChart3 size={14} className="text-purple-500" /> Historical Deposit Volume Tracking
        </h3>
        <div className="h-48 flex items-end gap-3 sm:gap-6 pt-4 border-b border-slate-900 border-l border-slate-900 pl-4">
          {[40, 65, 35, 90, 55, 75, 95].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div 
                style={{ height: `${height}%` }}
                className="w-full bg-gradient-to-t from-purple-600 to-orange-500 rounded-t-lg transition-all duration-500 group-hover:brightness-125 relative"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-300 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {height * 200} ETB
                </div>
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter mt-1">M-{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Deep-Dive Full Ledger Datatable */}
      <div className="bg-slate-900/20 border border-slate-900 rounded-3xl overflow-hidden">
        <div className="p-5 border-b border-slate-900/80 bg-slate-900/10">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Audit Event Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-900 text-slate-500 font-mono text-[10px] uppercase bg-slate-950">
                <th className="p-4">Block Reference ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Pool Node Destination</th>
                <th className="p-4">Transaction Class</th>
                <th className="p-4 text-right">Volume amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 bg-slate-900/5">
              {ledgerHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-400">{item.id}</td>
                  <td className="p-4 text-slate-400 font-mono">{item.date}</td>
                  <td className="p-4 text-slate-200 font-medium">{item.pool}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.type.includes("Payout") ? "bg-purple-500/10 text-purple-400" : "bg-orange-500/10 text-orange-400"
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono font-black text-slate-100">{item.amount.toLocaleString()}.00 ETB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}