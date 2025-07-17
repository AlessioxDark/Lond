import { motion } from 'framer-motion';
import { Bookmark, Heart, Share } from 'lucide-react';
import { useCallback, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import videoEx from '../../../../assets/videoEx2.mp4';
import { cardVariants, handleDoubleTapImgs } from '../funcs/HomeFuncs';
import PostHeader from '../PostHeader';
import ReactIcon from '../Reactions/ReactIcon';
import ReactionsBar from '../Reactions/ReactionsBar';
import SocialIcon from '../SocialIcon';
import VideoPlayer from '../VideoPlayer';
const YoutubePostDialog = ({ PostDialogData }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [reactions, setReactions] = useState([
		{ emoji: '🎈', count: 10 },
		{ emoji: '🎍', count: 3 },
		{ emoji: '🎭', count: 5 },
		{ emoji: '🌟', count: 8 },
		{ emoji: '💎', count: 6 },
	]);
	const [userReaction, setUserReaction] = useState('');
	const [isReposted, setIsReposted] = useState(false);
	return (
		<motion.div
			className={` group  w-[47.5%] justify-center flex flex-col static py-0 px-2 `}
			role="article"
			aria-labelledby={`post-author`}
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			{/* Header */}
			<PostHeader
				handle={PostDialogData?.handle}
				isViral={PostDialogData?.isViral}
				pfp={PostDialogData?.pfp}
				name={PostDialogData?.name}
				createdAt={PostDialogData?.createdAt}
				isVerified={PostDialogData?.isVerified}
			/>

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

				<ReactionsBar reactions={reactions} />
			</div>
			{/* Comments Section */}
		</motion.div>
	);
};

export default YoutubePostDialog;
