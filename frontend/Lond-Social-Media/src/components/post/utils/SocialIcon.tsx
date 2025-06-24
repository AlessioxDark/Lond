const SocialIcon = ({ icon: Icon, isActive, onClick, count }) => (
	// <button
	// 	onClick={onClick}
	// 	className={`
	//     group relative flex items-center gap-2 px-3.5 py-2.5 rounded-3xl
	//      transition-all duration-300 ease-out transform

	//     ${
	// 			isActive
	// 				? 'text-white bg-slate-200/20   '
	// 				: 'text-slate-200 hover:text-white  hover:bg-white/10   '
	// 		}
	//   `}
	// >
	// 	<Icon size={16} className="transition-transform" />
	// 	<span className="text-xs font-semibold tracking-wide">{count}</span>
	// 	{isActive && <div className="absolute inset-0 rounded-xl  -z-10" />}
	// </button>

	<button
		onClick={onClick}
		className={`
    group relative flex items-center gap-2 px-3.5 py-2.5 rounded-3xl
    transition-all duration-300 ease-out transform
    ${
			isActive
				? 'text-slate-100 bg-slate-500/50 '
				: 'text-slate-400 hover:text-white hover:bg-slate-800/60  '
		}
  `}
	>
		<Icon size={16} className="transition-transform" />
		<span className="text-xs font-semibold tracking-wide">{count}</span>
		{isActive && (
			<div className="absolute inset-0 rounded-xl -z-10 animate-pulse" />
		)}
	</button>
);
export default SocialIcon;
