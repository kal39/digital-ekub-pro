"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { 
  Wallet, AlertTriangle, RefreshCw, UserCheck, Activity, 
  Layers, ArrowUpRight, BarChart3, ShieldCheck, HelpCircle, 
  Network, ArrowRight, Zap, Radio, LayoutDashboard, History,
  UserPlus, CheckCircle2, XCircle, ShieldAlert, Sliders, 
  Coins, Landmark, Settings, ChevronRight
} from 'lucide-react';

// Unified Corporate API Data Pipeline
const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API stream connection latency.");
    return await res.json();
  } catch (err) {
    return {
      userMetrics: { totalContributed: 45200, isPaidRound: false, trustScore: 780 },
      participants: [
        { name: "Dawit (Node-01)", faydaId: "ET-8392-8821", isPaidRound: true, hasWonPrize: true, wonRoundNum: 1, slotsAllocated: 1 },
        { name: "Aster (Node-02)", faydaId: "ET-4491-0029", isPaidRound: true, hasWonPrize: true, wonRoundNum: 2, slotsAllocated: 1 },
        { name: "Kal (You)", faydaId: "ET-9102-3932", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 2 },
        { name: "Hirut (Node-04)", faydaId: "ET-1102-7749", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 1 },
        { name: "Yonas (Node-05)", faydaId: "ET-5529-1104", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 1 }
      ],
      auditTrail: [
        "Escrow protocol configuration state validated successfully via client node.",
        "FAYDA Registry authenticated cryptographic verification link for member kal39.",
        "Consensus core ledger monitoring pipeline streaming on stand-by."
      ]
    };
  }
};

export default function RelaxedZenDashboard() {
  const { data, mutate } = useSWR('http://localhost:8080/api/member/profile', fetcher, {
    fallbackData: {
      userMetrics: { totalContributed: 45200, isPaidRound: false, trustScore: 780 },
      participants: [
        { name: "Dawit (Node-01)", faydaId: "ET-8392-8821", isPaidRound: true, hasWonPrize: true, wonRoundNum: 1, slotsAllocated: 1 },
        { name: "Aster (Node-02)", faydaId: "ET-4491-0029", isPaidRound: true, hasWonPrize: true, wonRoundNum: 2, slotsAllocated: 1 },
        { name: "Kal (You)", faydaId: "ET-9102-3932", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 2 },
        { name: "Hirut (Node-04)", faydaId: "ET-1102-7749", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 1 },
        { name: "Yonas (Node-05)", faydaId: "ET-5529-1104", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 1 }
      ],
      auditTrail: [
        "Assembling premium interface components...",
        "FAYDA Registry authenticated cryptographic verification link for member kal39."
      ]
    },
    refreshInterval: 15000 
  });

  // Administrative State Handling
  const [newName, setNewName] = useState("");
  const [newFayda, setNewFayda] = useState("");
  const [newSlots, setNewSlots] = useState("1");
  const [feedback, setFeedback] = useState("");

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeName, setActiveName] = useState("Cluster System Calibrated");

  const userMetrics = data?.userMetrics ?? { totalContributed: 0, isPaidRound: false, trustScore: 0 };
  const participants = data?.participants ?? [];
  const auditTrail = data?.auditTrail ?? [];

  const handleAdminOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newFayda) {
      setFeedback("Error: Missing biometric components.");
      return;
    }

    const updatedList = [
      ...participants,
      {
        name: `${newName} (Node-0${participants.length + 1})`,
        faydaId: newFayda,
        isPaidRound: false,
        hasWonPrize: false,
        wonRoundNum: 0,
        slotsAllocated: parseInt(newSlots)
      }
    ];

    mutate({
      ...data,
      participants: updatedList,
      auditTrail: [`Admin: Authorized access node entry for ${newName} via FAYDA pipeline.`, ...auditTrail]
    }, false);

    setNewName("");
    setNewFayda("");
    setFeedback("Node provisioned into cycle successfully.");
    setTimeout(() => setFeedback(""), 3000);
  };

  const togglePaymentStatus = (targetIndex: number) => {
    const updatedList = participants.map((p, idx) => {
      if (idx === targetIndex) return { ...p, isPaidRound: !p.isPaidRound };
      return p;
    });

    mutate({
      ...data,
      participants: updatedList,
      auditTrail: [`Admin: Modified payment clearance parameters for ${participants[targetIndex].name}.`, ...auditTrail]
    }, false);
  };

  const handleContribution = async () => {
    setPaymentLoading(true);
    const updatedList = participants.map((p) => {
      if (p.name.includes("Kal (You)")) return { ...p, isPaidRound: true };
      return p;
    });

    mutate({
      ...data,
      userMetrics: { ...userMetrics, isPaidRound: true },
      participants: updatedList,
      auditTrail: ["User: Authorized weekly account contribution via integrated multi-sig escrow.", ...auditTrail]
    }, false);

    try {
      await fetch('http://localhost:8080/api/ekub/contribute', { method: 'POST' });
    } catch (e) {
      console.warn("Server unavailable. Mutated cache values sustained locally.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const runLotteryAnimation = async () => {
    if (participants.length === 0) return;
    setIsSpinning(true);
    
    let finalWinner = "Kal (You)";
    try {
      const res = await fetch('http://localhost:8080/api/ekub/draw', { method: 'POST' }).then(r => r.json());
      if (res.winner) finalWinner = res.winner;
    } catch (e) {
      const poolNames = participants.map((p: any) => p.name);
      finalWinner = poolNames[Math.floor(Math.random() * poolNames.length)] || "Kal (You)";
    }
    
    let clicks = 0;
    const poolNames = participants.map((p: any) => p.name);
    
    const timer = setInterval(() => {
      if (poolNames.length > 0) {
        setActiveName(poolNames[Math.floor(Math.random() * poolNames.length)]);
      }
      if (clicks++ > 15) {
        clearInterval(timer);
        setActiveName(finalWinner);
        setIsSpinning(false);
        
        mutate({
          ...data,
          auditTrail: [`Consensus verified. Cycle funds disbursed to node destination: ${finalWinner}`, ...auditTrail]
        }, false);
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans flex relative overflow-hidden selection:bg-purple-500/20">
      
      {/* 1. RELAXED SIDEBAR INTERFACE: Clean, isolated operations sidebar panel */}
      <aside className="w-68 border-r border-slate-900 bg-[#030712] p-8 hidden lg:flex flex-col justify-between relative z-10 shrink-0 select-none">
        <div className="space-y-10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />
            <span className="font-mono text-xs font-black tracking-widest text-slate-100 uppercase">
              EKUB <span className="text-orange-500">PRO</span>
            </span>
          </div>

          <div className="space-y-8">
            {/* Nav Group 1 */}
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-600 tracking-widest block px-2 mb-3">Workspace Dashboard</span>
              <div className="space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 text-xs font-semibold px-3 py-2.5 bg-[#111827]/40 border border-slate-800/60 text-orange-400 rounded-xl transition-all">
                  <LayoutDashboard size={13} /> Console Hub
                </Link>
                <Link href="/dashboard/ledger" className="flex items-center gap-3 text-xs font-medium px-3 py-2.5 text-slate-400 hover:text-slate-100 rounded-xl transition-all">
                  <History size={13} /> System Audit Ledger
                </Link>
              </div>
            </div>

            {/* Nav Group 2: Requested Missing Sidebar Interaction Action Tabs */}
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-600 tracking-widest block px-2 mb-3">Core Modules</span>
              <div className="space-y-0.5">
                <button className="w-full flex items-center justify-between text-left px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-100 transition-all group">
                  <span className="flex items-center gap-3"><Coins size={13} className="text-purple-400 group-hover:text-purple-300" /> P2P Swap Marketplace</span>
                  <ChevronRight size={11} className="text-slate-700 group-hover:text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between text-left px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-100 transition-all group">
                  <span className="flex items-center gap-3"><Landmark size={13} className="text-purple-400 group-hover:text-purple-300" /> Collateral & Risk Vault</span>
                  <ChevronRight size={11} className="text-slate-700 group-hover:text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between text-left px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-100 transition-all group">
                  <span className="flex items-center gap-3"><Settings size={13} className="text-purple-400 group-hover:text-purple-300" /> System Preferences</span>
                  <ChevronRight size={11} className="text-slate-700 group-hover:text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 font-mono text-[9px] text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 text-purple-500 font-bold uppercase tracking-wider">
            <Radio size={10} className="animate-pulse" /> Security Matrix Online
          </div>
          <p>Key Node: kal39_auth_root</p>
        </div>
      </aside>

      {/* 2. COMPLETELY RELAXED CORE SCREEN: Minimal layout style framework */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Clean Typography Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/40 pb-6">
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase text-white">Command Overview</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Algorithmic Pool Parameters and Identity Node Oversight</p>
          </div>
          <Link href="/dashboard/ledger" className="text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors">
            Portfolio Audit Log <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Flat Minimal Warning Notice */}
        <div className="border border-orange-500/10 bg-orange-500/[0.01] p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3 items-center text-xs text-slate-400">
            <AlertTriangle size={14} className="text-orange-500 shrink-0" />
            <p>Your wallet allocation is short for Pool Cluster Alpha. Automated turn rotation consensus executes within 24 hours.</p>
          </div>
          <button className="text-xs font-bold text-orange-400 hover:text-orange-300 whitespace-nowrap">Deploy Cushion</button>
        </div>

        {/* Relaxed Data Rows - No Card Backgrounds, Pure Space Framing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-slate-900/30 pb-10">
          
          {/* Account Asset Section */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Wallet size={12}/> Capital Locked</span>
            <h2 className="text-3xl font-black font-mono tracking-tighter text-white">
              {userMetrics.totalContributed?.toLocaleString()} <span className="text-sm font-normal text-orange-500">ETB</span>
            </h2>
            <button 
              onClick={handleContribution}
              disabled={userMetrics.isPaidRound || paymentLoading}
              className={`text-xs font-bold uppercase tracking-wider font-mono transition-colors text-left block underline decoration-slate-800 ${
                userMetrics.isPaidRound ? 'text-emerald-500 pointer-events-none' : 'text-orange-400 hover:text-orange-300'
              }`}
            >
              {paymentLoading ? "Signing transaction payload..." : userMetrics.isPaidRound ? "✓ Dispatch Confirmed" : "Deposit Personal Contribution"}
            </button>
          </div>

          {/* Lottery Draw Engine Box */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><RefreshCw size={12}/> Consensus Draw</span>
            <div className="font-mono text-xs text-purple-400 font-bold bg-[#111827]/20 border border-slate-900 px-3 py-2 rounded-xl inline-block">
              {isSpinning ? `⚡ SYNCING: ${activeName}` : activeName}
            </div>
            <button 
              onClick={runLotteryAnimation} 
              disabled={isSpinning || participants.length === 0}
              className="w-full py-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-300 font-mono rounded-xl text-xs font-bold uppercase transition-all block text-center"
            >
              {isSpinning ? "Computing..." : "Trigger Consensus Extraction"}
            </button>
          </div>

          {/* Liquidity Ratio Info */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Activity size={12}/> Clearing Ratios</span>
            <div className="text-3xl font-black text-purple-500 font-mono tracking-tighter">
              {participants.reduce((acc: number, p: any) => acc + (p.isPaidRound ? 1 : 0), 0)}
              <span className="text-sm font-normal text-slate-600"> / {participants.length} Cleared Nodes</span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldAlert size={12} className="text-orange-400 shrink-0" />
              {participants.filter((p: any) => !p.isPaidRound).length} members lagging payment windows.
            </p>
          </div>
        </div>

        {/* Lower Content Rows Structure */}
        <div className="space-y-12">
          
          {/* A. Dynamic Node Registry Table Layout */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Active Cluster Membership Node Registry</h3>
              <p className="text-[11px] text-slate-600 font-medium">Click clearing actions to alter payment validation tokens directly.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-mono text-[9px] uppercase">
                    <th className="py-3 px-2">Participant Node Map</th>
                    <th className="py-3 px-2">FAYDA ID Track</th>
                    <th className="py-3 px-2 text-center">Allocated Slots</th>
                    <th className="py-3 px-2">Payout Status</th>
                    <th className="py-3 px-2 text-right">Cycle Clearing Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/30">
                  {participants.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-900/[0.05] transition-colors">
                      <td className="py-3 px-2 font-bold text-slate-300">{p.name}</td>
                      <td className="py-3 px-2 font-mono text-slate-500 tracking-wider">{p.faydaId || "ET-MOCK-SYSTEM"}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-slate-400">{p.slotsAllocated || 1}</td>
                      <td className="py-3 px-2">
                        {p.hasWonPrize ? (
                          <span className="text-[10px] font-mono text-purple-400">Lump Sum Disbursed (Rd {p.wonRoundNum})</span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-600">In Accumulation Queue</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => togglePaymentStatus(idx)}
                          className={`font-mono font-black text-[9px] uppercase tracking-widest transition-colors ${
                            p.isPaidRound ? "text-emerald-400 hover:text-emerald-300" : "text-rose-400 hover:text-rose-300 underline underline-offset-4 animate-pulse"
                          }`}
                        >
                          {p.isPaidRound ? "✓ CLEARED" : "✕ DELINQUENT"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* B. Flat Minimalist Onboarding Section (No card boxes, fields floating freely) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-900/40 pt-8 items-start">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><UserPlus size={14}/> Node Onboarding</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">Approve and provision additional biometric identifiers into the active consensus metrics frame.</p>
            </div>

            <form onSubmit={handleAdminOnboard} className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text"
                  placeholder="Legal Identify Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-transparent border-b border-slate-800 focus:border-purple-500 focus:outline-none py-2 text-xs text-slate-200 transition-colors"
                />
                <input 
                  type="text"
                  placeholder="FAYDA Cryptographic Reference Identifier"
                  value={newFayda}
                  onChange={(e) => setNewFayda(e.target.value)}
                  className="bg-transparent border-b border-slate-800 focus:border-purple-500 focus:outline-none py-2 text-xs font-mono text-slate-200 transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <select
                  value={newSlots}
                  onChange={(e) => setNewSlots(e.target.value)}
                  className="bg-transparent border-b border-slate-800 focus:border-purple-500 focus:outline-none py-1.5 text-xs font-mono text-slate-400"
                >
                  <option value="1">Allocate 1 Active Share Slot</option>
                  <option value="2">Allocate 2 Multi-Capacity Share Slots</option>
                  <option value="3">Allocate 3 Premium Share Slots</option>
                </select>
                
                <button type="submit" className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-slate-950 font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all">
                  Inject Authorized Node
                </button>
              </div>

              {feedback && (
                <p className={`text-[10px] font-mono mt-2 ${feedback.includes("Error") ? "text-rose-400" : "text-emerald-400"}`}>
                  {feedback}
                </p>
              )}
            </form>
          </div>

          {/* C. System Audit Streams Row */}
          <div className="border-t border-slate-900/40 pt-8 space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Layers size={12}/> Core Ecosystem Ledger Events</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {auditTrail.slice(0, 3).map((log: string, i: number) => (
                <div key={i} className="text-[11px] font-mono text-slate-400 border-l border-purple-500/40 pl-3 leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}