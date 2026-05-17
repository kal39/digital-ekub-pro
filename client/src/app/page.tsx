"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, BrainCircuit, Coins, ArrowRight, Activity, Users, ArrowUpRight } from "lucide-react";

export default function DigitalEkubLandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Structural Ambient Glow Lighting Matrix */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-[200px] pointer-events-none z-0" />

      {/* Navigation Layer */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20 border-b border-slate-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_12px_#8b5cf6]" />
          <span className="font-mono text-sm font-black tracking-widest uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            Digital Ekub <span className="text-orange-500">Pro</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/20 bg-purple-500/5 px-4 py-2 rounded-xl"
          >
            Console Workspace <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[11px] font-mono text-slate-400 mb-6 shadow-inner">
          <Activity size={12} className="text-orange-500 animate-pulse" />
          <span>Institutional Infrastructure for Community Capital Assets</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.15] bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          Modernizing Traditional Financial Circles with <span className="bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">Absolute Integrity</span>
        </h1>
        
        <p className="mt-6 text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transition your informal savings group to an audited, automated escrow pool. Integrated with national FAYDA ID matrixing, real-time liquidity fail-safes, and decentralized cycle-swapping.
        </p>

        {/* Global Live Statistics Blueprint Visualizer */}
        <div className="mt-12 max-w-lg mx-auto bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-xl shadow-2xl relative group">
          <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
          <div className="flex justify-between items-center">
            <div className="text-left">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Live Capital Locked Globally</span>
              <h3 className="text-2xl font-black font-mono text-slate-100 mt-1">12,450,200.00 <span className="text-xs text-orange-500 font-normal">ETB</span></h3>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Users size={10} /> Active Nodes
              </span>
              <span className="text-sm font-mono font-bold text-slate-300 mt-1">1,842 Pools</span>
            </div>
          </div>
        </div>

        {/* High-Conversion CTA Array */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/dashboard"
            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xl shadow-orange-500/10 flex items-center justify-center gap-2"
          >
            Launch Core Application <ArrowRight size={14} />
          </Link>
          <a 
            href="#features"
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center"
          >
            Explore Protocol Specifications
          </a>
        </div>
      </section>

      {/* Features Blueprint Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-900">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Architectural Security Features</h2>
          <p className="text-xs font-mono text-slate-500 mt-2">Zero Trust Validation // Automated Execution Nodes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: FAYDA Digital ID Integration */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl flex flex-col justify-between group hover:border-slate-800 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-200 tracking-tight">FAYDA Verified Guardrails</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Every member node undergoes strict cryptography matches back to the national digital identity registry. Eliminates default identity fragmentation risks completely.
              </p>
            </div>
          </div>

          {/* Card 2: AI Cycle Cushion Matchmaking */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl flex flex-col justify-between group hover:border-slate-800 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-200 tracking-tight">AI-Assisted Liquidity Cushion</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Machine learning score maps verify group trust indexes. If balance fallouts are predicted 24 hours prior, micro-credit streams bridge gaps instantly.
              </p>
            </div>
          </div>

          {/* Card 3: Zero-Fee Architecture */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-3xl flex flex-col justify-between group hover:border-slate-800 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
              <Coins size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-200 tracking-tight">Zero-Fee Micro-Ekubs</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Direct peer escrow distribution execution loops ensure zero operational platform margin deductions. 100% of grouped capital routes straight to the pool winner.
              </p>
            </div>
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-900 bg-transparent py-8 relative z-10 text-center font-mono text-[10px] text-slate-600">
        © 2026 Digital Ekub Pro Node Stack. Encrypted Peer Assets. All Rights Reserved.
      </footer>
    </div>
  );
}