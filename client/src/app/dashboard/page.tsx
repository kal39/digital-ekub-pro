"use client";

import React, { useState } from 'react';
import useSWR from 'swr';
import { 
  Wallet, AlertTriangle, RefreshCw, Activity, Layers, 
  LayoutDashboard, Coins, Landmark, BookOpen, Contact, 
  ClipboardList, Calendar, ShieldAlert, Sliders,
  Search, ShieldCheck, Clock, UserPlus, Phone, X, Shield,
  UserX, Check, Flame, Award, TrendingUp, Info, Dices, BrainCircuit,
  Lock, ArrowUpRight, Scale, Gavel, CheckCircle2, AlertCircle, Timer, Sparkles
} from 'lucide-react';

// --- TYPE INTERFACES ---
interface Participant {
  name: string;
  faydaId: string;
  isPaidRound: boolean;
  hasWonPrize: boolean;
  wonRoundNum: number;
  slotsAllocated: number;
  baseAmount: number;
  phone: string;
  aquamScore: number;
}

interface UserMetrics {
  totalContributed: number;
  isPaidRound: boolean;
  trustScore: number;
}

interface DashboardData {
  userMetrics: UserMetrics;
  participants: Participant[];
  auditTrail: string[];
}

interface ChuraOffer {
  id: string;
  nodeName: string;
  faydaId: string;
  description: string;
  discountPremium: number;
  status: 'OPEN' | 'ACCEPTED' | 'EVALUATING';
}

interface AdminMultiSigTask {
  id: string;
  actionType: 'FORCE_DRAWDOWM' | 'SUSPEND_NODE' | 'LIQUIDATE_RESERVES';
  target: string;
  requestedBy: string;
  signaturesReceived: number;
  signaturesRequired: number;
  status: 'PENDING' | 'EXECUTED';
}

const fetcher = async (url: string): Promise<DashboardData> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API infrastructure streaming latency.");
  return res.json();
};

export default function DigitalEkubProConsole() {
  const { data, error, mutate } = useSWR<DashboardData>('http://localhost:8080/api/member/profile', fetcher, {
    fallbackData: {
      userMetrics: { totalContributed: 45200, isPaidRound: false, trustScore: 780 },
      participants: [
        { name: "Dawit (Node-01)", faydaId: "ET-8392-8821", isPaidRound: true, hasWonPrize: true, wonRoundNum: 1, slotsAllocated: 1, baseAmount: 10000, phone: "+251-91-123-4567", aquamScore: 810 },
        { name: "Aster (Node-02)", faydaId: "ET-4491-0029", isPaidRound: true, hasWonPrize: true, wonRoundNum: 2, slotsAllocated: 1, baseAmount: 10000, phone: "+251-92-345-6789", aquamScore: 790 },
        { name: "Kal (You)", faydaId: "ET-9102-3932", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 2, baseAmount: 20000, phone: "+251-90-987-6543", aquamScore: 780 },
        { name: "Hirut (Node-04)", faydaId: "ET-1102-7749", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 1, baseAmount: 10000, phone: "+251-91-555-0199", aquamScore: 740 },
        { name: "Yonas (Node-05)", faydaId: "ET-5529-1104", isPaidRound: false, hasWonPrize: false, wonRoundNum: 0, slotsAllocated: 1, baseAmount: 10000, phone: "+251-94-444-1102", aquamScore: 650 }
      ],
      auditTrail: [
        "Escrow protocol configuration state validated successfully via client node.",
        "FAYDA Registry authenticated cryptographic verification link for member kal39.",
        "Consensus core ledger monitoring pipeline streaming on stand-by."
      ]
    },
    refreshInterval: 30000 
  });

  // Navigation & Form States
  const [activeTab, setActiveTab] = useState<string>("console");
  const [contactSearch, setContactSearch] = useState<string>("");
  const [swapOfferAmount, setSwapOfferAmount] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Administrative Control Form States
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberFayda, setNewMemberFayda] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [allocatedSlots, setAllocatedSlots] = useState<number>(1);
  const [currentPoolRound, setCurrentPoolRound] = useState<number>(3);
  
  // Interactive Selector Engine Simulation States
  const [simulatedWinner, setSimulatedWinner] = useState<string | null>(null);
  const [isSimulatingDraw, setIsSimulatingDraw] = useState<boolean>(false);

  // Requirements Interactive Simulation States
  const [simulatedCollateralNode, setSimulatedCollateralNode] = useState<string>("Kal (You)");
  const [simulatedCollateralAmount, setSimulatedCollateralAmount] = useState<string>("5000");
  const [isCushionLocking, setIsCushionLocking] = useState<boolean>(false);
  const [selectedRiskTier, setSelectedRiskTier] = useState<string>("standard");
  const [lockedCushionLogs, setLockedCushionLogs] = useState<string[]>([
    "Node-01 verified automated clearing contract deposit: 5,000 ETB Locked.",
    "Node-02 verified automated clearing contract deposit: 5,000 ETB Locked."
  ]);

  // AI Prompt Workspace State
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  // Governance System State Queues
  const [multiSigTasks, setMultiSigTasks] = useState<AdminMultiSigTask[]>([
    { id: "tx-101", actionType: 'SUSPEND_NODE', target: "Yonas (Node-05)", requestedBy: "Compliance_Sec_01", signaturesReceived: 1, signaturesRequired: 2, status: 'PENDING' },
    { id: "tx-102", actionType: 'FORCE_DRAWDOWM', target: "Round 03 Clearing Cycle", requestedBy: "System_Cron_Trigger", signaturesReceived: 0, signaturesRequired: 2, status: 'PENDING' }
  ]);

  const [churaOffers, setChuraOffers] = useState<ChuraOffer[]>([
    { id: "chura-1", nodeName: "Hirut (Node-04)", faydaId: "ET-1102-7749", description: "Wants to trade priority queue for round 3 selector access.", discountPremium: 7.0, status: 'OPEN' },
    { id: "chura-2", nodeName: "Yonas (Node-05)", faydaId: "ET-5529-1104", description: "Wants to acquire early capital matching.", discountPremium: 4.5, status: 'EVALUATING' }
  ]);

  const participants = data?.participants ?? [];
  const auditTrail = data?.auditTrail ?? [];

  // Derived Financial Engineering Core Formula Matrices
  const baseSlotCost = 10000;
  const totalSlots = participants.reduce((acc, p) => acc + p.slotsAllocated, 0);
  const totalPoolCapital = totalSlots * baseSlotCost;
  const totalDisbursed = participants.reduce((acc, p) => acc + (p.hasWonPrize ? p.baseAmount : 0), 0);
  const baseLiveVaultBalance = totalPoolCapital - totalDisbursed;
  
  const simulatedCushionAdditions = lockedCushionLogs.length * 5000;
  const computedVaultReserves = baseLiveVaultBalance + simulatedCushionAdditions;

  const eligibleNodes = participants.filter(p => !p.hasWonPrize);

  const runMockSelectionDraw = () => {
    if (eligibleNodes.length === 0) return;
    setIsSimulatingDraw(true);
    setSimulatedWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomNode = eligibleNodes[Math.floor(Math.random() * eligibleNodes.length)];
      setSimulatedWinner(randomNode.name);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSimulatingDraw(false);
      }
    }, 150);
  };

  const handleCushionFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmt = parseFloat(simulatedCollateralAmount);
    if (isNaN(parsedAmt) || parsedAmt <= 0) {
      setFormError("Collateral lock configurations require explicit positive numerical value entries.");
      return;
    }
    setFormError(null);
    setIsCushionLocking(true);

    setTimeout(() => {
      setLockedCushionLogs([
        `Node entry [${simulatedCollateralNode}] committed structural ${parsedAmt.toLocaleString()} ETB escrow deposit under tier [${selectedRiskTier.toUpperCase()}].`,
        ...lockedCushionLogs
      ]);
      setIsCushionLocking(false);
      setSimulatedCollateralAmount("");
    }, 800);
  };

  // Autonomous Interventions Co-Pilot Sequence Loop
  const handleAiCoPilotCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiThinking(true);

    setTimeout(() => {
      const command = aiPrompt.toLowerCase();
      let feedbackMsg = "AI Engine was unable to construct a distinct ledger execution vector from this natural language query string.";

      if (command.includes("optimize") || command.includes("slash")) {
        feedbackMsg = "AI Analysis Output: High-risk indicators located for Yonas (Node-05). Initiated structural 50-point credit reduction sequence and mapped 5,000 ETB from reserves into isolation locks.";
        setLockedCushionLogs([
          "AI Co-Pilot Automated Trigger: Yonas (Node-05) subject to 5,000 ETB systemic liquidation hold.",
          ...lockedCushionLogs
        ]);
      } else if (command.includes("cushion") || command.includes("lock")) {
        feedbackMsg = "AI Analysis Output: Automated system sweep complete. Structured balance adjustments assigned an immediate safety block hold across all non-disbursed vectors.";
        setLockedCushionLogs([
          "AI Co-Pilot Automated Sweep: Fast-tracked security safety hold across all valid nodes.",
          ...lockedCushionLogs
        ]);
      }

      setLockedCushionLogs(prev => [
        `System Security Handshake Event Log: Natural input string matched. Executing: "${aiPrompt}"`,
        ...prev
      ]);

      setAiPrompt("");
      setAiThinking(false);
      alert(feedbackMsg);
    }, 1200);
  };

  const calculatePreviewScore = () => {
    if (!newMemberName || !newMemberFayda) return { score: 0, tier: "Awaiting Input", color: "text-slate-500" };
    let score = 700; 
    if (newMemberPhone.startsWith("+251-91") || newMemberPhone.startsWith("+251-92")) score += 60;
    if (newMemberFayda.toUpperCase().startsWith("ET-")) score += 40;
    if (allocatedSlots > 1) score -= 30;
    
    if (score >= 780) return { score, tier: "Premium Tier AAA", color: "text-emerald-400 border-emerald-900/40 bg-emerald-950/10" };
    return { score, tier: "Standard Growth Tier", color: "text-purple-400 border-purple-900/40 bg-purple-950/10" };
  };
  const previewRisk = calculatePreviewScore();

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberFayda || !newMemberPhone) {
      setFormError("All identity network parameters are required.");
      return;
    }
    setFormError(null);
    setActionLoading(true);

    try {
      const mockNewNode: Participant = {
        name: `${newMemberName} (Node-0${participants.length + 1})`,
        faydaId: newMemberFayda,
        isPaidRound: false,
        hasWonPrize: false,
        wonRoundNum: 0,
        slotsAllocated: Number(allocatedSlots),
        baseAmount: Number(allocatedSlots) * baseSlotCost,
        phone: newMemberPhone,
        aquamScore: previewRisk.score || 720 
      };

      await mutate({
        ...data!,
        participants: [...participants, mockNewNode],
        auditTrail: [`Node entry configuration broadcasted: ${newMemberFayda} assigned Aquam ${previewRisk.score}.`, ...auditTrail]
      }, false);

      setNewMemberName("");
      setNewMemberFayda("");
      setNewMemberPhone("");
      setAllocatedSlots(1);
      setActiveTab("console"); 
    } catch (err) {
      setFormError("System handshake termination error.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleChuraSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const premiumValue = parseFloat(swapOfferAmount);
    if (isNaN(premiumValue) || premiumValue <= 0 || premiumValue > 30) {
      setFormError("Premium discount parameters must sit securely between 0.1% and 30%.");
      return;
    }
    setFormError(null);

    setChuraOffers([{
      id: `chura-${Date.now()}`,
      nodeName: "Kal (You)",
      faydaId: "ET-9102-3932",
      description: "Immediate emergency turn liquidity swap configuration assignment.",
      discountPremium: premiumValue,
      status: 'OPEN'
    }, ...churaOffers]);
    setSwapOfferAmount("");
  };

  const executeSwapTransaction = (id: string) => {
    setChuraOffers(prev => prev.map(offer => offer.id === id ? { ...offer, status: 'ACCEPTED' as const } : offer));
  };

  const signMultiSigTransaction = (id: string) => {
    setMultiSigTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextSigs = task.signaturesReceived + 1;
        return {
          ...task,
          signaturesReceived: nextSigs,
          status: nextSigs >= task.signaturesRequired ? 'EXECUTED' as const : 'PENDING' as const
        };
      }
      return task;
    }));
  };

  const smartGovernanceRules = [
    { id: "01", title: "Role of the Sebasbi", desc: "The platform acting as Sebasbi manages collection routes, executes system interventions, and overrides compromised accounts through multi-sig parameters." },
    { id: "02", title: "Global Draw Horizon Timing", desc: "Random selection sequences execute autonomously precisely at the block lifecycle milestone expiration timestamp without allowance for latency delays." },
    { id: "03", title: "Wasa Identity Co-Signing", desc: "Beneficiary selection outputs remain completely locked until designated high-scoring peer nodes execute a cryptographic Wasa identity guarantee lock." },
    { id: "04", title: "Chura Bidding Thresholds", desc: "Members looking to accelerate priority positioning can enter standard premium auction vectors, capped strictly between 0.1% and 30.0% parameters." },
    { id: "05", title: "Biometric FAYDA Hard-Linking", desc: "No node can participate, contribute capital, or register stakes without completing an authorized handshake validation against the national FAYDA identity server." },
    { id: "06", title: "Aquam Credit Score Degradation", desc: "Failing to clear slot payment demands within 2 hours of a block milestone automatically initiates an immediate drop of 50 points on the node's Aquam profile." },
    { id: "07", title: "Escrow Capital Cushion Holds", desc: "Every active, non-disbursed slot asset state must hold a 5,000 ETB safety margin buffer in the isolation vault to prevent operational pool shortfalls." },
    { id: "08", title: "Multi-Staking Concentration Limits", desc: "To minimize group default vulnerability indices, no single identity entity may capture or control more than 3 active participant risk slots inside a single group." },
    { id: "09", title: "Dual-Control Intervention Gates", desc: "Critical actions like manual node suspensions or forced capital drawdowns require a minimum of two system consensus keys before ledger execution." },
    { id: "10", title: "Dynamic Yield Deficit Slashing", desc: "Delinquent nodes matching critical threat levels are systematically subject to partial asset liquidation, pulling funds directly from their locked escrow reserves." },
    { id: "11", title: "Priority Swap Handshake Rules", desc: "When a Chura P2P marketplace auction proposal is claimed, priority positions switch on the block ledger instantly via an automated state swap code." },
    { id: "12", title: "Automated Clearing Settlement", desc: "Disbursal windfalls clear automatically into verified telecom routing avenues as soon as target escrow consensus conditions are fully satisfied." },
    { id: "13", title: "Ledger Audit Event Inmutability", desc: "All core configuration updates, onboarding actions, and countersign events append directly to an immutable log stream displayed transparently on console portals." },
    { id: "14", title: "Grace Window Expirations", desc: "A mandatory 24-hour compliance grace period is established at the dawn of every global cycle block before penalty mechanics switch to live statuses." },
    { id: "15", title: "Dissolution Liquidation Thresholds", desc: "If more than 40% of the aggregate pool node count registers a critical default breach state, the entire capital cluster triggers automated emergency freeze rules." }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans flex relative overflow-hidden">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-68 border-r border-slate-900 bg-[#030712] p-8 hidden lg:flex flex-col justify-between relative z-10 shrink-0 select-none">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />
            <span className="font-mono text-xs font-black tracking-widest text-slate-100 uppercase">
              EKUB <span className="text-orange-500">PRO</span>
            </span>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[80vh] pr-2 scrollbar-none">
            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-600 tracking-widest block px-2 mb-2">Workspace Dashboard</span>
              <div className="space-y-0.5">
                <button 
                  onClick={() => { setActiveTab("console"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "console" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <LayoutDashboard size={13} /> Console Hub
                </button>
                <button 
                  onClick={() => { setActiveTab("admin"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "admin" ? "bg-[#111827]/40 border border-slate-800/60 text-purple-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Sliders size={13} /> Admin Panel Control
                </button>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-600 tracking-widest block px-2 mb-2">Platform Directories</span>
              <div className="space-y-0.5">
                <button 
                  onClick={() => { setActiveTab("rules"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "rules" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <BookOpen size={13} /> Platform Rules <span className="text-[9px] px-1.5 py-0.2 bg-slate-900 border border-slate-800 text-slate-500 rounded font-mono ml-auto">15</span>
                </button>
                <button 
                  onClick={() => { setActiveTab("contacts"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "contacts" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Contact size={13} /> Member Contacts
                </button>
                <button 
                  onClick={() => { setActiveTab("requirements"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "requirements" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <ClipboardList size={13} /> Requirements
                </button>
                <button 
                  onClick={() => { setActiveTab("schedule"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "schedule" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Calendar size={13} /> Payment Schedule
                </button>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono font-bold uppercase text-slate-600 tracking-widest block px-2 mb-2">Core Modules</span>
              <div className="space-y-0.5">
                <button 
                  onClick={() => { setActiveTab("marketplace"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "marketplace" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Coins size={13} /> P2P Swap Market
                </button>
                <button 
                  onClick={() => { setActiveTab("vault"); setFormError(null); }}
                  className={`w-full flex items-center gap-3 text-xs font-medium px-3 py-2.5 rounded-xl transition-all ${
                    activeTab === "vault" ? "bg-[#111827]/40 border border-slate-800/60 text-orange-400 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <Landmark size={13} /> Collateral Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* CORE DISPLAY WINDOW */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 w-full max-w-6xl mx-auto z-10">
        
        {formError && (
          <div className="p-4 bg-rose-950/20 border border-rose-900 rounded-xl flex items-center justify-between text-xs text-rose-400 font-mono">
            <span className="flex items-center gap-2"><AlertTriangle size={14}/> {formError}</span>
            <button onClick={() => setFormError(null)} className="text-rose-600 hover:text-rose-400"><X size={14}/></button>
          </div>
        )}

        {/* VIEW 1: CONSOLE HUB */}
        {activeTab === "console" && (
          <div className="space-y-12 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/40 pb-6">
              <div>
                <h1 className="text-xl font-black tracking-tight uppercase text-white">Console Dashboard</h1>
                <p className="text-xs text-slate-500 mt-1 font-medium">Algorithmic Disbursal Optimization & Predictive Risk Underwriting Core</p>
              </div>
              <div className="text-xs font-mono px-3 py-1 bg-purple-950/20 border border-purple-900/50 rounded-xl text-purple-400 flex items-center gap-2">
                <Clock size={12}/> Global Round: <span className="text-white font-black">0{currentPoolRound}</span>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-slate-900/30 pb-10">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Wallet size={12}/> Gross Pool Volume</span>
                <h2 className="text-3xl font-black font-mono tracking-tighter text-white">
                  {totalPoolCapital.toLocaleString()} <span className="text-sm font-normal text-orange-500">ETB</span>
                </h2>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><RefreshCw size={12}/> Core Engine Status</span>
                <div className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/10 border border-emerald-900/30 px-3 py-1 rounded-xl inline-block">
                  Consensus Balanced
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Activity size={12}/> Active Capital Nodes</span>
                <div className="text-3xl font-black text-purple-500 font-mono tracking-tighter">
                  {participants.filter(p => p.isPaidRound).length}
                  <span className="text-sm font-normal text-slate-600"> / {participants.length} Active Nodes</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Dynamic Selector Display */}
              <div className="bg-[#060a12]/50 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                      <Dices size={14} className="text-orange-400" /> Disbursal Matrix Selector
                    </h3>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Pseudorandom Queue</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Nodes below maintain active entry eligibility vectors for the current settlement circle. Probability weight calculations scale linearly based on relative slot stakes.
                  </p>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {eligibleNodes.map((node, i) => {
                      const percentage = Math.round((node.slotsAllocated / eligibleNodes.reduce((acc, n) => acc + n.slotsAllocated, 0)) * 100);
                      return (
                        <div key={i} className="flex justify-between items-center bg-[#030712] border border-slate-900 rounded-xl px-3 py-2 text-xs font-mono">
                          <span className="text-slate-300">{node.name}</span>
                          <span className="text-orange-400 font-bold">{percentage}% Draw Weight</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900/60 space-y-3">
                  <button 
                    onClick={runMockSelectionDraw}
                    disabled={isSimulatingDraw || eligibleNodes.length === 0}
                    className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(234,88,12,0.1)]"
                  >
                    {isSimulatingDraw ? "Cycling Random Block Vectors..." : "Execute Mock Selection Draw"}
                  </button>
                  {simulatedWinner && (
                    <div className="p-3 bg-orange-950/10 border border-orange-900/40 rounded-xl text-center font-mono text-xs text-orange-400">
                      🎯 Selection Output Vector: <span className="text-white font-bold">{simulatedWinner}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Predictive Risk Engine Card */}
              <div className="bg-[#060a12]/50 border border-slate-900 p-6 rounded-2xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                      <BrainCircuit size={14} className="text-purple-400" /> Risk Deficit Radar
                    </h3>
                    <span className="text-[9px] font-mono text-rose-500 font-black tracking-wider uppercase">AI Underwriting</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Heuristic calculations continuously track performance. Nodes showing a low Aquam matrix or pending payment status across global blocks require clearing verification.
                  </p>

                  <div className="space-y-2">
                    {participants.map((node, i) => {
                      let hazardText = "Operational Safe";
                      let hazardStyle = "text-emerald-400 bg-emerald-950/10 border-emerald-900/30";
                      
                      if (!node.isPaidRound && node.aquamScore < 700) {
                        hazardText = "CRITICAL LIMIT BREACH";
                        hazardStyle = "text-rose-400 bg-rose-950/20 border-rose-900/40 font-bold";
                      } else if (!node.isPaidRound) {
                        hazardText = "Awaiting Capital Clearing";
                        hazardStyle = "text-purple-400 bg-purple-950/10 border-purple-900/30";
                      }

                      return (
                        <div key={i} className="flex justify-between items-center border border-slate-900 bg-[#030712] rounded-xl p-2 text-xs font-mono">
                          <span className="text-slate-400">{node.name.split(" ")[0]}</span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-lg border ${hazardStyle}`}>
                            {hazardText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-[#030712] border border-slate-900 rounded-xl flex items-center gap-3 text-xs font-mono text-slate-500">
                  <Info size={14} className="text-purple-500 shrink-0" />
                  <span>Pool stability factor is optimized. No capital freeze mandates are currently requested.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ADMIN PANEL SYSTEMS CONTROL */}
        {activeTab === "admin" && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
                <Sliders size={20} className="text-purple-400" /> Platform Security & Admin Console
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-1">Multi-Signature Oversight, Direct Core Lifecycle Interventions & Liquidity Verification</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 bg-[#060a12]/70 border border-slate-900 p-6 rounded-2xl space-y-6">
                <div className="border-b border-slate-900/60 pb-3 flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <UserPlus size={14} className="text-purple-400"/> Onboard Identity Node
                  </h3>
                  <span className="text-[9px] font-mono font-black text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30 uppercase">FAYDA Linked</span>
                </div>

                <form onSubmit={handleOnboardSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Participant Entity Name</label>
                    <input 
                      type="text" 
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="e.g. Martha Tesfaye" 
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Biometric FAYDA Reference Key</label>
                    <input 
                      type="text" 
                      value={newMemberFayda}
                      onChange={(e) => setNewMemberFayda(e.target.value)}
                      placeholder="e.g. ET-2931-8849" 
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Telecom Routing Target (Phone)</label>
                    <input 
                      type="text" 
                      value={newMemberPhone}
                      onChange={(e) => setNewMemberPhone(e.target.value)}
                      placeholder="e.g. +251-91-112-3344" 
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Risk Share Allocation (Slots)</label>
                    <select 
                      value={allocatedSlots}
                      onChange={(e) => setAllocatedSlots(Number(e.target.value))}
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-400"
                    >
                      <option value={1}>1 Slot - 10,000 ETB</option>
                      <option value={2}>2 Slots - 20,000 ETB</option>
                      <option value={3}>3 Slots - 30,000 ETB</option>
                    </select>
                  </div>

                  {newMemberName && (
                    <div className={`col-span-1 md:col-span-2 p-4 border rounded-xl flex items-center justify-between text-xs font-mono ${previewRisk.color}`}>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase">Predictive Underwriting Assessment</span>
                        <span className="font-bold">{previewRisk.tier}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-500 block uppercase">Computed Score</span>
                        <span className="text-sm font-black tracking-tight">{previewRisk.score} / 900</span>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={actionLoading}
                    className="col-span-1 md:col-span-2 mt-2 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono text-xs font-bold uppercase rounded-xl transition-all"
                  >
                    {actionLoading ? "Authorizing Security Keys..." : "Commit Node Entry To Pool"}
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="bg-[#090d16] border border-slate-900 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5"><Flame size={13}/> Core Lifecycle Clock</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Advance the entire pool's operational milestone manually for mock demonstration purposes.</p>
                  
                  <div className="flex items-center justify-between bg-[#030712] border border-slate-800 rounded-xl p-3">
                    <span className="text-xs text-slate-400 font-mono">Current Round State</span>
                    <span className="text-sm font-mono font-black text-white">0{currentPoolRound}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setCurrentPoolRound(prev => prev + 1);
                      setSimulatedWinner(null);
                    }}
                    className="w-full py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase rounded-xl transition-all"
                  >
                    Dispatch Next Round Block
                  </button>
                </div>
              </div>
            </div>

            {/* Multi-Sig Governance Tasks */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-purple-400"/>
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Dual-Control Gate Queue (Multi-Sig Requirements)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {multiSigTasks.map((task) => (
                  <div key={task.id} className="border border-slate-900 bg-[#070b14]/50 p-4 rounded-xl flex flex-col justify-between gap-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase">Transaction ID: {task.id}</span>
                        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          {task.actionType === 'SUSPEND_NODE' ? <UserX size={13} className="text-rose-400"/> : <ShieldAlert size={13} className="text-orange-400"/>}
                          {task.actionType.replace('_', ' ')}: <span className="text-purple-400">{task.target}</span>
                        </h4>
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${task.status === 'EXECUTED' ? 'bg-emerald-950/20 text-emerald-400' : 'bg-orange-950/20 text-orange-400'}`}>
                        {task.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-900/60 pt-3">
                      <span className="text-xs font-mono text-slate-300 font-bold">{task.signaturesReceived} / {task.signaturesRequired} Signatures</span>
                      {task.status === 'PENDING' ? (
                        <button 
                          onClick={() => signMultiSigTransaction(task.id)}
                          className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 text-purple-300 text-[10px] font-bold rounded-lg transition-all"
                        >
                          Countersign
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold"><Award size={12}/> Complete</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: PLATFORM RULES */}
        {activeTab === "rules" && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="border-b border-slate-900/60 pb-5">
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Scale size={18} className="text-orange-500" /> Decentralized Smart Governance Protocol
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">Definitive 15-Rule Core Framework Encoded into Core Execution Engines</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {smartGovernanceRules.map((rule) => (
                <div key={rule.id} className="p-5 bg-[#060a12]/70 border border-slate-900 rounded-2xl space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-orange-500 font-bold tracking-widest uppercase">Rule Axis {rule.id}</span>
                      <Gavel size={11} className="text-slate-700" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-200 font-mono tracking-tight">{rule.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: MEMBER DIRECTORY */}
        {activeTab === "contacts" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Contact size={16} className="text-purple-500" /> Active Registry Matrix
                </h2>
                <p className="text-xs text-slate-500 font-mono">Definitive Communication & Biometric Reference Nodes</p>
              </div>
              <div className="relative flex items-center text-slate-500">
                <Search size={13} className="absolute left-3" />
                <input 
                  type="text" 
                  placeholder="Search name or FAYDA..." 
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="bg-[#090d16] border border-slate-900 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 font-mono w-full sm:w-56"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participants
                .filter(p => p.name.toLowerCase().includes(contactSearch.toLowerCase()) || p.faydaId.toLowerCase().includes(contactSearch.toLowerCase()))
                .map((p, idx) => (
                  <div key={idx} className="border border-slate-900 bg-[#070b14]/40 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-200">{p.name}</h4>
                      <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1"><Phone size={10}/> {p.phone}</p>
                      <p className="text-[9px] font-mono text-purple-400 bg-purple-950/20 px-2 py-0.5 rounded inline-block">{p.faydaId}</p>
                    </div>
                    <div className="text-right font-mono space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold block ${p.aquamScore >= 750 ? "text-emerald-400 bg-emerald-950/10" : "text-orange-400 bg-orange-950/10"}`}>
                        Aquam {p.aquamScore}
                      </span>
                      <span className="text-[10px] font-bold block text-slate-500">{p.isPaidRound ? "✓ CLEARED" : "✕ PENDING"}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* VIEW 5: REQUIREMENTS (CREATIVE UPGRADE: INTEGRATED CO-PILOT AGENT) */}
        {activeTab === "requirements" && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="border-b border-slate-900 pb-5">
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <ClipboardList size={20} className="text-orange-500" /> Dynamic Escrow Governance & Underwriting Hub
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Automated enforcement matrix balancing mandatory pre-draw collateral layers and real-time capital solvency requirements.
              </p>
            </div>

            {/* Core Architectural Rules Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#060a12]/60 border border-slate-900/80 space-y-3">
                <div className="w-7 h-7 rounded-lg bg-orange-950/30 border border-orange-900/50 flex items-center justify-center text-orange-400">
                  <Lock size={14} />
                </div>
                <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">1. Core Cushion Escrow</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Every active, non-disbursed node entry must hold an isolated balance margin of exactly <span className="text-white font-mono font-semibold">5,000 ETB</span> inside the safety vault. This provides a buffer against collection loop shortfalls.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060a12]/60 border border-slate-900/80 space-y-3">
                <div className="w-7 h-7 rounded-lg bg-purple-950/30 border border-purple-900/50 flex items-center justify-center text-purple-400">
                  <Shield size={14} />
                </div>
                <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">2. FAYDA Hard-Link</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  No capital deployment or drawing queue access is permitted without zero-knowledge verification against the national biometric server registry. Unlinked vectors trigger immediate multi-sig freezes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#060a12]/60 border border-slate-900/80 space-y-3">
                <div className="w-7 h-7 rounded-lg bg-rose-950/30 border border-rose-900/50 flex items-center justify-center text-rose-400">
                  <Flame size={14} />
                </div>
                <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">3. Aquam Penalty Slashing</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Milestone contribution delays over <span className="text-white font-mono font-semibold">2 hours</span> trigger an automated credit degradation sequence, slashing 50 points from the node profile and initiating partial reserve liquidation.
                </p>
              </div>
            </div>

            {/* CREATIVE COMPONENT: CO-PILOT INTERACTION RADAR */}
            <div className="p-6 bg-gradient-to-br from-[#0c0f1d] via-[#070a14] to-[#04060d] border border-purple-900/30 rounded-2xl space-y-4 shadow-[0_0_25px_rgba(139,92,246,0.05)]">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-purple-400 animate-pulse" />
                  <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">
                    Underwriting Co-Pilot Interface <span className="text-[10px] text-slate-600 font-normal lowercase">(experimental NLP module)</span>
                  </h3>
                </div>
                <span className="text-[8px] font-mono px-2 py-0.5 bg-purple-950 text-purple-400 rounded-md font-bold tracking-wider uppercase border border-purple-900/40">Autonomous Pipeline</span>
              </div>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                Issue manual overrides to risk models or invoke automatic parameters using natural code syntax directly.
              </p>

              <form onSubmit={handleAiCoPilotCommand} className="flex gap-3">
                <input 
                  type="text" 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., 'optimize risk logs and slash high hazard node indices' or 'sweep cushion variables'..." 
                  className="flex-1 bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 font-mono focus:border-purple-500/50 outline-none"
                />
                <button 
                  type="submit"
                  disabled={aiThinking}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] shrink-0"
                >
                  {aiThinking ? "Evaluating Layer State..." : "Execute Intent"}
                </button>
              </form>
            </div>

            {/* Interactive Control Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-2">
              {/* Dynamic Cushion Injector */}
              <form onSubmit={handleCushionFormSubmit} className="lg:col-span-2 bg-[#060a12]/90 border border-slate-900 p-6 rounded-2xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-slate-900/60 pb-2">
                    <span className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-wider block">Interactive Cushion Simulator</span>
                    <span className="text-[11px] text-slate-500">Test live network state changes by locking dynamic node assets.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase">Target Node Entity</label>
                    <select 
                      value={simulatedCollateralNode} 
                      onChange={(e) => setSimulatedCollateralNode(e.target.value)}
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:border-orange-500/50 outline-none"
                    >
                      {participants.map((p, i) => <option key={i} value={p.name}>{p.name.split(" ")[0]}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase">Risk Evaluation Tier Strategy</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        type="button" 
                        onClick={() => setSelectedRiskTier("standard")}
                        className={`py-1.5 rounded-lg text-[10px] font-mono uppercase border transition-all ${selectedRiskTier === "standard" ? "bg-orange-500/10 text-orange-400 border-orange-500/30 font-bold" : "bg-[#030712] text-slate-500 border-slate-900"}`}
                      >
                        Standard Hold
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setSelectedRiskTier("leverage")}
                        className={`py-1.5 rounded-lg text-[10px] font-mono uppercase border transition-all ${selectedRiskTier === "leverage" ? "bg-purple-500/10 text-purple-400 border-purple-500/30 font-bold" : "bg-[#030712] text-slate-500 border-slate-900"}`}
                      >
                        High Default Guard
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-slate-500 uppercase">Collateral Capital Target (ETB)</label>
                    <input 
                      type="number"
                      value={simulatedCollateralAmount}
                      onChange={(e) => setSimulatedCollateralAmount(e.target.value)}
                      placeholder="5000"
                      className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:border-orange-500/50 outline-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isCushionLocking}
                  className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-[0_0_12px_rgba(234,88,12,0.15)] mt-4"
                >
                  {isCushionLocking ? "Streaming Contract Locks..." : "Commit Cushion Block Hold"}
                </button>
              </form>

              {/* Dynamic Ledger Output Streams */}
              <div className="lg:col-span-3 bg-[#060a12]/40 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Active Reserve Ledger Injections</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 uppercase font-mono font-bold">Solvent Stream</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-none">
                    {lockedCushionLogs.map((log, index) => (
                      <div key={index} className="p-3 bg-[#030712]/80 border border-slate-900 rounded-xl flex items-start gap-3 text-xs font-mono text-slate-300 transition-all hover:border-slate-800">
                        <ShieldCheck size={14} className="text-emerald-400 mt-0.5 shrink-0"/>
                        <span className="leading-relaxed">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-[#030712] border border-slate-900 rounded-xl flex items-center gap-3 text-[11px] font-mono text-slate-500 leading-relaxed">
                  <Info size={16} className="text-purple-500 shrink-0" />
                  <span>
                    Any updates to the escrow logs here will modify the total balances calculated in the <span className="text-purple-400 hover:underline cursor-pointer" onClick={() => setActiveTab("vault")}>Isolation Vault Portal</span> instantly.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: PAYMENT SCHEDULE (UPGRADED CRYPTOGRAPHIC LEDGER) */}
        {activeTab === "schedule" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Calendar size={20} className="text-purple-500" /> Milestone Execution Lifecycle Matrix
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Cryptographic transaction monitoring pipeline detailing archived rounds, active pools, and locked future stages.
                </p>
              </div>
              <div className="text-xs font-mono px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 flex items-center gap-2 select-none">
                <Timer size={12} className="text-orange-400" /> Cycle Horizon: <span className="text-white font-bold">7 Days / Block</span>
              </div>
            </div>

            {/* High Level Process Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#060a12]/60 border border-slate-900 font-mono space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Settled Rounds</span>
                <span className="text-lg font-black text-white">02 <span className="text-xs font-normal text-slate-500">Blocks</span></span>
              </div>
              <div className="p-4 rounded-xl bg-[#060a12]/60 border border-slate-900 font-mono space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Active Draw Space</span>
                <span className="text-lg font-black text-orange-400">Round 03</span>
              </div>
              <div className="p-4 rounded-xl bg-[#060a12]/60 border border-slate-900 font-mono space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Total Disbursed Volume</span>
                <span className="text-lg font-black text-white">{totalDisbursed.toLocaleString()} <span className="text-xs font-normal text-slate-500">ETB</span></span>
              </div>
              <div className="p-4 rounded-xl bg-[#060a12]/60 border border-slate-900 font-mono space-y-1">
                <span className="text-[9px] text-slate-500 uppercase block">Pending Collections</span>
                <span className="text-lg font-black text-purple-400">{(totalPoolCapital - totalDisbursed).toLocaleString()} <span className="text-xs font-normal text-slate-500">ETB</span></span>
              </div>
            </div>

            {/* High-Fidelity Chronological Pipeline Grid */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Chronological Block Traversal</span>
              
              <div className="space-y-3">
                {/* Round 1 Row */}
                <div className="p-5 rounded-2xl bg-[#05080f]/40 border border-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-[#060a12]/60">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-emerald-500"><CheckCircle2 size={16} /></div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 block uppercase">Lifecycle Block 01</span>
                      <h4 className="text-xs font-bold text-slate-200">Target Disbursal Vector: <span className="text-emerald-400">Dawit (Node-01)</span></h4>
                      <p className="text-[10px] font-mono text-slate-500">Tx Signature: <span className="text-slate-400">0x8392...8821_SETTLED</span> • May 03, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end font-mono">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block uppercase">Allocated Pool Volume</span>
                      <span className="text-xs font-bold text-slate-300">10,000 ETB</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 rounded-lg uppercase">Archived</span>
                  </div>
                </div>

                {/* Round 2 Row */}
                <div className="p-5 rounded-2xl bg-[#05080f]/40 border border-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-[#060a12]/60">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-emerald-500"><CheckCircle2 size={16} /></div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 block uppercase">Lifecycle Block 02</span>
                      <h4 className="text-xs font-bold text-slate-200">Target Disbursal Vector: <span className="text-emerald-400">Aster (Node-02)</span></h4>
                      <p className="text-[10px] font-mono text-slate-500">Tx Signature: <span className="text-slate-400">0x4491...0029_SETTLED</span> • May 10, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end font-mono">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block uppercase">Allocated Pool Volume</span>
                      <span className="text-xs font-bold text-slate-300">10,000 ETB</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 rounded-lg uppercase">Archived</span>
                  </div>
                </div>

                {/* Round 3 Row - ACTIVE CHRONO TIMELINE BLOCK */}
                <div className="p-5 rounded-2xl bg-orange-950/5 border border-orange-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_20px_rgba(234,88,12,0.03)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-orange-500 animate-pulse"><Clock size={16} /></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-orange-400 font-bold uppercase tracking-wider">Lifecycle Block 03</span>
                        <span className="text-[8px] font-mono px-1.5 py-0.2 bg-orange-500/20 text-orange-400 rounded-md font-bold animate-pulse">LIVE OPERATIONAL BRIDGE</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100">Target Selection Sequence: <span className="text-orange-400">Pending Evaluation...</span></h4>
                      <p className="text-[10px] font-mono text-slate-400">Closing Settlement Horizon Threshold: <span className="text-white font-bold">May 17, 2026</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end font-mono">
                    <div className="text-right">
                      <span className="text-[9px] text-orange-500/70 block uppercase">Aggregated Round Capital</span>
                      <span className="text-xs font-black text-white">60,000 ETB</span>
                    </div>
                    <button 
                      onClick={() => setActiveTab("console")}
                      className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold rounded-lg uppercase transition-all shadow-[0_0_10px_rgba(234,88,12,0.2)]"
                    >
                      Enter Draw
                    </button>
                  </div>
                </div>

                {/* Round 4 Row */}
                <div className="p-5 rounded-2xl bg-transparent border border-slate-900 opacity-60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-slate-700"><AlertCircle size={16} /></div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-600 block uppercase">Lifecycle Block 04</span>
                      <h4 className="text-xs font-bold text-slate-400">Target Queue State: <span className="text-slate-500">Awaiting Horizon Block Advance</span></h4>
                      <p className="text-[10px] font-mono text-slate-600">Expected Settlement Launch: May 24, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end font-mono">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-600 block uppercase">Expected Draw Cap</span>
                      <span className="text-xs font-bold text-slate-500">60,000 ETB</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 border border-slate-900 px-2 py-0.5 rounded">Standby Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: CHURA MARKETPLACE */}
        {activeTab === "marketplace" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-slate-900 pb-4">
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Coins size={16} className="text-orange-500" /> P2P Turn Swap Marketplace (Chura Bidding)
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">Accelerate Yield Order Priorities via Cryptographic Percentage Premium Cut Bids</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bid Injection Component */}
              <form onSubmit={handleChuraSubmit} className="bg-[#090d16] border border-slate-900 p-5 rounded-2xl space-y-4 h-fit">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">Inject Premium Priority Proposal</h4>
                  <p className="text-[11px] text-slate-500">Specify your cut premium percentage value constraint parameters below [0.1% - 30.0%].</p>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="Proposal Premium Cut %" 
                    value={swapOfferAmount}
                    onChange={(e) => setSwapOfferAmount(e.target.value)}
                    className="w-full bg-[#030712] border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none"
                  />
                  <span className="absolute right-3 text-xs font-mono font-bold text-slate-600">%</span>
                </div>
                <button type="submit" className="w-full py-2 bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 text-orange-400 rounded-xl text-xs font-mono font-bold uppercase transition-all">
                  Broadcast Auction Link
                </button>
              </form>

              {/* Dynamic Bid Stream Cards */}
              <div className="lg:col-span-2 space-y-3">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Available Peer Priority Bidding Pipes</span>
                {churaOffers.map((offer) => (
                  <div key={offer.id} className="border border-slate-900 p-4 rounded-xl flex justify-between items-center bg-[#070b14]/30 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{offer.nodeName}</span>
                        <span className="text-[9px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">{offer.faydaId}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">{offer.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-black text-orange-400">-{offer.discountPremium}% Cut</span>
                      <button 
                        type="button"
                        disabled={offer.status === 'ACCEPTED'}
                        onClick={() => executeSwapTransaction(offer.id)} 
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                          offer.status === 'OPEN' 
                            ? "bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600" 
                            : "bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed"
                        }`}
                      >
                        {offer.status === 'OPEN' ? "Accept Swap" : "Settled"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 8: COLLATERAL RESERVES VAULT */}
        {activeTab === "vault" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-slate-900 pb-4">
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Landmark size={16} className="text-purple-500" /> Risk Isolation Vault Ledger
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1">Aggregated Smart Clearing Reserves and Total Protocol Liquidity Lockups</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 border border-slate-900 p-8 rounded-2xl bg-[#070b14]/50 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Total Liquid Contract Reserves</span>
                  <span className="text-4xl font-black font-mono tracking-tight text-white">{computedVaultReserves.toLocaleString()} <span className="text-sm font-normal text-purple-400">ETB</span></span>
                </div>
                <div className="p-4 bg-[#030712] border border-slate-900 rounded-xl text-xs font-sans text-slate-400 leading-relaxed">
                  Reserves account for active pool asset value balances (<span className="text-slate-200 font-mono">{(totalPoolCapital - totalDisbursed).toLocaleString()} ETB</span>) and verified safe margin cushion lockups injected during runtime (<span className="text-slate-200 font-mono">{simulatedCushionAdditions.toLocaleString()} ETB</span>).
                </div>
              </div>

              <div className="border border-slate-900 p-6 rounded-2xl bg-[#090d16] flex flex-col justify-between">
                <div className="space-y-2 font-mono text-xs text-slate-500">
                  <span className="text-[9px] font-bold uppercase tracking-wider block border-b border-slate-900 pb-2">Vault Safety Indicators</span>
                  <div className="flex justify-between py-1"><span>System Staked Units:</span><span className="text-slate-300 font-bold">{totalSlots} Slots</span></div>
                  <div className="flex justify-between py-1"><span>Disbursed Outflows:</span><span className="text-slate-300 font-bold">{totalDisbursed.toLocaleString()} ETB</span></div>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-2.5 text-center font-bold flex items-center gap-1.5 justify-center mt-4">
                  <ShieldCheck size={12}/> Audited Reserve Solvent
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER SYSTEM EVENT STREAM LOGS */}
        <div className="border-t border-slate-900/40 pt-8 space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Layers size={12}/> System Event Log Streams</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {auditTrail.slice(0, 3).map((log, i) => (
              <div key={i} className="text-[11px] font-mono text-slate-500 border-l border-slate-800 pl-3 leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
