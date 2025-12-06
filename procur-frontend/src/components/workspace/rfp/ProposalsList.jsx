import React from "react";

const ProposalsList = ({ proposals }) => (
  <div className="flex-1 flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800/50 p-6 shadow-2xl shadow-slate-900/30 backdrop-blur-xl">
    <div className="flex items-center justify-between mb-4">
      <h5 className="text-lg font-semibold text-slate-300 font-mono tracking-wide uppercase flex items-center gap-2">
        📧 Proposals and AI comparison
      </h5>
      <button className="text-sm text-indigo-400 hover:text-indigo-300 font-mono transition-colors">
        Refresh proposals
      </button>
    </div>

    {proposals.length === 0 ? (
      <div className="flex-1 flex items-center justify-center text-center text-slate-400">
        <div className="space-y-2">
          <div className="h-12 w-12 mx-auto rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-sm font-medium">No proposals yet</p>
          <p className="text-xs">When vendors reply, they will appear here.</p>
        </div>
      </div>
    ) : (
      <div className="overflow-y-auto max-h-full space-y-4">
        {proposals.map((proposal, i) => (
          <div key={i} className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/50 hover:bg-slate-900/70 transition-colors">
            {/* Render proposal summary here */}
            <p className="text-slate-200 font-semibold">{proposal.summary}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProposalsList;
