import React from 'react';

const TABS = [
	{ id: 'rfps', label: 'RFPs', icon: '📄' },
	{ id: 'vendors', label: 'Vendors', icon: '👥' },
	{ id: 'rfpsHistory', label: 'RFP History', icon: '🕘' },
	{ id: 'proposals', label: 'Proposals', icon: '📧' },
	{ id: 'createProposal', label: 'Create Proposal', icon: '📝' },
];

function AppLayout({ activeTab, onTabChange, children }) {
	return (
		<div className="flex h-screen w-full flex-col bg-gradient-to-br from-slate-950 to-indigo-950 text-slate-50 font-[Inter] overflow-hidden">
			{/* Top Navigation Bar */}
			<header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md px-8 shadow-sm">
				<div className="flex items-center gap-4">
					<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-xl font-black shadow-lg">
						<img
							src="/logo.png"
							alt="ProcurAI Logo"
							className="h-10 w-10 rounded-2xl object-cover shadow-lg"
						/>
					</div>
					<div>
						<h1 className="text-xl font-black tracking-tight text-white">
							ProcurAI Workspace
						</h1>
						<p className="text-xs text-indigo-400 font-light">
							AI-powered RFP management
						</p>
					</div>
				</div>
			</header>

			{/* Tab Navigation */}
			<div className="flex h-14 shrink-0 items-center border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md px-8">
				<div className="flex gap-1">
					{TABS.map((tab) => (
						<button
							key={tab.id}
							onClick={() => onTabChange(tab.id)}
							className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
								activeTab === tab.id
									? 'bg-indigo-500/20 text-indigo-200 shadow-lg shadow-indigo-500/20 border border-indigo-500/30'
									: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
							}`}>
							<span>{tab.icon}</span>
							<span>{tab.label}</span>
						</button>
					))}
				</div>
			</div>

			{/* Main Content Area */}
			<main className="flex-1 overflow-hidden">
				<div className="h-full w-full bg-slate-950/50 backdrop-blur-sm p-8 overflow-y-auto">
					{children}
				</div>
			</main>

			{/* Fixed Footer */}
			<footer className="flex h-12 shrink-0 items-center justify-center border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md text-xs text-indigo-400 font-light">
				<div className="rounded-lg bg-slate-900/70 px-4 py-1.5 backdrop-blur-md shadow-md">
					Made with <span className="text-red-500 font-bold">♥</span>{' '}
					by devnishant
				</div>
			</footer>
		</div>
	);
}

export default AppLayout;
