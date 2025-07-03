import { AnimatePresence, motion } from 'framer-motion';
import { Smile } from 'lucide-react';
import React, { useState } from 'react';
import { handleEmojiClick } from '../funcs/HomeFuncs';
import ReactionsPopup from './ReactionsPopup';
interface ReactIconProps {
	setReactions: Function;
	setUserReaction: Function;
	userReaction: string;
	reactions: Array<object>;
}
const ReactIcon = ({
	userReaction,
	setUserReaction,
	setReactions,
	reactions,
}: ReactIconProps) => {
	const [showReactions, setShowReactions] = useState(false);

	return (
		<div className="relative z-40">
			<motion.button
				onClick={() => setShowReactions(!showReactions)}
				whileTap={{ scale: 0.9 }}
				className={`
									flex items-center gap-2 px-4 py-2.5 rounded-3xl
								transition-all duration-300
									${userReaction && 'text-lond-text-primary bg-lond-accent '}
								`}
			>
				{userReaction ? (
					<span className="text-sm">{userReaction}</span>
				) : (
					<Smile size={23} />
				)}
			</motion.button>

			<AnimatePresence>
				{showReactions && (
					<ReactionsPopup
						reactions={reactions}
						onEmojiClick={(e) => {
							handleEmojiClick(
								e,
								userReaction,
								setUserReaction,
								setReactions,
								setShowReactions
							);
						}}
						userReaction={userReaction}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ReactIcon;
