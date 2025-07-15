import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share, X } from 'lucide-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import {
	cardVariants,
	handleDoubleTapImgs,
	postContainerStyles,
} from '../../post/utils/funcs/HomeFuncs';
import PostComments from '../../post/utils/PostComments';
import PostHeader from '../../post/utils/PostHeader';
import ReactIcon from '../../post/utils/Reactions/ReactIcon';
import ReactionsBar from '../../post/utils/Reactions/ReactionsBar';
import SocialIcon from '../../post/utils/SocialIcon';
const PostDialog = ({ isOpen, onClose, PostDialogData }) => {
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
		<Transition show={isOpen} as={Fragment}>
			<Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-hidden">
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 flex items-center justify-center p-4">
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="bg-lond-gray rounded-lg shadow-2xl w-[70vw]  flex flex-col z-40">
							<div className="flex items-center justify-between px-5 py-3 border-b border-lond-gray">
								<h1 className="text-xl font-bold text-lond-text-primary font-montserrat">
									Reactions
								</h1>
								<button
									onClick={onClose}
									className="text-lond-light-gray hover:text-lond-text-primary transition-colors p-1"
								>
									<X size={25} />
								</button>
							</div>
							<div className="flex flex-row h-[90vh]">
								<motion.div
									className={` ${postContainerStyles} w-[47.5%] justify-center flex flex-col static py-0  p-0 `}
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
								<PostComments />
							</div>
						</div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default PostDialog;
