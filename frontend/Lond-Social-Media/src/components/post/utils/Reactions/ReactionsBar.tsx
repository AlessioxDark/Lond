import React, { useEffect, useMemo, useState } from 'react';
import ReactionsDialog from './ReactionsDialog';
interface reactionsBarProps {
	reactions: Array<object>;
}

interface Reaction {
	emoji: string;
	count: number;
	label: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ReactionsBar = React.memo(({ reactions, userReaction }: any) => {
	const sizeConfig = {
		sm: {
			container: 'gap-2 mb-3',
			avatar: 'w-8 h-8',
			nameText: 'text-sm font-semibold',
			handleText: 'text-xs',
			verifiedIcon: 14,
			trendingIcon: 10,
			viralPadding: 'px-1.5 py-0.5',
			viralText: 'text-xs',
			moreIcon: 16,
			buttonPadding: 'p-1.5',
		},
		md: {
			container: 'gap-3 mb-4',
			avatar: 'w-11 h-11',
			nameText: 'text-base font-bold',
			handleText: 'text-sm',
			verifiedIcon: 16,
			trendingIcon: 12,
			viralPadding: 'px-2 py-0.5',
			viralText: 'text-xs',
			moreIcon: 18,
			buttonPadding: 'p-2',
		},
		lg: {
			container: 'gap-4 mb-5',
			avatar: 'w-14 h-14',
			nameText: 'text-lg font-bold',
			handleText: 'text-base',
			verifiedIcon: 18,
			trendingIcon: 14,
			viralPadding: 'px-3 py-1',
			viralText: 'text-sm',
			moreIcon: 20,
			buttonPadding: 'p-2.5',
		},
		xl: {
			container: 'gap-5 mb-6',
			avatar: 'w-16 h-16',
			nameText: 'text-xl font-bold',
			handleText: 'text-lg',
			verifiedIcon: 20,
			trendingIcon: 16,
			viralPadding: 'px-4 py-1.5',
			viralText: 'text-sm',
			moreIcon: 22,
			buttonPadding: 'p-3',
		},
	};

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
