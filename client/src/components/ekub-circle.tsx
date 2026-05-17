"use client";

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Wallet, AlertTriangle, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CompactEkubDashboard() {
  // 1. Real-time Sync & Cache management via SWR (Auto-revalidates on window focus)
  const { data, error } = useSWR('http://localhost:8080/api/member/profile', fetcher, {
    refreshInterval: 5000 // Polling fallback if WebSockets aren't configured on the port
  });

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeName, setActiveName] = useState("");

  if (error) return <div className="p-8 text-red-500 font-mono">Synchronization Pipeline Fault.</div>;
  if (!data) return <div className="p-8 text-purple-500 font-mono animate-pulse">Synchronizing Ledger Ecosystem...</div>;

  const { cycleState, userMetrics, participants, auditTrail } = data;

  // 2. Ultra-Short Optimistic UI Implementation
  const handleContribution = async () => {
    setPaymentLoading(true);

    // Locally force the UI to state "Paid" instantly before network resolves
    const optimisticData = { ...data, userMetrics: { ...userMetrics, isPaidRound: true } };
    mutate('http://localhost:8080/api/member/profile', optimisticData, false); 

    await fetch('http://localhost:8080/api/ekub/contribute', { method: 'POST' });
    mutate('http://localhost:8080/api/member/profile'); // Revalidate with real DB state
    setPaymentLoading(false);
  };

  // 3. Compact UI Shuffling Visualizer
  const runLotteryAnimation = async () => {
    setIsSpinning(true);
    const res = await fetch('http://localhost:8080/api/ekub/draw', { method: 'POST' }).then(r => r.json());
    
    let clicks = 0;
    const poolNames = participants.map((p: any) => p.name);
    const timer = setInterval(() => {
      setActiveName(poolNames[Math.floor(Math.random() * poolNames.length)]);
      if (clicks++ > 15) {
        clearInterval(timer);
        setActiveName(res.winner || "Cycle Finalized");
        setIsSpinning(false);
        mutate('http://localhost:8080/api/member/profile');
      }
    }, 70);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* AI Cushion Alert Banner */}
      <div className="border border-orange-500/30 bg-orange-500/10 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-3 items-center">
          <AlertTriangle className="text-orange-500 shrink-0" size={20} />
          <p className="text-xs text-slate-300">Your wallet is short for Pool A. Draw in 24 hours. Click to activate cushion.</p>
        </div>
        <button className="bg-orange-500 text-slate-950 text-xs font-mono font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">Micro-Credit</button>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet Overview */}
        <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-3xl flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1"><Wallet size={12}/> Net Asset capital</span>
            <h2 className="text-3xl font-black mt-2">{userMetrics?.totalContributed?.toLocaleString()} <span className="text-sm font-mono text-orange-500">ETB</span></h2>
          </div>
          <button 
            onClick={handleContribution}
            disabled={userMetrics?.isPaidRound || paymentLoading}
            className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${userMetrics?.isPaidRound ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500 text-slate-950 hover:bg-orange-600'}`}
          >
            {paymentLoading ? "Processing..." : userMetrics?.isPaidRound ? "✓ Contribution Secured" : "Deposit Contribution"}
          </button>
        </div>

        {/* Live Lottery Box */}
        <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-3xl flex flex-col justify-between min-h-[200px]">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1"><RefreshCw size={12}/> Lottery Module</span>
          <div className="bg-slate-950 border border-slate-900 h-16 rounded-xl flex items-center justify-center font-mono font-bold text-lg text-purple-400">
            {isSpinning ? `⚡ ${activeName}` : activeName || "Ready"}
          </div>
          <button 
            onClick={runLotteryAnimation} 
            disabled={isSpinning}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            {isSpinning ? "Consensus Customizing..." : "Trigger Round Draw"}
          </button>
        </div>

        {/* AI Health Matrix */}
        <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-3xl flex flex-col justify-center gap-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">AI Credit Matrix</span>
          <div className="text-3xl font-black text-purple-500 font-mono">{userMetrics?.trustScore || "780"} <span className="text-xs text-slate-400 font-normal">Score</span></div>
          <p className="text-[11px] text-slate-400">Low-collateral credit parameters successfully verified.</p>
        </div>
      </div>

      {/* Registry Table & Logs Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/20 border border-slate-900 rounded-3xl p-6">
          <h3 className="text-sm font-bold mb-4">Circular Pool Standings</h3>
          <div className="space-y-2">
            {participants?.map((p: any, i: number) => (
              <div key={i} className="flex justify-between items-center text-xs bg-slate-900/40 p-3 rounded-xl border border-slate-900/50">
                <span className="font-semibold text-slate-200">{p.name} {p.hasWonPrize && `(Won Rd ${p.wonRoundNum})`}</span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${p.isPaidRound ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {p.isPaidRound ? "CONTRIBUTED" : "UNPAID"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Ledger Audit Stream */}
        <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 space-y-3">
          <h3 className="text-sm font-bold">System Log</h3>
          <div className="space-y-2">
            {auditTrail?.slice(0, 3).map((log: string, i: number) => (
              <div key={i} className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-900 border-left-2 border-l-purple-500">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}