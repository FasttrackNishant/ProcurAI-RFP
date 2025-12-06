import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { api } from "../../../apis/api";

const VendorsSection = ({ vendors = [], rfpId, onSent }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);

  const [loadingSend, setLoadingSend] = useState(false);

  // Normalize vendor id accessor (support id or _id)
  const normalizeId = (v) => v.id ?? v._id ?? "";

  const filteredVendors = useMemo(() => {
    const q = (searchTerm || "").toLowerCase().trim();
    if (!q) return vendors;
    return vendors.filter((v) =>
      String(v.name ?? "").toLowerCase().includes(q) ||
      String(v.email ?? "").toLowerCase().includes(q) ||
      String(v.company ?? "").toLowerCase().includes(q)
    );
  }, [vendors, searchTerm]);

  const toggleSelect = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));

  // Send selected vendor ids for this RFP
  const handleSend = async () => {
    if (!rfpId) {
      toast.error("RFP id missing");
      return;
    }
    if (selected.length === 0) {
      toast.error("Select at least one vendor.");
      return;
    }

    setLoadingSend(true);
    try {
      // call the API - ensure api.sendRfpToVendors accepts (rfpId, vendorIds)
      await api.sendRfpToVendors(rfpId, selected);
      toast.success(`RFP sent to ${selected.length} vendor(s)`);
      setSelected([]);

      // optional callback for parent to react (refresh proposals, etc.)
      if (typeof onSent === "function") onSent({ rfpId, vendorIds: selected });
    } catch (err) {
      console.error("sendRfpToVendors error", err);
      toast.error(err?.message || "Failed to send RFP emails");
    } finally {
      setLoadingSend(false);
    }
  };

  // local error state removed in favor of toast + button disabled UX
  return (
    <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-emerald-500/30">
      <h5 className="text-xl font-semibold text-slate-300 mb-4 font-mono tracking-wide uppercase">
        Send to Vendors
      </h5>

      <input
        type="text"
        placeholder="Search vendors..."
        className="w-full mb-4 rounded-md border border-slate-700/50 bg-slate-900/70 p-3 text-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        aria-label="Search vendors"
      />

      <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
        {filteredVendors.length === 0 ? (
          <p className="text-center text-slate-500 font-mono">No vendors found</p>
        ) : (
          filteredVendors.map((vendor) => {
            const vid = normalizeId(vendor);
            const checked = selected.includes(vid);
            return (
              <label
                key={vid || vendor.email || Math.random()}
                className="flex items-center gap-4 rounded-lg border border-slate-700/70 p-3 hover:border-indigo-500/60 hover:bg-slate-800/60 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSelect(vid)}
                  className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/50"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-200 truncate group-hover:text-indigo-300">{vendor.name}</p>
                  <p className="text-xs text-slate-400 truncate">{vendor.email}</p>
                  {vendor.company && <p className="text-xs text-slate-500 mt-1 truncate">{vendor.company}</p>}
                </div>
              </label>
            );
          })
        )}
      </div>

      <button
        onClick={handleSend}
        disabled={selected.length === 0 || loadingSend}
        className={`w-full rounded-2xl px-6 py-3 text-lg font-bold text-white shadow-xl transition-all duration-300
          ${selected.length === 0 || loadingSend
            ? "bg-slate-700 cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-emerald-600/60 hover:-translate-y-0.5"
          }`}
        aria-disabled={selected.length === 0 || loadingSend}
      >
        {loadingSend ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending…
          </span>
        ) : (
          <>Send RFP via email ({selected.length})</>
        )}
      </button>
    </div>
  );
};

export default VendorsSection;