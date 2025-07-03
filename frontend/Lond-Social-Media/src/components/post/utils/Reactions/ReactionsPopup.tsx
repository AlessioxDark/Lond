import React from 'react';
interface Reaction {
	emoji: string;
	count: number;
	label: string;
}
const ReactionsPopup = React.memo(
	({ reactions, onEmojiClick, userReaction }: any) => (
		<div
			className="absolute bg-lond-gray bottom-full left-0 mb-2 p-4  border border-lond-dark rounded-2xl shadow-2xl shadow-lond-dark z-50 min-w-max overflow-visible"
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
            p-2 rounded-xl transition-all duration-200 hover:scale-115 hover:bg-lond-accent-hover
            ${
							userReaction === reaction.emoji
								? 'bg-lond-accent ring-2 ring-lond-dark '
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
	)
);
export default ReactionsPopup;
