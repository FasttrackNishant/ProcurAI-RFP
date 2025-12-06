import React, { useEffect, useState } from "react";
import { api } from "../../../apis/api";
import { StatusBadge } from "../../utlis/StatusBadge";

const RfpsHistoryList = ({ onSelectRfp }) => {
    const [rfpsHistory, setRfpsHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRfpsHistory();
    }, []);

    async function loadRfpsHistory() {
        try {
            setLoading(true);
            const res = await api.getRfpsHistory();
            if (!res?.ok) {
                throw new Error(res?.error || res?.message || "Failed to load RFPs");
            }
            setRfpsHistory(res.data || []);
        } catch (err) {
            console.error("Error loading RFP history:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-slate-100 via-indigo-100 to-purple-200 bg-clip-text text-transparent tracking-tight">
                        RFPs History
                    </h1>
                    <div className="text-sm text-slate-400">
                        {rfpsHistory.length} total RFPs
                    </div>
                </div>

                <div className="bg-slate-900/30 rounded-3xl border border-slate-800/30 shadow-2xl backdrop-blur-xl overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-6"></div>
                            <p className="text-slate-400">Loading RFPs...</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
                                    <th className="p-8 text-left font-bold text-slate-300 uppercase tracking-wider text-sm">Title</th>
                                    <th className="p-8 text-left font-bold text-slate-300 uppercase tracking-wider text-sm">Budget</th>
                                    <th className="p-8 text-left font-bold text-slate-300 uppercase tracking-wider text-sm">Status</th>
                                    <th className="p-8 text-left font-bold text-slate-300 uppercase tracking-wider text-sm">Created</th>
                                    <th className="p-8 text-left font-bold text-slate-300 uppercase tracking-wider text-sm">Proposals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rfpsHistory.map((rfp) => (
                                    <tr
                                        key={rfp.id}
                                        className="border-b border-slate-700/50 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all cursor-pointer group hover:border-indigo-500/30"
                                        onClick={() => onSelectRfp(rfp)}
                                    >
                                        <td className="p-8 group-hover:text-indigo-300">
                                            <div className="font-black text-xl text-slate-100 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent">
                                                {rfp.title}
                                            </div>
                                            <div className="text-sm text-slate-500 mt-2 max-w-md line-clamp-2">
                                                {rfp.description || rfp.naturalLanguageRequest}
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="font-mono text-2xl text-emerald-400 font-black">
                                                {rfp.budget ? `$${rfp.budget.toLocaleString()}` : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="p-8">
                                            <StatusBadge status={rfp.status} />
                                        </td>
                                        <td className="p-8 font-mono text-slate-400 text-lg">
                                            {rfp.createdAt ? new Date(rfp.createdAt).toLocaleDateString() : 'Recent'}
                                        </td>
                                        <td className="p-8">
                                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-400 px-6 py-3 rounded-2xl text-lg font-bold border border-emerald-500/30 shadow-lg">
                                                {rfp.proposalsReceived || 0}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {rfpsHistory.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="p-20 text-center">
                                            <div className="w-24 h-24 bg-slate-800/50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-2xl font-bold text-slate-400 mb-2">No RFPs found</p>
                                            <p className="text-slate-500">Create your first RFP to get started</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RfpsHistoryList;
