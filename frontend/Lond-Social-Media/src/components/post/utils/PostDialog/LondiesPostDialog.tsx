import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import React, { useState } from 'react';
import LondiesPlayer from '../LondiesPlayer';
import PostHeader from '../PostHeader';
import ReactIcon from '../Reactions/ReactIcon';
import ReactionsBar from '../Reactions/ReactionsBar';
import SocialIcon from '../SocialIcon';
import { cardVariants } from '../funcs/HomeFuncs';
const LondiesPostDialog = ({ PostDialogData }) => {
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
			className={`
        w-[50%] pt-2`}
			role="article"
			aria-labelledby={`post-author`}
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			<PostHeader
				handle={PostDialogData?.handle}
				isViral={PostDialogData?.isViral}
				pfp={PostDialogData?.pfp}
				name={PostDialogData?.name}
				createdAt={PostDialogData?.createdAt}
				isVerified={PostDialogData?.isVerified}
			/>

			<div className="flex gap-3 items-center flex-col">
				<div className="w-[90%] ">
					<LondiesPlayer isLiked={isLiked} setIsLiked={setIsLiked} />
				</div>
				<div className="w-[90%] flex flex-col gap-3">
					<div className="w-full flex justify-between items-center">
						<div className="flex items-center gap-3  flex-wrap ">
							<SocialIcon
								icon={Heart}
								isActive={isLiked}
								onClick={() => setIsLiked(!isLiked)}
								count={PostDialogData?.likes}
							/>

							<SocialIcon
								icon={Bookmark}
								isActive={isSaved}
								onClick={() => setIsSaved(!isSaved)}
								count={PostDialogData?.saved}
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
								count={PostDialogData?.repost}
							/>
						</div>
						<div className="">
							<ReactionsBar reactions={reactions} />
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default LondiesPostDialog;
