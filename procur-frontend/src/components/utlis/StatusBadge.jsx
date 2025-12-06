const STATUS_CONFIG = {
	draft: {
		label: 'Draft',
		dot: 'bg-yellow-400',
		bg: 'bg-yellow-500/10',
		text: 'text-yellow-300',
	},
	sent: {
		label: 'Sent',
		dot: 'bg-emerald-400',
		bg: 'bg-emerald-500/10',
		text: 'text-emerald-300',
	},
	closed: {
		label: 'Closed',
		dot: 'bg-slate-400',
		bg: 'bg-slate-600/10',
		text: 'text-slate-300',
	},
};


export const StatusBadge = ({status}) => {
  const styles = {
		draft: {
			bg: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
			dot: 'bg-yellow-400',
			label: 'Draft',
		},
		sent: {
			bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
			dot: 'bg-emerald-400',
			label: 'Sent',
		},
		closed: {
			bg: 'bg-slate-500/10 border-slate-500/20 text-slate-300',
			dot: 'bg-slate-400',
			label: 'Closed',
		},
	};

	const s = styles[status] || styles.closed;

	return (
		<span
			className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${s.bg} ${s.text} select-none`}>
			<span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
			{s.label}
		</span>
	);
}

