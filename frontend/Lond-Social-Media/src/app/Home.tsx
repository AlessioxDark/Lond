import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import pfp from '../assets/pfp.png';
import {
	default as post1,
	default as post2,
	default as post3,
} from '../assets/post.jpg';

import storyVideo from '../assets/TikTokVideo.mp4';
import InstagramPost from '../components/post/pages/InstagramPost';
import LondiesPost from '../components/post/pages/LondiesPost';
import TwitterPost from '../components/post/pages/TwitterPost';
import YoutubePost from '../components/post/pages/YoutubePost';
import Story from '../components/post/pages/story/Story';
export default function Home() {
	const [images, setImages] = useState([post1, post2, post3]);
	const [storyIndex, setStoryIndex] = useState<number>(0);
	const [stories, setStories] = useState([
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{ pfp: pfp, name: 'Gianluigi Quaranta', content: post1, isViewed: false },
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{
			pfp: pfp,
			name: 'Alessio Quaranta',
			content: storyVideo,
			isViewed: false,
		},
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: true },
		{ pfp: pfp, name: 'Alessio Quaranta', content: post1, isViewed: false },
		{ pfp: pfp, name: 'Alessio Quaranta', content: storyVideo, isViewed: true },
	]);
	useEffect(() => {
		console.log(storyIndex);
	}, [storyIndex]);
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};
	return (
		<div className="w-[85%] flex flex-col items-center">
			<motion.div
				className="w-[65%] flex flex-col justify-center items-center "
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<motion.div className="relative w-full" variants={itemVariants}>
					<motion.button
						onClick={() => {
							setStoryIndex((prevIndex) =>
								Math.min(prevIndex + 1, stories.length - 14)
							);
						}}
						whileTap={{ scale: 0.9 }}
						className="w-10 h-10 absolute z-30  right-1 top-1/2 -translate-y-1/2  text-white rounded-full  bg-[#253141] backdrop-blur-xl
border-2 border-slate-600 flex items-center justify-center transition-all duration-300"
					>
						<ChevronRight size={24} />
					</motion.button>
					<div className="flex flex-nowrap h-40 w-full flex-row gap-5 items-center p-2 box-border overflow-hidden">
						<div
							className={`flex transition-transform h-full duration-300 ease-in-out gap-5 `}
							style={{ transform: `translateX(-${(100 * storyIndex) / 14}%)` }}
						>
							{stories.map((story, index) => {
								return (
									<Story
										stories={stories}
										key={index}
										index={index}
										cover={pfp}
										content={post1}
										pfp={pfp}
										isViewed={story.isViewed}
										name="alessio40"
									/>
								);
							})}
						</div>
					</div>

					<motion.button
						onClick={() => {
							setStoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));
						}}
						whileTap={{ scale: 0.9 }}
						className="w-10 h-10 absolute z-30  left-1 top-1/2 -translate-y-1/2  text-white rounded-full  bg-[#253141] backdrop-blur-xl
border-2 border-slate-600 flex items-center justify-center transition-all duration-300"
					>
						<ChevronLeft size={24} />
					</motion.button>
				</motion.div>
				<motion.div
					className="flex h-full w-full flex-col mt-8 items-center gap-4"
					variants={itemVariants}
				>
					<TwitterPost
						id={'abc'}
						pfp={pfp}
						isViral={true}
						isVerified={false}
						retweets={0}
						name="Alessio Quaranta"
						likes={0}
						saved={0}
						text={
							'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.'
						}
						handle={'@alessio40'}
						createdAt={new Date()}
					/>
					<InstagramPost
						pfp={pfp}
						comments={0}
						isViral={false}
						isVerified={false}
						repost={0}
						likes={0}
						saved={0}
						images={images}
						name="Alessio Quaranta"
						title="Dybala va per i 200!"
						desc="La Joya, in un grande momento di forma, ha chiesto a Ranieri di poter partire titolare contro il Monza: gli manca solo una rete per fare cifra tonda⚽️. L'articolo completo è sul nostro sito e la nostra app📲#Dybala #Roma #CorrieredelloSport"
						handle={'@alessio40'}
						createdAt={new Date()}
					/>
					<YoutubePost
						pfp={pfp}
						handle={'@alessio40'}
						isViral={false}
						isVerified={false}
						repost={0}
						likes={0}
						saved={0}
						comments={0}
						name="Alessio Quaranta"
						title="Dybala va per i 200!"
						desc="La Joya, in un grande momento di forma, ha chiesto a Ranieri di poter partire titolare contro il Monza: gli manca solo una rete per fare cifra tonda⚽️. L'articolo completo è sul nostro sito e la nostra app📲#Dybala #Roma #CorrieredelloSport"
						createdAt={new Date()}
					/>
					<LondiesPost
						isViral={false}
						pfp={pfp}
						isVerified={false}
						repost={0}
						comments={0}
						likes={0}
						saved={0}
						name="Alessio Quaranta"
						title="Dybala va per i 200!"
						desc="La Joya, in un grande momento di forma, ha chiesto a Ranieri di poter partire titolare contro il Monza: gli manca solo una rete per fare cifra tonda⚽️. L'articolo completo è sul nostro sito e la nostra app📲#Dybala #Roma #CorrieredelloSport"
						handle={'@alessio40'}
						createdAt={new Date()}
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}
