import React, { useState } from "react";

const sampleVendors = [
  { id: 1, name: "Alpha Solutions", email: "contact@alphasolutions.com" },
  { id: 2, name: "Beta Technologies", email: "sales@betatech.com" },
  { id: 3, name: "Gamma Supplies", email: "hello@gammasupplies.com" }
];

export default function VendorSelectorModal({ isOpen, onClose, onSend }) {
  const [selectedVendorIds, setSelectedVendorIds] = useState([]);

  const toggleVendor = (id) => {
    setSelectedVendorIds((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };

  const handleSendClick = () => {
    onSend(selectedVendorIds);
    onClose();
    setSelectedVendorIds([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="max-w-md rounded-xl bg-slate-900 p-6 shadow-xl shadow-indigo-900/70 border border-indigo-700/50">
        <h3 className="mb-4 text-xl font-bold text-indigo-300">Select Vendors</h3>
        <div className="max-h-60 overflow-y-auto">
          {sampleVendors.map((vendor) => (
            <label
              key={vendor.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 p-3 hover:border-indigo-500 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedVendorIds.includes(vendor.id)}
                onChange={() => toggleVendor(vendor.id)}
                className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-600"
              />
              <div>
                <p className="font-semibold text-slate-200">{vendor.name}</p>
                <p className="text-sm text-slate-400">{vendor.email}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-slate-400 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSendClick}
            disabled={selectedVendorIds.length === 0}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            Send RFP
          </button>
        </div>
      </div>
    </div>
  );
}
