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
    group relative flex items-center gap-2 px-3 py-2 rounded-full
    transition-all duration-300 ease-out transform font-barlow
    ${
			isActive
				? 'text-lond-accent bg-lond-accent/20'
				: 'text-lond-light-gray hover:text-lond-accent hover:bg-lond-accent/10'
		}
  `}
	>
		<Icon size={16} className="transition-transform" />
		<span className="text-xs font-semibold tracking-wide">{count}</span>
		{/* isActive && (
			<div className="absolute inset-0 rounded-full -z-10 bg-lond-accent/10" />
		)*/}
	</button>
);
export default SocialIcon;
