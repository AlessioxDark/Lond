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
import SocialIconExplore from '../utils/SocialIconExplore';
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
	const [isHovered, setIsHovered] = useState(false);

	// Funzione per formattare i numeri (1200 -> 1.2K)
	const formatNumber = (num: number) => {
		if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
		if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
		return num.toString();
	};

	return (
		<motion.div
			className="relative overflow-hidden rounded-3xl transition-all duration-300 cursor-pointer backdrop-blur-sm hover:shadow-xl shadow-lg  hover:shadow-slate-900/25  bg-slate-800/90

                 
                 "
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
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
				<h4 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-tight">
					{title}
				</h4>

				{/* Descrizione (solo prime righe) */}
				<p className="text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed">
					{desc}
				</p>

				{/* Stats compatte */}
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-3 text-slate-400">
						<SocialIconExplore Icon={Heart} count={0} />
						<SocialIconExplore Icon={MessageCircle} count={0} />
						<SocialIconExplore Icon={Bookmark} count={0} />

						<SocialIconExplore Icon={Share} count={0} />
						{/* <div className="flex items-center gap-1">
							<Heart size={15} />
							<span>{formatNumber(likes)}</span>
						</div>
						<div className="flex items-center gap-1">
							<MessageCircle size={15} />
							<span>{formatNumber(comments)}</span>
						</div>
						<div className="flex items-center gap-1">
							<Share size={15} />
							<span>{formatNumber(comments * 0.3)}</span>
						</div> */}
					</div>

					{/* YouTube logo */}
				</div>
			</div>

			{/* Hover overlay con azioni rapide */}
		</motion.div>
	);
}
