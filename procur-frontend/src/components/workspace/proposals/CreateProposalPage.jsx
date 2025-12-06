import React, { useState, useEffect } from 'react';
import { api } from '../../../apis/api';

export default function CreateProposalPage() {
  const [rfps, setRfps] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

 
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [rfpRes, vendorRes] = await Promise.all([api.getRfpsList(), api.getVendors()]);
      setRfps((rfpRes && rfpRes.data) || rfpRes.data || []);
      setVendors((vendorRes && vendorRes.data) || vendorRes || []);
    } catch (err) {
      console.error('Load error:', err);
    }
  };
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRfp || !selectedVendor || !emailContent.trim()) {
      alert('Please select RFP, vendor, and add email content');
      return;
    }

    setLoading(true);
    setSuccess('');
    try {
    
      const response = await api.createProposals(selectedRfp,selectedVendor,emailContent);

      if (response && (response.ok || response.success)) {
        setSuccess('✅ Proposal created successfully!');
        setEmailContent('');
      } else {
        alert('Error: ' + (response?.error || response?.message || 'Failed to create proposal'));
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to create proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900/95 to-slate-950 p-6">
      {/* HEADER NOTE */}
      <div className="max-w-4xl mx-auto mb-12 p-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl backdrop-blur-sm">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-6 h-6 bg-amber-500/80 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
            <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-amber-100 mb-2">🧪 Test Page Notice</h2>
            <p className="text-amber-200 text-sm leading-relaxed">
              This is a <strong>test page for manual proposal creation</strong>. Use it when inbound email auto-reply API fails due to domain, DNS, or SendGrid limitations.
              Perfect for testing proposal workflows without email integration issues.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2 bg-gradient-to-r from-slate-100 to-slate-200 bg-clip-text text-transparent">
            📝 Create Test Proposal
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl leading-relaxed">
            Manually create proposals for testing. Select RFP, vendor, and fill proposal details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* RFP & VENDOR SELECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Select RFP</label>
                <select
                  value={selectedRfp}
                  onChange={(e) => setSelectedRfp(e.target.value)}
                  className="w-full p-4 bg-slate-900/80 border border-slate-700/50 rounded-2xl text-slate-200 font-medium backdrop-blur-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/70 transition-all hover:border-slate-600/70"
                  required
                >
                  <option value="">Choose RFP...</option>
                  {rfps.map((rfp) => (
                    <option key={rfp.id} value={rfp.id}>
                      {rfp.name} || 'N/A'
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Select Vendor</label>
                <select
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full p-4 bg-slate-900/80 border border-slate-700/50 rounded-2xl text-slate-200 font-medium backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/70 transition-all hover:border-slate-600/70"
                  required
                >
                  <option value="">Choose Vendor...</option>
                  {vendors.map((vendor) => (
                    <option key={vendor._id || vendor.id} value={vendor._id || vendor.id}>
                      {vendor.name} - {vendor.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* EMAIL CONTENT */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Email Content (Raw Email)</label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={8}
                placeholder={`Subject: Proposal for [RFP Title]

Dear Team,

Please find our detailed proposal below:

Items & Pricing:
- [Item details]

Total: $10,675 USD
Delivery: 10-12 business days
Payment: Net 30
Warranty: 2 years

Best regards,
[Vendor Name]`}
                className="w-full p-5 bg-slate-900/80 border border-slate-700/50 rounded-2xl text-slate-200 font-mono text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/70 transition-all resize-vertical min-h-[160px] backdrop-blur-sm"
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t border-slate-700/50">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-md shadow-xl ${
                  loading
                    ? 'bg-slate-700/50 border-slate-600/50 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-emerald-500/50 text-white hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02] hover:border-emerald-400/70 border shadow-lg shadow-emerald-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Test Proposal
                  </>
                )}
              </button>
            </div>
          </form>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mt-8 p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/80 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-900" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-100 mb-1">Success!</h3>
                  <p className="text-emerald-200">{success}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

