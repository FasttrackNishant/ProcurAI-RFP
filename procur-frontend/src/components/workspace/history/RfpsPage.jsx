import React, { useState } from 'react';
import { StatusBadge } from '../../utlis/StatusBadge';
import RfpsHistoryList from './RfpsHistoryList';
import { api } from '../../../apis/api';
import CompareProposalsButton from './CompareProposalsButton';

export default function RfpsPage() {
    const [selectedRfp, setSelectedRfp] = useState(null);
    const [currentId, setCurrentId] = useState('');

    const handleRowClick = (rfp) => {
        loadRfpFulHistory(rfp.id);
        setCurrentId(rfp.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToList = () => {
        setSelectedRfp(null);
    };

    async function loadRfpFulHistory(id) {
        try {
            const res = await api.getRfpsFullDetails(id);
            console.log(res)
            if (!res?.ok) {
                throw new Error(res?.error || res?.message || 'Failed to load RFPs');
            }
            setSelectedRfp(res.data);
        } catch (err) {
            console.error('Error loading RFP history:', err);
        }
    }

    // PERFECT ProposalCard - Matches YOUR JSON EXACTLY
    const ProposalCard = ({ proposal }) => {
        const [showFullEmail, setShowFullEmail] = useState(false);
        const [isExpandedItems, setIsExpandedItems] = useState(false);

        const formatPrice = (price) => price ? `$${Number(price).toLocaleString()}` : 'N/A';

        const getSummary = () => {
            return proposal?.parsed?.summary ?? 'No summary available';
        };

        const renderItems = () => {
            if (!proposal.parsed?.items?.length) return <div className="text-slate-500 text-xs italic mt-2">No items specified</div>;
            const visibleItems = proposal.parsed?.items.slice(0, isExpandedItems ? proposal?.parsed?.items.length : 2);
            return (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800/50">
                    <div className="space-y-2 mb-3">
                        {visibleItems.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm py-1">
                                <span className="text-slate-300 font-medium truncate max-w-[200px]">
                                    {item.quantity || 1}x {item.name}
                                </span>
                                <span className="font-mono text-emerald-400 font-semibold min-w-[90px] text-right">
                                    {formatPrice(item.totalPrice)}
                                </span>
                            </div>
                        ))}
                    </div>
                    {proposal.parsed.items.length > 2 && (
                        <button
                            onClick={() => setIsExpandedItems(!isExpandedItems)}
                            className="w-full text-indigo-400 text-sm font-medium py-1 px-2 hover:text-indigo-300 hover:bg-indigo-500/10 rounded transition-all text-left"
                        >
                            {isExpandedItems ? '− Show Less Items' : `+${proposal.length - 2} more items`}
                        </button>
                    )}
                </div>
            );
        };

        return (
            <div className="p-6 bg-slate-800/70 hover:bg-slate-800/90 rounded-xl border border-slate-700/70 hover:border-slate-600/70 transition-all duration-200 backdrop-blur-sm">
                {/* Header - FIXED */}
                <div className="flex items-start justify-between mb-5 pb-3 border-b border-slate-700/50">
                    <div className="flex-1 min-w-0 pr-4">
                        <h4 className="font-bold text-slate-100 text-lg leading-tight mb-1">
                            {proposal.vendorName || 'Unknown Vendor'}
                        </h4>
                       
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right min-w-[110px]">
                        {proposal.aiScore && (
                            <div className={`px-3 py-1.5 rounded-md font-mono font-bold text-sm border ${
                                proposal.aiScore >= 80 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                proposal.aiScore >= 50 ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                'bg-red-500/20 text-red-400 border-red-500/40'
                            }`}>
                                {proposal.aiScore}/100
                            </div>
                        )}
                        <div className="font-mono text-2xl font-bold text-emerald-400">
                            {(proposal?.parsed?.pricing?.total)}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-4">
                    <p className="text-slate-300 leading-relaxed text-sm mb-2 line-clamp-2">{getSummary()}</p>
                    {proposal.rawEmail && (
                        <button
                            onClick={() => setShowFullEmail(!showFullEmail)}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                        >
                            {showFullEmail ? 'Hide email' : 'Show full email'}
                            <svg className={`w-3.5 h-3.5 transition-transform ${showFullEmail ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Full Email */}
                {showFullEmail && proposal.rawEmail && (
                    <div className="mb-4 p-4 bg-slate-900/95 rounded-lg border border-slate-700/60 max-h-32 overflow-y-auto">
                        <div className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-5">{proposal.rawEmail}</div>
                    </div>
                )}

                {/* Key Terms - EXACT JSON FIELDS */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-1.5 text-xs">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <span className="font-medium text-slate-300">Devliery</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-medium text-slate-300 truncate" title={proposal.parsed.delivery}>
                            {proposal?.parsed?.delivery || 'N/A'}
                        </span>
                    </div>
                    
                   
                </div>

                {/* Items */}
                {renderItems()}
            </div>
        );
    };

    // DETAIL VIEW
    if (selectedRfp) {
        const hasProposals = selectedRfp.proposals?.length > 0;
        const proposalsCount = selectedRfp.proposalsReceived || selectedRfp.proposals?.length || 0;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900/95 to-slate-950 p-4 lg:p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleBackToList}
                            className="flex items-center gap-2.5 text-slate-400 hover:text-slate-200 font-medium text-base px-4 py-2.5 rounded-lg hover:bg-slate-800/60 transition-all backdrop-blur-sm border border-slate-700/50"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to List
                        </button>
                        <StatusBadge status={selectedRfp.status} />
                    </div>

                    {/* RFP Details - FIXED */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3 leading-tight">
                                {selectedRfp.title}
                            </h1>
                            <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
                                {selectedRfp.naturalLanguageRequest || selectedRfp.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/70 backdrop-blur-sm">
                                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">Budget</div>
                                <div className="text-3xl font-bold text-emerald-400">
                                    {selectedRfp.budget ? `$${selectedRfp.budget.toLocaleString()}` : 'Not specified'}
                                </div>
                            </div>
                            <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/70 backdrop-blur-sm">
                                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">Created</div>
                                <div className="text-xl font-semibold text-slate-200">
                                    {selectedRfp.createdAt ? new Date(selectedRfp.createdAt).toLocaleDateString() : 'Recent'}
                                </div>
                            </div>
                        </div>

                        {/* RFP Terms - PROPERLY FORMATTED */}
                        {(selectedRfp.deliveryTimeline || selectedRfp.warranty || selectedRfp.paymentTerms) && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-800/70 rounded-2xl border border-slate-700/70 backdrop-blur-sm">
                                {selectedRfp.deliveryTimeline && (
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">Delivery Timeline</div>
                                        <div className="text-lg font-semibold text-slate-200">{selectedRfp.deliveryTimeline}</div>
                                    </div>
                                )}
                                {selectedRfp.paymentTerms && (
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">Payment Terms</div>
                                        <div className={`text-lg font-semibold ${selectedRfp.paymentTerms.toLowerCase().includes('net') ? 'text-green-400' : 'text-orange-400'}`}>
                                            {selectedRfp.paymentTerms}
                                        </div>
                                    </div>
                                )}
                                {selectedRfp.warranty && (
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">Warranty</div>
                                        <div className="text-lg font-semibold text-indigo-400">{selectedRfp.warranty}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Vendors */}
                    <div className="bg-slate-800/50 p-6 lg:p-8 rounded-3xl border border-slate-700/50 backdrop-blur-xl">
                        <h3 className="text-xl lg:text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2.5">
                            👥 Vendors ({selectedRfp.vendors?.length || 0})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {selectedRfp.vendors?.map((vendor, idx) => (
                                <div key={vendor._id || idx} className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 hover:bg-slate-900/90 transition-all">
                                    <div className="font-semibold text-slate-200 text-base mb-1 leading-tight truncate">
                                        {vendor.name}
                                    </div>
                                    <div className="text-sm text-slate-400 truncate">{vendor.email}</div>
                                    {vendor.company && (
                                        <div className="text-xs text-slate-500">{vendor.company}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Proposals */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl lg:text-2xl font-bold text-slate-200 flex items-center gap-2.5">
                                📧 Proposals ({proposalsCount})
                            </h3>
                            <CompareProposalsButton
                                rfpId={currentId}
                                proposalIds={selectedRfp.proposals?.map(p => p._id) || []}
                                disabled={!hasProposals || proposalsCount < 2}
                            />
                        </div>

                        {hasProposals ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {selectedRfp.proposals.map((proposal, idx) => (
                                    <ProposalCard key={proposal._id || idx} proposal={proposal} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-slate-800/60 rounded-2xl border-2 border-dashed border-slate-700/50">
                                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-xl font-bold text-slate-400 mb-1">No proposals received yet</p>
                                <p className="text-slate-500 text-base">Vendors will submit proposals here after RFP is sent</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return <RfpsHistoryList onSelectRfp={handleRowClick} />;
}
