import React from 'react';
interface Reaction {
	emoji: string;
	count: number;
	label: string;
}
const ReactionsPopup = React.memo(
	({ reactions, onEmojiClick, userReaction }: any) => (
		<div
			className="absolute bg-slate-800/90 bottom-full left-0 mb-2 p-4  border border-slate-500/30 rounded-2xl shadow-2xl shadow-slate-900/60 z-50 min-w-max overflow-visible"
			onClick={() => {
				console.log('enter');
			}}
		>
			<div className="grid grid-cols-5 gap-2 overflow-visible">
				{reactions.map((reaction: Reaction, index: number) => (
					<button
						key={`popup-${reaction.emoji}-${index}`}
						onClick={() => onEmojiClick(reaction.emoji)}
						className={`
            p-2 rounded-xl transition-all duration-200 hover:scale-125 hover:bg-slate-700/50
            ${
							userReaction === reaction.emoji
								? 'bg-slate-800/50 ring-2 ring-slate-500 '
								: ''
						}
          `}
						title={reaction.label}
					>
						<span className="text-xl">{reaction.emoji}</span>
					</button>
				))}
			</div>
		</div>
		// <div
		// 	className="absolute bottom-full left-0 mb-2 p-4 bg-gradient-to-br from-slate-700/60 via-slate-800/70 to-slate-900/80 backdrop-blur-2xl border border-slate-400/30 rounded-2xl shadow-2xl shadow-slate-900/60 z-50 min-w-max"
		// 	onClick={() => {
		// 		console.log('enter');
		// 	}}
		// >
		// 	<div className="grid grid-cols-5 gap-2">
		// 		{reactions.map((reaction: Reaction, index: number) => (
		// 			<button
		// 				key={`popup-${reaction.emoji}-${index}`}
		// 				onClick={() => onEmojiClick(reaction.emoji)}
		// 				className={`
		//         p-2 rounded-xl transition-all duration-200 hover:scale-125 hover:bg-slate-700/50
		//         ${
		// 					userReaction === reaction.emoji
		// 						? 'bg-gradient-to-r from-slate-100/30 via-white/20 to-slate-200/25 ring-2 ring-slate-200/50'
		// 						: ''
		// 				}
		//       `}
		// 				title={reaction.label}
		// 			>
		// 				<span className="text-xl">{reaction.emoji}</span>
		// 			</button>
		// 		))}
		// 	</div>
		// </div>
	)
);
export default ReactionsPopup;
