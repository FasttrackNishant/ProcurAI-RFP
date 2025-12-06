import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import InputArea from './rfp/InputArea';
import RfpDetails from './rfp/RfpDetails';
import VendorsSection from './rfp/VendorsSection';
import { api } from '../../apis/api';

export default function RfpWorkspace() {
	const [vendors, setVendors] = useState([]);
	const [inputText, setInputText] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);
	const [rfpData, setRfpData] = useState(null);
	const [step, setStep] = useState('input');

	const navigate = useNavigate();

	// Load vendors on mount so VendorsSection has data immediately
	useEffect(() => {
		loadVendors();
	}, []);

	async function loadVendors() {
		try {
			const data = await api.getVendors();
			setVendors(Array.isArray(data) ? data : []);
		} catch (err) {
			toast.error(err?.message || 'Failed to load vendors');
		}
	}

	// Generate RFP: call API, show toasts, set preview
	const handleGenerateRfp = async () => {
		if (!inputText.trim()) {
			toast.error('Please enter a prompt to generate the RFP.');
			return;
		}

		try {
			setIsGenerating(true);
			setStep('generating');

			const created = await api.createRfpFromText(inputText);
			console.log('created rfp:', created);

			setRfpData(created);
			setStep('preview');
			toast.success('RFP generated successfully');

			// refresh vendors (if RFP generation returned suggested vendors saved into DB)
			await loadVendors();

			// if backend returned an id you could navigate — currently we keep preview
			if (created && (created._id || created.id)) {
				const id = created._id || created.id;
				// if you want to navigate to canonical RFP page, uncomment:
				// navigate(`/rfps/${id}`);
				// otherwise just keep preview open
				return;
			}
		} catch (err) {
			console.error('Error generating RFP:', err);
			toast.error(err?.message || 'Failed to generate RFP. Try again.');
			setStep('input');
		} finally {
			setIsGenerating(false);
		}
	};

	const handleNewRfp = () => {
		setInputText('');
		setRfpData(null);
		setStep('input');
	};

	// Called when VendorsSection successfully sends RFP to vendors
	const handleVendorsSent = async ({ rfpId, vendorIds } = {}) => {
		const created = await api.getRfp(rfpData?._id);
		console.log('created rfp:', created);
		setRfpData(created);
		await loadVendors();
	};

	return (
		<div className="flex w-full flex-col gap-6 p-4 md:p-8 min-h-screen">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="text-3xl font-extrabold bg-gradient-to-r from-slate-100 to-indigo-200 bg-clip-text text-transparent tracking-tight">
						Create RFP
					</h1>
					<p className="text-md text-slate-400 font-medium">
						Describe your procurement needs in natural language
					</p>
				</div>
				{rfpData && (
					<button
						onClick={handleNewRfp}
						className="rounded-lg bg-slate-800 px-4 py-1.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors">
						+ New RFP
					</button>
				)}
			</div>

			{/* Prompt */}
			<div className="w-full max-w-full">
				<InputArea
					inputText={inputText}
					onInputChange={setInputText}
					onGenerate={handleGenerateRfp}
					isGenerating={isGenerating}
					step={step}
				/>
			</div>

			{/* Details scrollable */}
			{step === 'preview' && rfpData && (
				<div className="flex flex-col gap-6 max-w-full">
					<RfpDetails rfpData={rfpData} />

					{/* Pass vendors + rfpId to VendorsSection so it can call api.sendRfpToVendors */}
					<VendorsSection
						vendors={vendors}
						rfpId={rfpData?._id || rfpData?.id}
						onSent={handleVendorsSent}
					/>

					{/* If you want proposals shown under vendors */}
					{/* <ProposalsSection proposals={rfpData.proposals || []} /> */}
				</div>
			)}
		</div>
	);
}
