import React, { useEffect, useMemo, useState } from 'react';
import ReactionsDialog from './ReactionsDialog';
interface reactionsBarProps {
	reactions: Array<object>;
}

interface Reaction {
	emoji: string;
	count: number;
	label: string;
}

const ReactionsBar = React.memo(({ reactions, userReaction }: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const totalReactions = useMemo(
		() => reactions.reduce((sum: number, r: Reaction) => sum + r.count, 0),
		[reactions]
	);

	const topReactions = useMemo(() => reactions.slice(0, 5), [reactions]);

	if (totalReactions === 0) return null;

	return (
		<div
			className=" flex items-center gap-3  flex-wrap"
			onClick={() => {
				setIsOpen(true);
			}}
		>
			<div className="flex items-center -space-x-1">
				{topReactions.map((reaction: Reaction, index: number) => (
					<div
						key={`${reaction.emoji}-${index}`}
						className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs border border-slate-600 transition-transform cursor-pointer"
						title={`${reaction.count} ${reaction.label}`}
					>
						{reaction.emoji}
					</div>
				))}
			</div>

			<span className="text-slate-400 text-sm hover:text-white transition-all duration-300">
				{userReaction && <span className="text-slate-300">Tu</span>}
				{userReaction && totalReactions > 1 && <span> e </span>}
				{totalReactions > (userReaction ? 1 : 0) && (
					<span>
						{totalReactions - (userReaction ? 1 : 0)}{' '}
						{totalReactions === 1 ? 'persona' : 'persone'}
					</span>
				)}
				{totalReactions > 0 && <span> hanno reagito</span>}
			</span>

			<ReactionsDialog
				isOpen={isOpen}
				onClose={(e) => {
					e.stopPropagation();
					setIsOpen(false);
				}}
			/>
		</div>
	);
});
export default ReactionsBar;
