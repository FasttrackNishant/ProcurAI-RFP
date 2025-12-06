import React from "react";

const ProposalsSection = ({ proposals }) => (
  <div className="flex-1 flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800/50 shadow-2xl shadow-slate-900/30 backdrop-blur-xl overflow-hidden">
    <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
      <h5 className="text-xl font-semibold text-slate-300 font-mono tracking-wide uppercase flex items-center gap-2">
        📧 Proposals and AI comparison
      </h5>
      <button className="px-4 py-2 rounded-lg bg-slate-800/50 text-sm text-indigo-400 hover:bg-slate-700/70 hover:text-indigo-300 font-mono transition-all duration-200 border border-slate-700/50">
        Refresh proposals
      </button>
    </div>

    <div className="flex-1 p-8 overflow-y-auto">
      {proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 space-y-4">
          <div className="h-20 w-20 mx-auto rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-lg font-medium text-slate-300">No proposals yet</p>
          <p className="text-sm">When vendors reply, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-900/70 transition-all duration-200">
              <p className="text-slate-200 font-semibold">{proposal.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default ProposalsSection;
