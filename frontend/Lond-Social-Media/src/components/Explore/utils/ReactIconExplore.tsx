import { AnimatePresence, motion } from 'framer-motion';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import ReactionsPopup from '../../post/utils/Reactions/ReactionsPopup';
import { handleEmojiClick } from '../../post/utils/funcs/HomeFuncs';
interface reactIconExploreProps {
	setReactions: Function;
	setUserReaction: Function;
	userReaction: string;
	reactions: Array<object>;
}
const ReactIconExplore = ({
	userReaction,
	setUserReaction,
	setReactions,
	reactions,
}: reactIconExploreProps) => {
	const [showReactions, setShowReactions] = useState(false);
	return (
		<motion.div
			className="relative z-40"
			onClick={() => setShowReactions(!showReactions)}
			whileTap={{ scale: 0.9 }}
		>
			{userReaction ? (
				<span className="text-xs ">{userReaction}</span>
			) : (
				<Smile size={16} />
			)}

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
		</motion.div>
	);
};

export default ReactIconExplore;
