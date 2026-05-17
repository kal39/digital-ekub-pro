import React from 'react';
import { ArrowUpRight, CheckCircle2, Hourglass, Calendar, User, ShieldCheck } from 'lucide-react';

export function PayoutQueueTracker() {
  // Mock data representing a dynamic real-world rotation queue
  const queueData = [
    { position: 1, name: "Dawit (Node-01)", status: "PAID_OUT", payoutRound: 1, payoutDate: "R1 - Apr 01", amount: 50000, trustRating: "99%" },
    { position: 2, name: "Aster (Node-02)", status: "PAID_OUT", payoutRound: 2, payoutDate: "R2 - May 01", amount: 50000, trustRating: "98%" },
    { position: 3, name: "Kal (You)", status: "NEXT_UP", payoutRound: 3, payoutDate: "R3 - Jun 01", amount: 50000, trustRating: "100%" },
    { position: 4, name: "Hirut (Node-04)", status: "QUEUED", payoutRound: 4, payoutDate: "R4 - Jul 01", amount: 50000, trustRating: "96%" },
    { position: 5, name: "Yonas (Node-05)", status: "QUEUED", payoutRound: 5, payoutDate: "R5 - Aug 01", amount: 50000, trustRating: "95%" },
  ];

  return (
    <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-6 shadow-xl space-y-4 backdrop-blur-md">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/80 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-tight flex items-center gap-2">
            <ArrowUpRight size={16} className="text-orange-500 animate-pulse" /> Consensus Rotation & Payout Queue
          </h3>
          <p className="text-[11px] font-mono text-slate-500 mt-0.5">
            Algorithmic distribution track mapping active collateral dispersion sequences.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-1 border border-purple-500/20 rounded-lg">
            Current Cycle: Round 3
          </span>
        </div>
      </div>

      {/* The Advanced Queue Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-900 text-slate-500 font-mono text-[10px] uppercase bg-slate-950/50">
              <th className="p-3 text-center w-12">Pos</th>
              <th className="p-3">Cluster Member Node</th>
              <th className="p-3 text-center">Target Round</th>
              <th className="p-3">Est. Dispatch Date</th>
              <th className="p-3">Expected Lump Sum</th>
              <th className="p-3 text-right">Queue State Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/50 font-sans">
            {queueData.map((node) => {
              const isUser = node.name.includes("You");
              const isNext = node.status === "NEXT_UP";
              const isPaid = node.status === "PAID_OUT";

              return (
                <tr 
                  key={node.position} 
                  className={`transition-colors group ${
                    isNext 
                      ? "bg-orange-500/5 hover:bg-orange-500/10" 
                      : "hover:bg-slate-900/30"
                  }`}
                >
                  {/* Position Badge Column */}
                  <td className="p-3 text-center">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] ${
                      isPaid ? "bg-slate-900 text-slate-600 line-through" :
                      isNext ? "bg-orange-500 text-slate-950 shadow-[0_0_10px_rgba(249,115,22,0.3)]" :
                      "bg-slate-900 text-slate-400"
                    }`}>
                      #{node.position}
                    </span>
                  </td>

                  {/* Member Name Identity */}
                  <td className={`p-3 font-semibold ${isUser ? "text-purple-400" : "text-slate-200"}`}>
                    <div className="flex items-center gap-1.5">
                      <User size={12} className={isUser ? "text-purple-400" : "text-slate-500"} />
                      {node.name}
                      {isUser && (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded">
                          Self Node
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Target Round Reference */}
                  <td className="p-3 text-center font-mono font-bold text-slate-400">
                    {node.payoutRound}
                  </td>

                  {/* Estimated Target Payout Window */}
                  <td className="p-3 text-slate-400 font-mono tracking-wide">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-slate-600" />
                      {node.payoutDate}
                    </div>
                  </td>

                  {/* Expected Capital Value Distributed */}
                  <td className="p-3 font-mono font-bold text-slate-300">
                    {node.amount.toLocaleString()} <span className="text-[10px] text-slate-600 font-normal">ETB</span>
                  </td>

                  {/* Queue State Badges */}
                  <td className="p-3 text-right">
                    <span className={`inline-flex items-center gap-1 font-mono font-black text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-xl border ${
                      isPaid ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" :
                      isNext ? "bg-orange-500/10 text-orange-400 border-orange-500/30 animate-pulse" :
                      "bg-slate-950 text-slate-500 border-slate-900"
                    }`}>
                      {isPaid && (
                        <>
                          <CheckCircle2 size={10} className="text-emerald-500" /> Disbursed
                        </>
                      )}
                      {isNext && (
                        <>
                          <Hourglass size={10} className="text-orange-400" /> Collection Target
                        </>
                      )}
                      {!isPaid && !isNext && (
                        <>
                          <ShieldCheck size={10} className="text-slate-600" /> Waiting Matrix
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}