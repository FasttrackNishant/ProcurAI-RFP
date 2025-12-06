import React, { useState } from "react";

export default function RfpsList({ onSelectRfp }) {
  const [rfps] = useState([
    {
      id: 1,
      title: "Cloud Hosting Services for E-commerce Platform",
      status: "draft",
      created: "2 hours ago",
      vendorsSent: 4,
      proposalsReceived: 2
    },
    {
      id: 2,
      title: "Office Equipment Procurement", 
      status: "sent",
      created: "3 days ago",
      vendorsSent: 3,
      proposalsReceived: 1
    }
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Past RFPs</h2>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700">
          + Create New RFP
        </button>
      </div>
      
      <div className="grid gap-4">
        {rfps.map((rfp) => (
          <div
            key={rfp.id}
            onClick={() => onSelectRfp(rfp)}
            className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-100 mb-1">{rfp.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                    rfp.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    rfp.status === 'sent' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                    'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                  }`}>
                    {rfp.status}
                  </span>
                  <span>{rfp.created}</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-emerald-400">{rfp.proposalsReceived}</div>
                <div className="text-xs text-slate-500">Proposals</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
