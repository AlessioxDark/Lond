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
           group/ReactIcon relative flex items-center gap-2 px-3 py-2 rounded-full           
          transition-all duration-300 ease-out transform font-barlow
					${
						userReaction
							? 'bg-lond-accent/80' // Sfondo per stato attivo (reazione utente presente)
							: 'hover:bg-lond-accent/10' // Sfondo hover per stato inattivo
					}
				`}
			>
				{userReaction ? (
					<span className="text-base text-lond-accent">{userReaction}</span>
				) : (
					<Smile
						size={22}
						className="text-lond-light-gray group-hover/ReactIcon:text-lond-accent"
					/>
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
