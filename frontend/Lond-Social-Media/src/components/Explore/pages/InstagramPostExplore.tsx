import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { useCallback, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import pfp from '../../../assets/pfp.png';
import { handleDoubleTapImgs } from '../../post/utils/funcs/HomeFuncs';
import PostHeader from '../../post/utils/PostHeader';
import ReactionsBar from '../../post/utils/Reactions/ReactionsBar';
import ReactIconExplore from '../utils/ReactIconExplore';
import SocialIconExplore from '../utils/SocialIconExplore';
import SocialIconsExploreFullRow from '../utils/SocialIconsExploreFullRow';
interface InstagramPostExploreProps {
	post: any;
}

export default function InstagramPostExplore({
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
}: any) {
	const [isLiked, setIsLiked] = useState(false);
	const [isComments, setIsComments] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [userReaction, setUserReaction] = useState('');
	const [currentImgIndex, setCurrentImgIndex] = useState(0);
	const [isShared, setIsShared] = useState(false);

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

			<div
				className=" relative aspect-square w-full mb-3 "
				onDoubleClick={useCallback(
					(e) => {
						handleDoubleTapImgs(isLiked, setIsLiked, e);
					},
					[isLiked]
				)}
			>
				{/* Image counter */}
				<div className="absolute top-4 right-4 z-30">
					<div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-1 text-center">
						<span className="text-white text-sm font-Lato">
							{currentImgIndex + 1}/{images.length}
						</span>
					</div>
				</div>

				{/* Navigation arrows */}
				<motion.button
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						if (currentImgIndex - 1 >= 0) {
							setCurrentImgIndex((prevIndex) => prevIndex - 1);
						}
					}}
					className="absolute top-1/2 left-2 z-30 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
					disabled={currentImgIndex === 0}
				>
					<RiArrowLeftSLine className="w-6 h-6" />
				</motion.button>

				{/* Image container - Now much taller and more square-like */}
				<div className="overflow-hidden rounded-2xl h-full w-auto shadow-2xl">
					<div
						className="flex transition-transform duration-300 ease-in-out h-full"
						style={{ transform: `translateX(-${100 * currentImgIndex}%)` }}
					>
						{images &&
							images.map((img, index) => (
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
						if (currentImgIndex + 1 <= images.length - 1) {
							setCurrentImgIndex((prevIndex) => prevIndex + 1);
						}
					}}
					className="absolute top-1/2 right-2 z-30 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
					disabled={currentImgIndex === images.length - 1}
				>
					<RiArrowRightSLine className="w-6 h-6" />
				</motion.button>

				{/* Image indicators */}
				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
					<div className="flex gap-2">
						{images &&
							images.map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentImgIndex(i)}
									className={`w-2 h-2 rounded-full transition-all duration-300 ${
										i === currentImgIndex
											? 'bg-zinc-200 w-6'
											: 'bg-white/50 hover:bg-white/80'
									}`}
								/>
							))}
					</div>
				</div>
			</div>
			<div className="mb-3">
				<ReactionsBar reactions={reactions} />
			</div>
			<div className="mb-3">
				<h4 className="text-slate-100 font-medium text-md mb-1">{title}</h4>
				<p className="text-slate-300 text-xs">{desc}</p>
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
}
