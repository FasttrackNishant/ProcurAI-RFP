export const ComparisonResults = ({ data }) => {
    const recommendedScore = data.comparison.scores.find(s => s.proposalId === data.comparison.recommendedProposalId)?.score;

    return (
        <div className="space-y-8">
            {/* Overall Summary */}
            <div className="p-8 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-emerald-500/20 rounded-3xl backdrop-blur-sm">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3 text-emerald-400">
                    🎯 AI Recommendation
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed max-w-4xl">
                    {data.comparison.overallSummary}
                </p>
            </div>

            {/* Recommended Proposal */}
            <div className="p-8 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-500/25 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-3">
                    🏆 Top Recommendation
                </h3>
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl font-black text-emerald-300">
                        #{data.comparison.recommendedProposalName}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="px-6 py-3 bg-emerald-500/90 text-white rounded-2xl font-bold text-xl shadow-2xl">
                            {recommendedScore}/100
                        </div>
                        <div className="text-2xl font-bold text-slate-200">
                            Best overall value & compliance
                        </div>
                    </div>
                </div>
            </div>

            {/* Individual Scores */}
            <div>
                <h3 className="text-2xl font-bold mb-8 text-slate-200 flex items-center gap-2">
                    📊 Detailed Scores
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {data.comparison.scores.map(({ proposalId, score, rationale }) => {
                        const proposal = data.proposals.find(p => p._id === proposalId);
                        const scoreColor = score > 70 ? 'emerald' : score > 40 ? 'amber' : 'red';
                        
                        return (
                            <div key={proposalId} className={`group p-8 rounded-3xl border-2 transition-all backdrop-blur-sm shadow-xl hover:shadow-2xl ${
                                score > 70 
                                    ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/30 shadow-emerald-500/25 hover:shadow-emerald-500/40'
                                    : score > 40 
                                        ? 'bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30 shadow-amber-500/25 hover:shadow-amber-500/40'
                                        : 'bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30 shadow-red-500/25 hover:shadow-red-500/40'
                            }`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl font-black text-slate-100 group-hover:text-white/90">
                                                {proposal?.vendor?.name || 'Unknown'}
                                            </span>
                                          
                                        </div>
                                        <div className="text-lg font-bold text-slate-300">
                                            Total: ${proposal?.totalPrice?.toLocaleString() || 'N/A'} {proposal?.currency}
                                        </div>
                                    </div>
                                    <div className={`px-6 py-3 rounded-2xl font-black text-xl shadow-2xl ${
                                        score > 70 
                                            ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                                            : score > 40 
                                                ? 'bg-amber-500 text-white shadow-amber-500/50'
                                                : 'bg-red-500 text-white shadow-red-500/50'
                                    }`}>
                                        {score}/100
                                    </div>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-lg">{rationale}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
