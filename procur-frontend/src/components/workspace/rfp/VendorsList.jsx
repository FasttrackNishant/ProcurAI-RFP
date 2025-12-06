import React from "react";

const VendorsList = ({ vendors }) => (
  <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-emerald-500/30 mb-6">
    <h5 className="text-lg font-semibold text-slate-300 mb-4 font-mono tracking-wide uppercase">
      Send to Vendors
    </h5>
    <p className="text-sm text-slate-400 mb-4">Pick vendors to email this RFP to.</p>
    <div className="space-y-2 mb-4 max-h-44 overflow-y-auto">
      {vendors.map((vendor, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-900/70 transition-colors cursor-pointer"
          title={vendor.email}
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-200 truncate">{vendor.name}</p>
            <p className="text-xs text-slate-400 truncate">{vendor.email}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-lg font-semibold text-white shadow-xl shadow-emerald-700/40 hover:shadow-emerald-600/50 transition-all duration-300 hover:-translate-y-0.5">
      Send RFP via email
    </button>
  </div>
);

export default VendorsList;
