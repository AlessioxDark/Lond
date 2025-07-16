import { motion } from 'framer-motion';
import { Bookmark, Heart, Share } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { cardVariants, handleDoubleTapImgs } from '../funcs/HomeFuncs';
import PostHeader from '../PostHeader';
import ReactIcon from '../Reactions/ReactIcon';
import ReactionsBar from '../Reactions/ReactionsBar';
import SocialIcon from '../SocialIcon';
const InstagramPostDialog = ({ PostDialogData }) => {
	const [isComments, setIsComments] = useState(false); // Nuovo stato
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
	const [currentImgIndex, setCurrentImgIndex] = useState(0);
	const [isReposted, setIsReposted] = useState(false);
	return (
		<motion.div
			className={` group  w-[47.5%] justify-center flex flex-col static py-0 px-2`}
			role="article"
			aria-labelledby={`post-author`}
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			{/* Animated background patterns */}

			{/* Header */}

			<PostHeader
				handle={PostDialogData?.handle}
				isViral={PostDialogData?.isViral}
				pfp={PostDialogData?.pfp}
				name={PostDialogData?.name}
				createdAt={PostDialogData?.createdAt}
				isVerified={PostDialogData?.isVerified}
			/>
			<div className="z-10 flex flex-col gap-3">
				<div
					className=" relative aspect-square w-full "
					onDoubleClick={useCallback(
						(e) => {
							handleDoubleTapImgs(isLiked, setIsLiked, e);
						},
						[isLiked]
					)}
				>
					<div className="absolute top-4 right-4 z-30">
						<div className="bg-lond-dark/70 backdrop-blur-sm rounded-xl px-3 py-1 text-center">
							<span className="text-lond-text-primary text-sm font-lato">
								{currentImgIndex + 1}/3
							</span>
						</div>
					</div>

					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							if (currentImgIndex - 1 >= 0) {
								setCurrentImgIndex((prevIndex) => prevIndex - 1);
							}
						}}
						className="absolute top-1/2 left-2 z-30 w-10 h-10 bg-lond-dark/70 backdrop-blur-sm rounded-full flex items-center justify-center text-lond-text-primary hover:bg-lond-dark transition-all duration-300"
						disabled={currentImgIndex === 0}
					>
						<RiArrowLeftSLine className="w-6 h-6" />
					</motion.button>
					<div className="overflow-hidden rounded-2xl h-full w-auto shadow-2xl">
						<div
							className="flex transition-transform duration-300 ease-in-out h-full"
							style={{
								transform: `translateX(-${100 * currentImgIndex}%)`,
							}}
						>
							{PostDialogData?.images &&
								PostDialogData?.images.map((img, index) => (
									<img
										key={index}
										src={img}
										alt={`Post image ${index + 1}`}
										className="min-w-full h-full object-cover"
									/>
								))}
						</div>
					</div>
					<motion.button
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							if (currentImgIndex + 1 <= 2) {
								setCurrentImgIndex((prevIndex) => prevIndex + 1);
							}
						}}
						className="absolute top-1/2 right-2 z-30 w-10 h-10 bg-lond-dark/70 backdrop-blur-sm rounded-full flex items-center justify-center text-lond-text-primary hover:bg-lond-dark transition-all duration-300"
						disabled={currentImgIndex === 2}
					>
						<RiArrowRightSLine className="w-6 h-6" />
					</motion.button>
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
						<div className="flex gap-2">
							{PostDialogData?.images &&
								PostDialogData?.images.map((_, i) => (
									<button
										key={i}
										onClick={() => setCurrentImgIndex(i)}
										className={`w-2 h-2 rounded-full transition-all duration-300 ${
											i === currentImgIndex
												? 'bg-lond-accent w-6'
												: 'bg-lond-light-gray/50 hover:bg-lond-light-gray/80'
										}`}
									/>
								))}
						</div>
					</div>
				</div>
				<div className="w-full flex flex-row justify-between items-center">
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
					{/* Reactions Bar */}

					<div className="">
						<ReactionsBar reactions={reactions} />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default InstagramPostDialog;
