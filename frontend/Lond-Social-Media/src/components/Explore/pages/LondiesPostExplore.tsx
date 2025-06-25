import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { useState } from 'react';
import pfp from '../../../assets/pfp.png';
import PostHeader from '../../post/utils/PostHeader';
import ReactionsBar from '../../post/utils/Reactions/ReactionsBar';
import LondiesPlayerExplore from '../utils/LondiesPlayerExplore';
import ReactIconExplore from '../utils/ReactIconExplore';
import SocialIconExplore from '../utils/SocialIconExplore';
import SocialIconsExploreFullRow from '../utils/SocialIconsExploreFullRow';
interface LondiesPostProps {
	post: any;
}
const LondiesPostExplore = ({
	pfp,
	comments,
	images,
	title,
	isViral,
	isVerified,
	repost,
	name,
	likes,
	saved,
	desc,
	handle,
	createdAt,
}: any) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isComments, setIsComments] = useState(false);
	const [isShared, setIsShared] = useState(false);

	const [isSaved, setIsSaved] = useState(false);
	const [userReaction, setUserReaction] = useState('');

	const [reactions, setReactions] = useState([
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
		<motion.div
			className="relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-xl shadow-lg  hover:shadow-slate-900/25   bg-slate-800/90 p-4"
			whileHover={{ y: -2 }}
		>
			<PostHeader
				size="sm"
				createdAt={new Date()}
				name={name}
				pfp={pfp}
				isVerified={isVerified}
				handle={handle}
				isViral={isViral}
			/>
			<div className=" mb-3">
				<LondiesPlayerExplore isLiked={isLiked} setIsLiked={setIsLiked} />
			</div>
			<div className="mb-3">
				<ReactionsBar reactions={reactions} />
			</div>
			<div className="mb-3">
				<h4 className="text-slate-100 font-medium text-sm mb-1">{title}</h4>
				<p className="text-xs text-slate-200">{desc}</p>
			</div>
			<SocialIconsExploreFullRow
				isComments={isComments}
				setIsComments={setIsComments}
				isSaved={isSaved}
				setIsSaved={setIsSaved}
				isLiked={isLiked}
				setIsLiked={setIsLiked}
				reactions={reactions}
				setReactions={setReactions}
				userReaction={userReaction}
				setUserReaction={setUserReaction}
				isShared={isShared}
				setIsShared={setIsShared}
			/>
		</motion.div>
	);
};

export default LondiesPostExplore;
