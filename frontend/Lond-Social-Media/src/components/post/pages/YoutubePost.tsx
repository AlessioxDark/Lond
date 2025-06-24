import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { useState } from 'react';
import videoEx from '../../../assets/videoEx2.mp4';
import PostComments from '../utils/PostComments';
import PostHeader from '../utils/PostHeader';
import ReactIcon from '../utils/Reactions/ReactIcon';
import ReactionsBar from '../utils/Reactions/ReactionsBar';
import SocialIcon from '../utils/SocialIcon';
import VideoPlayer from '../utils/VideoPlayer';
import { cardVariants, postContainerStyles } from '../utils/funcs/HomeFuncs';

interface YoutubePost {
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
export default function YoutubePost({
	name,
	pfp,
	title,
	desc,
	likes,
	comments,
	saved,
	handle,
	repost,
	createdAt,
	isVerified,
	isViral,
}: YoutubePost) {
	const [isLiked, setIsLiked] = useState(false);
	const [isComments, setIsComments] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [isReposted, setIsReposted] = useState(false);
	const [reactions, setReactions] = useState([
		{ emoji: '🎈', count: 10 },
		{ emoji: '🎍', count: 3 },
		{ emoji: '🎭', count: 5 },
		{ emoji: '🎈', count: 10 },
		{ emoji: '🎍', count: 3 },
		{ emoji: '🎭', count: 5 },
		{ emoji: '🎈', count: 10 },
		{ emoji: '🎍', count: 3 },
		{ emoji: '🎭', count: 5 },
		{ emoji: '🎈', count: 10 },
		{ emoji: '🎍', count: 3 },
		{ emoji: '🎭', count: 5 },
	]);
	const [userReaction, setUserReaction] = useState('');

	return (
		<motion.div
			className={`${postContainerStyles}`}
			role="article"
			aria-labelledby={`post-author`}
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			{/* Header */}
			<PostHeader
				name={name}
				pfp={pfp}
				isViral={isViral}
				handle={handle}
				createdAt={createdAt}
				isVerified={isVerified}
			/>

			{/* Title and Description */}
			<div className="mb-6">
				<h2 className="text-2xl font-black font-Montserrat text-white mb-2">
					{title}
				</h2>
				<p className="text-neutral-300 text-md leading-relaxed font-light font-Lato">
					{desc}
				</p>
			</div>

			{/* Video Player */}
			<div className="mb-6">
				<VideoPlayer src={videoEx} isLiked={isLiked} setIsLiked={setIsLiked} />
			</div>

			{/* Actions Row */}
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-3 flex-wrap">
					<SocialIcon
						icon={Heart}
						isActive={isLiked}
						onClick={() => setIsLiked(!isLiked)}
						count={likes}
					/>
					<SocialIcon
						icon={Share}
						isActive={isReposted}
						onClick={() => setIsReposted(!isReposted)}
						count={repost}
					/>
					<SocialIcon
						icon={Bookmark}
						isActive={isSaved}
						onClick={() => setIsSaved(!isSaved)}
						count={saved}
					/>
					<SocialIcon
						icon={MessageCircle}
						isActive={isComments}
						onClick={() => setIsComments(!isComments)}
						count={comments}
					/>

					<ReactIcon
						userReaction={userReaction}
						setReactions={setReactions}
						setUserReaction={setUserReaction}
						reactions={reactions}
					/>
				</div>

				<ReactionsBar reactions={reactions} />
			</div>

			{/* Comments Section */}
			<AnimatePresence>
				{isComments && <PostComments height="48rem" />}
			</AnimatePresence>
		</motion.div>
	);
}
