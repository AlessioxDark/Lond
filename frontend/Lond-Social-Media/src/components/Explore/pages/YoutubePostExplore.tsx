import { motion } from 'framer-motion';
import {
	Bookmark,
	Bubbles,
	Eye,
	Heart,
	MessageCircle,
	Play,
	Repeat2,
	Share,
} from 'lucide-react';
import { useState } from 'react';
import videoEx from '../../../assets/videoEx.mp4';
import PostHeader from '../../post/utils/PostHeader';
import ReactionsBar from '../../post/utils/Reactions/ReactionsBar';
import ReactIconExplore from '../utils/ReactIconExplore';
import SocialIconExplore from '../utils/SocialIconExplore';
import SocialIconsExploreFullRow from '../utils/SocialIconsExploreFullRow';
import VideoPlayerExplore from '../utils/VideoPlayerExplore';
interface YoutubePostExploreProps {
	name: string;
	pfp: string;
	title: string;
	desc: string;
	likes: number;
	comments: number;
	saved: number;
	createdAt: Date;
	repost: number;
	isViral: boolean;
	isVerified: boolean;
	handle: string;
}

export default function YoutubePostExplore({
	name,
	pfp,
	title,
	desc,
	likes,
	comments,
	handle,
	isViral,
	isVerified,
}: YoutubePostExploreProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [isComments, setIsComments] = useState(false);
	const [isShared, setIsShared] = useState(false);
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
			className="relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-sm bg-lond-gray"
			whileHover={{ y: -2 }}
			layout
		>
			{/* Thumbnail con overlay */}
			<VideoPlayerExplore isLiked={false} setIsLiked={() => {}} src={videoEx} />

			{/* Content */}
			<div className="p-4">
				{/* Header con avatar e nome */}

				<PostHeader
					createdAt={new Date()}
					name={name}
					pfp={pfp}
					isVerified={false}
					handle={handle}
					isViral={false}
					size={'sm'}
				/>

				{/* Titolo */}
				<h4 className="text-lond-text-primary font-semibold text-sm mb-2 line-clamp-2 leading-tight">
					{title}
				</h4>

				{/* Descrizione (solo prime righe) */}
				<p className="text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed">
					{desc}
				</p>
				<div className="mb-3">
					<ReactionsBar reactions={reactions} />
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
			</div>

			{/* Hover overlay con azioni rapide */}
		</motion.div>
	);
}
