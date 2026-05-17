"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { 
  UserPlus, ArrowLeft, Sliders, ShieldAlert, Search, UserCheck, 
  Settings, Activity, Landmark, FileText, AlertCircle, Trash2
} from 'lucide-react';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export default function RealisticAdminPortal() {
  const { data, mutate } = useSWR('http://localhost:8080/api/member/profile', fetcher, {
    fallbackData: {
      participants: [
        { name: "Dawit (Node-01)", faydaId: "ET-8392-8821", isPaidRound: true, slotsAllocated: 1, limit: 10000 },
        { name: "Aster (Node-02)", faydaId: "ET-4491-0029", isPaidRound: true, slotsAllocated: 1, limit: 10000 },
        { name: "Kal (You)", faydaId: "ET-9102-3932", isPaidRound: false, slotsAllocated: 2, limit: 20000 },
        { name: "Hirut (Node-04)", faydaId: "ET-1102-7749", isPaidRound: false, slotsAllocated: 1, limit: 10000 },
        { name: "Yonas (Node-05)", faydaId: "ET-5529-1104", isPaidRound: false, slotsAllocated: 1, limit: 10000 }
      ],
      auditTrail: [
        "System configuration initial parameter vector calibrated successfully.",
        "FAYDA master state hook tracking initialized."
      ]
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newFayda, setNewFayda] = useState("");
  const [newSlots, setNewSlots] = useState("1");
  const [feedback, setFeedback] = useState("");

  const participants = data?.participants ?? [];
  const auditTrail = data?.auditTrail ?? [];

  const handleAdminOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newFayda) {
      setFeedback("Error: Core biometric data inputs omitted.");
      return;
    }
    const updated = [
      ...participants,
      { name: `${newName} (Node-0${participants.length + 1})`, faydaId: newFayda, isPaidRound: false, slotsAllocated: parseInt(newSlots), limit: 10000 }
    ];
    mutate({ ...data, participants: updated, auditTrail: [`Admin: Provisioned cluster access parameters for ${newName}.`, ...auditTrail] }, false);
    setNewName(""); setNewFayda("");
    setFeedback("Authentication parameters linked.");
    setTimeout(() => setFeedback(""), 3000);
  };

  const togglePaymentStatus = (targetIdx: number) => {
    const updated = participants.map((p: any, idx: number) => idx === targetIdx ? { ...p, isPaidRound: !p.isPaidRound } : p);
    mutate({ ...data, participants: updated, auditTrail: [`Admin: Modified clearance compliance manual tokens for ${participants[targetIdx].name}.`, ...auditTrail] }, false);
  };

  const dropParticipantNode = (targetIdx: number) => {
    const updated = participants.filter((_: any, idx: number) => idx !== targetIdx);
    mutate({ ...data, participants: updated, auditTrail: [`Admin: Disconnected cluster token maps for index row position ${targetIdx}.`, ...auditTrail] }, false);
  };

  const filteredNodes = participants.filter((p: any) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.faydaId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans flex flex-col relative overflow-hidden">
      
      {/* Top Professional Command Header Banner */}
      <header className="border-b border-slate-900 bg-[#070b14] px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <Link href="/dashboard" className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors mb-1">
            <ArrowLeft size={12} /> Exit to standard member dashboard
          </Link>
          <h1 className="text-lg font-black tracking-tight text-white uppercase flex items-center gap-2 font-mono">
            <Sliders size={16} className="text-purple-500" /> Admin Cluster Framework
          </h1>
        </div>
        
        {/* Dynamic Overview Metrics Block */}
        <div className="flex gap-6 text-xs font-mono text-slate-400">
          <div className="border-l border-slate-800 pl-3">
            <p className="text-[10px] text-slate-600 uppercase">System Nodes</p>
            <p className="text-slate-200 font-bold">{participants.length} Active</p>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <p className="text-[10px] text-slate-600 uppercase">Liquidity Deficit</p>
            <p className="text-rose-400 font-bold">
              {participants.filter((p: any) => !p.isPaidRound).length} Delinquent
            </p>
          </div>
        </div>
      </header>

      {/* Main Administrative Control Hub Panel Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* LEFT COLUMN PANEL: Forms & Onboarding Parameters */}
        <div className="space-y-10 lg:col-span-1">
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <UserPlus size={14} className="text-purple-400" /> Node Authorization
            </h2>
            <form onSubmit={handleAdminOnboard} className="space-y-4 border border-slate-900 bg-[#070b14]/50 p-6 rounded-2xl">
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Node Entity Name</label>
                <input 
                  type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Tariku Node-06"
                  className="w-full bg-transparent border-b border-slate-800 focus:border-purple-500 focus:outline-none py-1.5 text-xs text-slate-200 transition-colors"
                />
              </div>
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">FAYDA Cryptographic Hex</label>
                <input 
                  type="text" value={newFayda} onChange={(e) => setNewFayda(e.target.value)} placeholder="e.g. ET-8839-2910"
                  className="w-full bg-transparent border-b border-slate-800 focus:border-purple-500 focus:outline-none py-1.5 text-xs font-mono text-slate-200 transition-colors"
                />
              </div>
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase block">Capacity Allocation</label>
                <select 
                  value={newSlots} onChange={(e) => setNewSlots(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-800 focus:border-purple-500 focus:outline-none py-1.5 text-xs font-mono text-slate-400"
                >
                  <option value="1">1 Standard Capacity Slot</option>
                  <option value="2">2 Multi Capacity Slots</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all">
                Authorize Cluster Access
              </button>
              {feedback && <p className="text-[10px] font-mono text-emerald-400 text-center mt-2">{feedback}</p>}
            </form>
          </div>

          {/* Quick System Actions Configuration */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <Settings size={14} className="text-purple-400" /> Platform Multi-Sig Overrides
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <button className="w-full text-left p-3 border border-slate-900 hover:border-slate-800 rounded-xl flex items-center justify-between text-slate-400 hover:text-slate-200 transition-all">
                <span>Freeze Pool Cycles</span>
                <ShieldAlert size={14} className="text-rose-500" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN PANEL: Live Interactive Searchable Metrics Matrix Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/60 pb-4">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-widest">Active Pool Enforcement Database</h2>
              <p className="text-[11px] text-slate-600 font-medium">Perform manual state adjustments or node deletions.</p>
            </div>
            
            {/* Real-time Dynamic Filter Bar Input */}
            <div className="relative flex items-center text-slate-500 focus-within:text-purple-400 transition-colors">
              <Search size={13} className="absolute left-3 pointer-events-none" />
              <input 
                type="text" placeholder="Filter active system nodes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#070b14] border border-slate-900 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-purple-500 text-slate-200 font-mono transition-all w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 font-mono text-[9px] uppercase">
                  <th className="py-2 px-2">Identifier Vector</th>
                  <th className="py-2 px-2 text-center">Weight Metrics</th>
                  <th className="py-2 px-2">Compliance Action Switch</th>
                  <th className="py-2 px-2 text-right">Node Purge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/20">
                {filteredNodes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-600 font-mono text-xs">
                      No computational nodes discovered via filter constraints.
                    </td>
                  </tr>
                ) : (
                  filteredNodes.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-900/[0.05] transition-colors">
                      <td className="py-3 px-2">
                        <p className="font-bold text-slate-300">{p.name}</p>
                        <p className="font-mono text-[10px] text-slate-500">{p.faydaId}</p>
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-slate-400">{p.slotsAllocated} Sh.</td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => togglePaymentStatus(idx)}
                          className={`font-mono text-[9px] font-black uppercase tracking-widest ${
                            p.isPaidRound ? "text-emerald-400" : "text-rose-400 underline animate-pulse"
                          }`}
                        >
                          {p.isPaidRound ? "✓ CLEAR STATE" : "✕ SET DELINQUENT"}
                        </button>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button 
                          onClick={() => dropParticipantNode(idx)}
                          className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Audit Event Real-time Trace Log */}
          <div className="border-t border-slate-900/60 pt-6 space-y-2">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><FileText size={12}/> Live Admin Audit Trail</h4>
            <div className="bg-[#070b14]/40 border border-slate-950 rounded-xl p-4 space-y-1.5 max-h-32 overflow-y-auto scrollbar-none font-mono text-[10px] text-slate-400">
              {auditTrail.map((log: string, i: number) => (
                <p key={i} className="border-l border-purple-500/30 pl-2 text-slate-500"><span className="text-purple-400/60">»</span> {log}</p>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}