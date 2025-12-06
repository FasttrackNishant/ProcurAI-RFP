import { request } from "./apiconfig";

/**
 * API Services
 */
export const api = {
	// ---------- RFP ----------
	createRfpFromText: (text) =>
		request('/api/rfps/from-text', { method: 'POST', body: { text } }),

	getRfps: () => request('/api/rfps'),

	getRfpsHistory: () => request('/api/v2/rfps/history'),

	getRfpsFullDetails: (id) => request(`/api/v2/rfps/${id}/full`),

	getRfp: (id) => request(`/api/rfps/${id}`),

	getRfpsList: () => request('/api/v2/rfps/get/rfplist'),

	sendRfpToVendors: (rfpId, vendorIds) =>
		request(`/api/rfps/${rfpId}/send`, {
			method: 'POST',
			body: { vendorIds },
		}),

	getRfpComparison: (rfpId) =>
		request(`/api/rfps/${rfpId}/proposals/comparison`),

	// ---------- Vendors ----------
	getVendors: () => request('/api/vendors'),

	createVendor: (vendor) =>
		request('/api/vendors', { method: 'POST', body: vendor }),

	// ---------- Proposals ----------
	getProposals: (rfpId) =>
		request('/api/proposals', { query: rfpId ? { rfpId } : undefined }),

	createProposals: (rfpId, vendorId, text) =>
		request(`/api/proposals/createProposal`, {
			method: 'POST',
			body: { rfpId, vendorId, text },
		}),
};