import { motion } from 'framer-motion'; // AnimatePresence non serve più qui per i commenti inline
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { useCallback, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
// PostComments non serve più qui
import PostHeader from '../utils/PostHeader';
import CommentDisplay from '../utils/CommentDisplay'; // IMPORTA IL NUOVO COMPONENTE
import ReactIcon from '../utils/Reactions/ReactIcon';
import ReactionsBar from '../utils/Reactions/ReactionsBar';
import SocialIcon from '../utils/SocialIcon';
import {
	cardVariants,
	handleDoubleTapImgs,
	postContainerStyles,
} from '../utils/funcs/HomeFuncs';
interface InstagramPost {
	images: Array<any>;
	name: string;
	title: string;

	desc: string;
	comments: number;
	pfp: string;
	handle: string;
	createdAt: Date;
	isViral: boolean;
	isVerified: boolean;
	repost: number;
	likes: number;
	saved: number;
	id: string; // Aggiungiamo ID per passarlo a PostInfo
}

interface Reaction {
	emoji: string;
	count: number;
}

export default function InstagramPost({
	id, // Ricevi ID
	images,
	name,
	desc,
	pfp,
	title,
	likes,
	comments,
	repost,
	saved,
	handle,
	createdAt,
	isVerified,
	isViral,
}: InstagramPost) {
	// const [isComments, setIsComments] = useState(false); // Rimosso
	const [isCommentDisplayOpen, setIsCommentDisplayOpen] = useState(false); // Nuovo stato
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [reactions, setReactions] = useState<Reaction[]>([
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
			className={` ${postContainerStyles} w-[65%]`}
			role="article"
			aria-labelledby={`post-author`}
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			{/* Animated background patterns */}

			{/* Header */}

			<PostHeader
				handle={handle}
				isViral={isViral}
				pfp={pfp}
				name={name}
				createdAt={createdAt}
				isVerified={isVerified}
			/>

			{/* Main Content Area */}
			<div className="relative z-10 flex flex-col items-center gap-3 mb-6 ">
				{/* Image Carousel */}
				<div
					className=" relative aspect-square w-full "
					onDoubleClick={useCallback(
						(e) => {
							handleDoubleTapImgs(isLiked, setIsLiked, e);
						},
						[isLiked]
					)}
				>
					{/* Image counter */}
					<div className="absolute top-4 right-4 z-30">
						<div className="bg-[var(--color-lond-dark)]/70 backdrop-blur-sm rounded-xl px-3 py-1 text-center">
							<span className="text-[var(--color-lond-text-primary)] text-sm font-lato">
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
						className="absolute top-1/2 left-2 z-30 w-10 h-10 bg-[var(--color-lond-dark)]/70 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-lond-text-primary)] hover:bg-[var(--color-lond-dark)] transition-all duration-300"
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
						className="absolute top-1/2 right-2 z-30 w-10 h-10 bg-[var(--color-lond-dark)]/70 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-lond-text-primary)] hover:bg-[var(--color-lond-dark)] transition-all duration-300"
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
												? 'bg-[var(--color-lond-accent)] w-6'
												: 'bg-[var(--color-lond-light-gray)]/50 hover:bg-[var(--color-lond-light-gray)]/80'
										}`}
									/>
								))}
						</div>
					</div>
				</div>

				{/* Content and Actions */}
				<div className="w-full flex flex-col gap-3">
					{/* Actions */}
					<div className="w-full flex flex-row justify-between items-center">
						<div className="flex items-center gap-3 flex-wrap">
							<SocialIcon
								icon={Heart}
								isActive={isLiked}
								onClick={() => setIsLiked(!isLiked)}
								count={likes}
							/>

							<SocialIcon
								icon={MessageCircle}
								isActive={isCommentDisplayOpen} // Usa il nuovo stato se vuoi cambiare stile icona
								onClick={() => setIsCommentDisplayOpen(true)} // Apre il modale/sheet
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
						{/* Reactions Bar */}

						<div className="">
							<ReactionsBar reactions={reactions} />
						</div>
					</div>
					{/* Title and Description */}
					<div className="">
						<h2 className="text-2xl font-black font-montserrat text-[var(--color-lond-text-primary)] mb-1">
							{title}
						</h2>
						<p className="text-[var(--color-lond-text-primary)] text-md leading-relaxed font-light font-lato">
							{desc}
						</p>
					</div>

					{/* Comments Section - Rimossa da qui */}
				</div>
<<<<<<< HEAD

				<AnimatePresence>
					{isComments && <PostComments height="48rem" />}
				</AnimatePresence>
=======
				{/* <div className="w-full"> // Sezione commenti inline rimossa
					<AnimatePresence>
						{isComments && <PostComments height="48rem" />}
					</AnimatePresence>
				</div> */}
>>>>>>> 337c643c3b58476cd7cda5be988c60b4dfb5da07
			</div>
			{/* Modale/Sheet per i commenti */}
			{isCommentDisplayOpen && (
				<CommentDisplay
					isOpen={isCommentDisplayOpen}
					onClose={() => setIsCommentDisplayOpen(false)}
					postInfo={{
						id: id, // Passa l'ID del post
						authorName: name,
						// contentPreview: images[0], // Potresti passare la prima immagine come preview
						type: 'image',
					}}
					// Questi sono dati mock, dovrai passare i commenti reali del post
					commentsData={[
						{ id: 'c1', authorPfp: pfp, authorName: 'Jane Doe',authorHandle: "janeD", text: 'Bellissima foto!', timestamp: '2 ore fa' },
						{ id: 'c2', authorPfp: pfp, authorName: 'John Smith', authorHandle: "JohnS", text: 'Che colori! 😍', timestamp: '1 ora fa' },
						{ id: 'c3', authorPfp: pfp, authorName: 'Alex Green', authorHandle: "AlexG", text: 'Wow!', timestamp: '30 min fa' },
					]}
				/>
			)}
		</motion.div>
	);
}
