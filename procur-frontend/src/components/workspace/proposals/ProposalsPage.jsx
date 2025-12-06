import React, { useEffect, useState } from "react";
import { api } from "../../../apis/api"

function formatCurrency(val, currency = "USD") {
  if (val == null) return "—";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(val);
  } catch {
    return `${currency} ${val}`;
  }
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  async function loadProposals(signal) {
    setLoading(true);
    setError("");
    try {
      // call API (no rfpId filters here)
      const res = await api.getProposals();
      if (!res || !res.ok) {
        const msg = res?.error || res?.message || "Failed to load proposals";
        throw new Error(msg);
      }

      // normalize API data into props the UI expects
      const normalized = (res.data || []).map((p) => {
        // parsed.summary from aiSummary, raw content fallback
        const summary = p.aiSummary || (p.rawEmail ? String(p.rawEmail).slice(0, 240) : "No summary available");

        // pricing: total from totalPrice; monthly from total/12 if available (best-effort)
        const total = p.totalPrice ?? null;
        const monthly = total ? Math.round((total / 12) * 100) / 100 : null;
        const setupFee = null; // backend does not return setupFee by default

        // terms: try to get delivery/payment/warranty into an array
        const terms = [];
        if (p.paymentTerms) terms.push(p.paymentTerms);
        if (p.warranty) terms.push(p.warranty);
        if (p.deliveryTimeline) terms.push(p.deliveryTimeline);

        // attachments: backend doesn't include attachments by default; keep empty
        const attachments = [];

        // Additional notes: use aiSummary or part of rawEmail
        const notes = p.aiSummary ? "" : (p.rawEmail || "");

        return {
          id: p.id || p._id,
          rfpTitle: p.rfp?.title || "Untitled RFP",
          vendorName: p.vendor?.name || "Unknown Vendor",
          vendorEmail: p.vendor?.email || null,
          receivedDate: p.receivedAt ? new Date(p.receivedAt).toLocaleString() : (p.createdAt ? new Date(p.createdAt).toLocaleString() : "Unknown"),
          rawContent: p.rawEmail || "",
          parsed: {
            summary,
            pricing: {
              total: total != null ? formatCurrency(total, p.currency) : "—",
              monthly: monthly != null ? formatCurrency(monthly, p.currency) : "—",
              setupFee: setupFee != null ? formatCurrency(setupFee, p.currency) : "—",
            },
            terms,
            delivery: p.deliveryTimeline || "Not specified",
            attachments,
            notes,
          },
          aiScore: typeof p.aiScore === "number" ? p.aiScore : null,
          status: p.status || "received",
        };
      });

      if (!signal || !signal.aborted) {
        setProposals(normalized);
      }
    } catch (err) {
      if (!signal || !signal.aborted) {
        setError(err?.message || "Failed to load proposals");
        setProposals([]);
      }
    } finally {
      if (!signal || !signal.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadProposals(controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col h-full p-6 max-w-6xl mx-auto rounded-2xl bg-slate-900/80 border border-slate-800/50 shadow-2xl shadow-slate-900/40 backdrop-blur-xl overflow-auto">
      <div className="flex items-start justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-100">Vendor Proposals</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const controller = new AbortController();
              loadProposals(controller.signal);
            }}
            className="rounded-md bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 transition"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-rose-900/20 border border-rose-800 p-3 text-rose-200">
          {error}
        </div>
      )}

      {loading && proposals.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-slate-400">Loading proposals…</div>
      ) : proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400 space-y-4">
          <svg
            className="w-20 h-20 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-lg font-semibold">No proposals yet</p>
          <p className="text-sm">Vendor replies will appear here after submission.</p>
        </div>
      ) : (
        <ul className="space-y-6 overflow-auto">
          {proposals.map((proposal) => {
            const isExpanded = expandedId === proposal.id;
            return (
              <li key={proposal.id} className="rounded-xl border border-slate-700/50 bg-slate-950/50 shadow-inner hover:shadow-lg hover:shadow-indigo-500/20 transition-shadow duration-300 p-5">
                <button
                  onClick={() => toggleExpanded(proposal.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex justify-between items-center text-left cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-indigo-400 font-semibold">
                      RFP: {proposal.rfpTitle}
                    </p>
                    <h2 className="text-xl font-bold text-slate-100">{proposal.vendorName}</h2>
                    <p className="text-sm text-slate-400">Received: {proposal.receivedDate}</p>
                    {/* <p className="mt-1 text-sm text-indigo-400 font-semibold">
                      AI Score: {proposal.aiScore != null ? `${proposal.aiScore}%` : "—"}
                    </p> */}
                    <p className="mt-2 text-sm text-slate-300 truncate max-w-md">
                      {proposal.parsed.summary}
                    </p>
                  </div>
                  <svg
                    className={`w-6 h-6 text-indigo-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="mt-4 border-t border-slate-700 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300 font-mono text-sm max-w-full">
                    {/* Pricing Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold border-b border-slate-700 pb-1">Pricing</h3>
                      <p>Total: {proposal.parsed.pricing.total}</p>
                      <p>Monthly: {proposal.parsed.pricing.monthly}</p>
                      <p>Setup Fee: {proposal.parsed.pricing.setupFee}</p>
                    </div>

                    {/* Terms */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold border-b border-slate-700 pb-1">Terms & Delivery</h3>
                      {proposal.parsed.terms.length ? (
                        <ul className="list-disc list-inside">
                          {proposal.parsed.terms.map((term, idx) => (
                            <li key={idx}>{term}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400">No terms provided</p>
                      )}
                      <p className="mt-2">Delivery: {proposal.parsed.delivery}</p>
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2 space-y-2 mt-4">
                      <h3 className="text-lg font-semibold border-b border-slate-700 pb-1">Additional Notes</h3>
                      <p>{proposal.parsed.notes || "No additional notes."}</p>
                    </div>

                    {/* Attachments */}
                    <div className="md:col-span-2 space-y-2">
                      <h3 className="text-lg font-semibold border-b border-slate-700 pb-1">Attachments</h3>
                      {proposal.parsed.attachments.length ? (
                        <ul className="list-disc list-inside">
                          {proposal.parsed.attachments.map((a, idx) => (
                            <li key={idx} className="text-indigo-400 cursor-pointer hover:underline">
                              {a}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No attachments</p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}