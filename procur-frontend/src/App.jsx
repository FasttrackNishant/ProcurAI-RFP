import React, { useState } from 'react';
import Landing from './components/Landing';
import AppLayout from './components/AppLayout';
import RfpWorkspace from './components/workspace/RfpWorkspace';
import VendorsPage from './components/workspace/ vendors/VendorsPage';
import ProposalsPage from './components/workspace/proposals/ProposalsPage';
import RfpsPage from './components/workspace/history/RfpsPage';
import CreateProposalPage from './components/workspace/proposals/CreateProposalPage';

function PlaceholderContent({ title, description, icon }) {
	return (
		<div className="flex h-full flex-col items-center justify-center text-center">
			<div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-500/20 text-3xl">
				{icon}
			</div>
			<div className="max-w-md space-y-4">
				<h2 className="text-4xl font-black text-slate-100 tracking-tight">
					{title}
				</h2>
				<p className="text-xl text-slate-400 leading-relaxed">
					{description}
				</p>
				<div className="rounded-2xl bg-slate-900/50 p-6 text-sm text-slate-500 font-mono border border-slate-800/50">
					Coming next: Detailed UI for {title.toLowerCase()}
				</div>
			</div>
		</div>
	);
}

function App() {
	const [mode, setMode] = useState('landing'); // 'landing' | 'app'
	const [activeTab, setActiveTab] = useState('rfps');

	if (mode === 'landing') {
		return <Landing onGetStarted={() => setMode('app')} />;
	}

	let content = null;
	switch (activeTab) {
		case 'rfps':
			content = <RfpWorkspace />;
			break;

		case 'vendors':
			content = <VendorsPage/>
			break;
		case 'proposals':
			content = <ProposalsPage/>
			break;
    case 'rfpsHistory':
      content = <RfpsPage/>
      break;
	
	case 'createProposal':
			content = <CreateProposalPage/>
			break;
		default:
			content = (
				<PlaceholderContent
					title="Welcome"
					description="Select a tab to get started"
					icon="🚀"
				/>
			);
	}

	return (
		<AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
			{content}
		</AppLayout>
	);
}

export default App;
