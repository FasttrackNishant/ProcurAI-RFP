// CompareProposalsButton.jsx
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { api } from '../../../apis/api';
import { ComparisonResults } from './ComparisonResults';
import toast from 'react-hot-toast';

const ModalPortal = ({ children }) => {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(children, document.body);
};

const CompareProposalsButton = ({ rfpId, proposalIds, disabled = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // prevent body scroll when modal open
  useEffect(() => {
    if (showModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
  }, [showModal]);

  // ESC to close
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showModal]);

  const handleCompare = async () => {
    if (!proposalIds?.length || disabled) return;

    // open modal immediately so user sees something while request runs
    setIsComparing(true);
    setComparisonData(null);
    setError(null);
    openModal();

    try {
      const response = await api.getRfpComparison(rfpId);

      if (!response) {
        const msg = 'No response from server.';
        toast.error(msg);
        setError(msg);
        return;
      }

      if (!response.proposals || response.proposals.length === 0) {
        const msg = 'No proposals received yet for this RFP.';
        toast.error(msg);
        setError(msg);
        return;
      }

      if (!response.comparison) {
        const msg = 'At least 2 proposals are required to generate a comparison.';
        toast.error(msg);
        setError(msg);
        return;
      }

      toast.success('Comparison generated successfully!');
      setComparisonData(response);
    } catch (err) {
      console.error('Comparison error:', err);
      const msg = err?.message || 'Comparison failed. Try again.';
      toast.error(msg);
      setError(msg);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <>
      <button
    onClick={handleCompare}
    disabled={disabled || !proposalIds?.length}
    className={`group relative overflow-hidden rounded-2xl px-7 py-3.5 font-bold text-sm flex items-center gap-3 transition-all duration-500 backdrop-blur-xl shadow-2xl border-2 ${
        proposalIds?.length && !disabled
            ? 'bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-emerald-600/90 border-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-emerald-500 text-white shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:shadow-2xl hover:scale-[1.05] active:scale-[0.98] hover:-translate-y-0.5 transform-gpu'
            : 'bg-gradient-to-r from-slate-700/40 via-slate-800/40 to-slate-700/40 border-slate-600/40 text-slate-400 cursor-not-allowed opacity-70 shadow-slate-900/20'
    }`}
>
    {/* Animated Icon Container */}
    <div className={`relative w-5 h-5 transition-all duration-700 ${
        proposalIds?.length && !disabled 
            ? 'group-hover:rotate-180 group-hover:scale-125' 
            : ''
    }`}>
        <svg className="absolute inset-0 w-5 h-5 opacity-100 group-hover:opacity-0 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M9 12h6" />
        </svg>
        <svg className="absolute inset-0 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>

    {/* Main Text */}
    <span className="relative z-10 tracking-wide">
        {proposalIds?.length && !disabled ? 'AI Compare' : 'Compare'}
    </span>

    {/* Premium Count Badge */}
    {proposalIds?.length > 0 && !disabled && (
        <div className="relative group-hover:scale-110 transition-transform duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-full blur opacity-75 animate-pulse group-hover:opacity-100" />
            <div className="relative px-2.5 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-xs font-black text-white shadow-lg shadow-white/10 group-hover:shadow-white/20 group-hover:border-white/30">
                {proposalIds.length}
            </div>
        </div>
    )}

    {/* Premium Shine & Glow Effects */}
    {proposalIds?.length && !disabled && (
        <>
            {/* Shine Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-700 
                           -skew-x-12 transform -translate-x-full group-hover:translate-x-full 
                           group-hover:delay-200" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-500" />
                <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-emerald-300/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-700" />
                <div className="absolute top-1/2 -left-4 w-3 h-3 bg-purple-300/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-1000" />
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/60 via-purple-400/60 to-indigo-400/60 
                           transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />
        </>
    )}

    {/* Pulse Ring Effect */}
    {proposalIds?.length && !disabled && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-emerald-400/30 
                       opacity-0 group-hover:opacity-100 blur-xl scale-150 animate-ping-slow" />
    )}
</button>


      {showModal && (
        <ModalPortal>
          {/* SINGLE overlay contains and centers the modal */}
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            onMouseDown={(e) => {
              // clicking overlay closes; clicking modal will stopPropagation
              if (e.target === e.currentTarget) {
                closeModal();
              }
            }}
          >
            {/* dark translucent backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)' }}
              aria-hidden="true"
            />

            {/* modal content (clicks inside won't close because we stop propagation) */}
            <div
              className="relative z-10 w-full max-w-5xl max-h-[90vh] mx-4 lg:mx-auto bg-slate-900/98 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
              style={{ maxWidth: '1200px' }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 lg:p-8 border-b border-slate-800/60 bg-slate-900/95 backdrop-blur-xl sticky top-0 z-20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-slate-100 mb-1">
                      {isComparing ? '🤖 AI Comparing Proposals' : '⚖️ AI Comparison Results'}
                    </h2>
                    {!isComparing && (
                      <p className="text-slate-500 text-sm">
                        Analyzed {proposalIds?.length || 0} proposals across key metrics
                      </p>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2.5 hover:bg-slate-800/60 rounded-xl transition-all group backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                {isComparing ? (
                  <div className="flex flex-col items-center text-center py-16">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 w-20 h-20 border-4 border-slate-800/50 border-t-slate-400 rounded-full animate-spin" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-3">AI is analyzing proposals...</h3>
                    <p className="text-slate-500 mb-10 max-w-md text-sm leading-relaxed">
                      Evaluating pricing competitiveness, delivery timelines, payment terms compliance, warranty coverage, and overall value.
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-red-500/10 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 border-red-500/40">
                      <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-3">Comparison Failed</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">{error}</p>
                    <button
                      onClick={handleCompare}
                      className="px-8 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/50 text-slate-200 rounded-xl font-medium transition-all text-sm backdrop-blur-sm shadow-md hover:shadow-lg"
                    >
                      Try Again
                    </button>
                  </div>
                ) : comparisonData ? (
                  <ComparisonResults data={comparisonData} />
                ) : (
                  <div className="text-center py-16 text-slate-500">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold mb-2">No comparison data available</p>
                    <p className="text-sm max-w-md mx-auto">Select proposals first, then click Compare</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default CompareProposalsButton;