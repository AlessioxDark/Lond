import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import { useState } from 'react';
import {
	cardVariants,
	postContainerStyles,
} from '../../post/utils/funcs/HomeFuncs';
import PostHeader from '../../post/utils/PostHeader';
import ReactIcon from '../../post/utils/Reactions/ReactIcon';
import ReactionsBar from '../../post/utils/Reactions/ReactionsBar';
import SocialIcon from '../../post/utils/SocialIcon';
import ReactIconExplore from '../utils/ReactIconExplore';
import SocialIconExplore from '../utils/SocialIconExplore';
import SocialIconsExploreFullRow from '../utils/SocialIconsExploreFullRow';

// Enhanced interfaces
interface TwitterPostExploreProps {
	id: string;
	pfp: string;
	name: string;
	text: string;
	handle: string;
	createdAt: Date;
	isViral: boolean;
	isVerified: boolean;
	retweets: number;
	likes: number;
	saved: number;
}

interface Reaction {
	emoji: string;
	count: number;
	label: string;
}

// Main Enhanced TwitterPost Component
export default function TwitterPostExplore({
	id,
	pfp,
	name,
	text,
	handle,
	createdAt,
	isViral,
	isVerified,
	saved,
	retweets,
	likes,
}: TwitterPostExploreProps) {
	// State management

	const [isLiked, setIsLiked] = useState(false);
	const [isRetweeted, setIsRetweeted] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [isShared, setIsShared] = useState(false);
	const [userReaction, setUserReaction] = useState('');

	const [reactions, setReactions] = useState<Reaction[]>([
		{ emoji: '🔥', count: 23, label: 'Fantastico' },
		{ emoji: '💪', count: 15, label: 'Forte' },
		{ emoji: '👏', count: 8, label: 'Applausi' },
		{ emoji: '😍', count: 6, label: 'Amore' },
		{ emoji: '🚀', count: 4, label: 'Incredibile' },
		{ emoji: '💯', count: 3, label: 'Perfetto' },
		{ emoji: '⚡', count: 2, label: 'Energico' },
		{ emoji: '🎯', count: 1, label: 'Centrato' },
	]);

	return (
		<motion.article
			className={`
 relative group overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer backdrop-blur-sm p-4 hover:shadow-xl shadow-lg  hover:shadow-slate-900/25  bg-slate-800/90
			`}
			variants={cardVariants}
			role="article"
			aria-labelledby={`post-${id}-author`}
			animate="animate"
			initial="initial"
			whileHover={{ y: -2 }}
		>
			{/* Enhanced Header */}
			<motion.div className="relative z-10">
				<PostHeader
					size="sm"
					name={name}
					handle={handle}
					pfp={pfp}
					isViral={isViral}
					isVerified={isVerified}
					createdAt={createdAt}
				/>
			</motion.div>

			{/* Enhanced Content with media type indicator */}
			<motion.div className={`mb-2 relative z-10 opacity-100`}>
				<p className="text-slate-100 text-[0.80rem] leading-relaxed font-normal whitespace-pre-wrap tracking-wide">
					{text}
				</p>
			</motion.div>

			{/* Enhanced Views count with trend indicator */}

			{/* Enhanced Reactions Bar */}
			<motion.div className="mb-3 relative z-10">
				<ReactionsBar reactions={reactions} userReaction={userReaction} />
			</motion.div>

			{/* Enhanced Actions Bar */}
			<SocialIconsExploreFullRow
				isRetweeted={isRetweeted}
				setIsRetweeted={setIsRetweeted}
				isSaved={isSaved}
				setIsSaved={setIsSaved}
				isTwitter={true}
				isLiked={isLiked}
				setIsLiked={setIsLiked}
				reactions={reactions}
				setReactions={setReactions}
				userReaction={userReaction}
				setUserReaction={setUserReaction}
				isShared={isShared}
				setIsShared={setIsShared}
			/>
		</motion.article>
	);
}
