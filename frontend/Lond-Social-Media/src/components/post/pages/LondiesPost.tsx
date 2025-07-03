import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import React, { useState } from 'react';
import LondiesPlayer from '../utils/LondiesPlayer';
import PostComments from '../utils/PostComments';
import PostHeader from '../utils/PostHeader';
import ReactIcon from '../utils/Reactions/ReactIcon';
import ReactionsBar from '../utils/Reactions/ReactionsBar';
import SocialIcon from '../utils/SocialIcon';
import { cardVariants, postContainerStyles } from '../utils/funcs/HomeFuncs';

interface LondiesPostProps {
	name: string;
	title: string;
	likes: number;
	desc: string;
	comments: number;
	saved: number;
	pfp: string;
	handle: string;
	createdAt: Date;
	repost: number;
	isVerified: boolean;
	isViral: boolean;
}
const LondiesPost = ({
	name,
	desc,
	pfp,
	title,
	likes,
	repost,
	comments,
	isVerified,
	saved,
	handle,
	isViral,
	createdAt,
}: LondiesPostProps) => {
	const [userReaction, setUserReaction] = useState('');
	const [isReposted, setIsReposted] = useState(false);
	const [isComments, setIsComments] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
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

	return (
		<motion.div
			className={`${postContainerStyles}
        w-[65%]`}
			role="article"
			aria-labelledby={`post-author`}
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			<PostHeader
				handle={handle}
				isViral={isViral}
				name={name}
				pfp={pfp}
				createdAt={createdAt}
				isVerified={isVerified}
			/>

			<div className="flex gap-3 items-start flex-col  mb-2">
				<LondiesPlayer isLiked={isLiked} setIsLiked={setIsLiked} />
				<div className="w-full flex flex-col mb-3 gap-3">
					<div className="w-full flex justify-between items-center">
						<div className="flex items-center gap-3  flex-wrap ">
							<SocialIcon
								icon={Heart}
								isActive={isLiked}
								onClick={() => setIsLiked(!isLiked)}
								count={likes}
							/>

							<SocialIcon
								icon={MessageCircle}
								isActive={isComments}
								onClick={() => setIsComments(!isComments)}
								count={comments}
							/>
							<SocialIcon
								icon={Bookmark}
								isActive={isSaved}
								onClick={() => setIsSaved(!isSaved)}
								count={saved}
							/>

							<ReactIcon
								userReaction={userReaction}
								setReactions={setReactions}
								setUserReaction={setUserReaction}
								reactions={reactions}
							/>
							<SocialIcon
								icon={Share}
								isActive={isReposted}
								onClick={() => setIsReposted(!isReposted)}
								count={repost}
							/>
						</div>
						<div className="">
							<ReactionsBar reactions={reactions} />
						</div>
					</div>

					<div className="">
						<h2 className="text-2xl font-black font-montserrat text-[var(--color-lond-text-primary)] mb-2">
							{title}
						</h2>
						<p className="text-[var(--color-lond-text-primary)] text-md leading-relaxed font-light font-lato">
							{desc}
						</p>
					</div>
				</div>
				<div className="w-full">
					<AnimatePresence>
						{isComments && <PostComments height="48rem" />}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};

export default LondiesPost;
