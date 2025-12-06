import React from "react";

/**
 * RfpDetails - renders an RFP object returned by your backend.
 *
 * Expected backend shape (partial):
 * {
 *   title: "30 Smartphones for Field Staff",
 *   naturalLanguageRequest: "Need 30 smartphones ...",
 *   budget: 18000,
 *   currency: "USD",
 *   deliveryTimeline: "within 14 days",
 *   paymentTerms: null,
 *   warranty: "2-year",
 *   items: [{ name: "smartphones", quantity: 30, specs: "must support 5G" }, ...],
 *   status: "draft",
 *   _id: "...",
 *   createdAt: "2025-12-04T19:11:27.419Z",
 *   updatedAt: "2025-12-04T19:11:27.419Z"
 * }
 */

function formatCurrency(amount, currency) {
  if (amount == null || isNaN(amount)) return "Not specified";
  try {
    // show grouping and currency code at end, e.g., "18,000 USD"
    const formatted = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 0,
    }).format(amount);
    return currency ? `${formatted} ${currency}` : formatted;
  } catch {
    return `${amount} ${currency || ""}`.trim();
  }
}

function humanDate(iso) {
  if (!iso) return "Unknown";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function ReadOnlyStatusBadge({ status = "draft" }) {
  const styles = {
    draft: {
      bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
      dot: "bg-yellow-400",
      label: "Draft",
    },
    sent: {
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
      dot: "bg-emerald-400",
      label: "Sent",
    },
    closed: {
      bg: "bg-slate-500/10 border-slate-500/20 text-slate-300",
      dot: "bg-slate-400",
      label: "Closed",
    },
  };
  const s = styles[status] || styles.closed;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium select-none ${s.bg} ${s.text}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const RfpDetails = ({ rfpData = {} }) => {

  const {
    title,
    naturalLanguageRequest,
    budget,
    currency,
    deliveryTimeline,
    paymentTerms,
    warranty,
    items = [],
    status,
    createdAt,
    updatedAt,
    _id,
  } = rfpData;

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800/50 p-8 shadow-2xl shadow-slate-900/30 backdrop-blur-xl">
      <div className="flex items-start justify-between mb-6 gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-3xl font-black text-slate-100 tracking-tight mb-2 break-words">
            {title || "Untitled RFP"}
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
           
            {createdAt && (
              <span className="text-xs text-slate-500 font-mono px-3 py-1 bg-slate-800/40 rounded-lg border border-slate-700/40">
                Created: {humanDate(createdAt)}
              </span>
            )}
            
          </div>
        </div>

        <div className="shrink-0">
          <div className="rounded-full bg-emerald-500/10 text-emerald-300 px-5 py-2 text-sm font-semibold border border-emerald-500/20">
            <ReadOnlyStatusBadge status={status} />
          </div>
        </div>
      </div>

      {/* Original prompt / natural language */}
      {naturalLanguageRequest && (
        <div className="mb-6">
          <h4 className="text-sm font-mono text-slate-400 uppercase mb-2">Original request</h4>
          <div className="text-slate-300 bg-slate-800/40 border border-slate-700/40 rounded-md p-4 whitespace-pre-wrap font-medium">
            {naturalLanguageRequest}
          </div>
        </div>
      )}

      {/* Structured summary */}
      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-slate-300 tracking-wide uppercase mb-2">Structured Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="h-4 w-4 rounded-full bg-emerald-400" />
              <div>
                <span className="text-slate-500 font-mono text-sm block">Budget</span>
                <p className="font-bold text-emerald-300 text-lg">{formatCurrency(budget, currency)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="h-4 w-4 rounded-full bg-indigo-400" />
              <div>
                <span className="text-slate-500 font-mono text-sm block">Delivery timeline</span>
                <p className="font-bold text-indigo-300 text-lg">{deliveryTimeline || "Not specified"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="h-4 w-4 rounded-full bg-purple-400" />
              <div>
                <span className="text-slate-500 font-mono text-sm block">Payment terms</span>
                <p className="font-bold text-purple-300 text-lg">{paymentTerms || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="h-4 w-4 rounded-full bg-amber-400" />
              <div>
                <span className="text-slate-500 font-mono text-sm block">Warranty</span>
                <p className="font-bold text-amber-300 text-lg">{warranty || "Not specified"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-8 space-y-3">
        <h5 className="text-xl font-semibold text-slate-300 font-mono tracking-wide uppercase mb-4 flex items-center gap-2">📦 Items</h5>

        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-950/50 border border-slate-800/50 text-slate-500">No items specified.</div>
          ) : (
            items.map((it, idx) => {
              const qty = it.quantity ?? "N/A";
              const specs = it.specs || it.description || "No specs provided";
              return (
                <div key={idx} className="p-6 rounded-xl bg-slate-950/50 border border-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 text-lg font-bold border-2 border-indigo-500/30">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-200 text-lg truncate">{it.name || "Unnamed item"}</p>
                        <p className="text-sm text-slate-400">
                          Qty: <span className="font-medium text-slate-200">{qty}</span>
                          {specs ? <><span className="mx-2 text-slate-600">•</span><span className="text-slate-400">{specs}</span></> : null}
                        </p>
                      </div>
                    </div>

                    {/* unitPrice might not exist in structured RFP; show TBD if absent */}
                    <div className="text-right">
                      <span className="text-sm text-slate-500 block">Unit Price</span>
                      <span className="text-xl font-black text-slate-300 bg-slate-800/40 px-4 py-2 rounded-lg block mt-1">
                        {it.unitPrice ?? "TBD"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RfpDetails;