import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FaPause, FaPlay } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeXmark, FaX } from 'react-icons/fa6';
const VideoOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	border-radius: 10px;
	box-shadow: inset 0 50px 20px 0px rgba(0, 0, 0, 0.4);
`;

const Video = styled.video`
	flex-shrink: 1;
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 10px;
`;
interface StoryPlayerProps {
	onClose: () => void;
	isOpen: boolean;
	content: any;
	forward: () => void;
}
const StoryPlayer = ({ onClose, content, forward }: StoryPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [isMuted, setIsMuted] = useState<boolean>(true);
	const [volumeIcon, setVolumeIcon] = useState<React.ReactNode>(
		<FaVolumeXmark className="text-accent text-lg group/volume" />
	);

	const videoRef = useRef<HTMLVideoElement>(null);
	const bufferRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const prevVolume = useRef(0.5);

	useEffect(() => {
		if (!videoRef.current) return;

		const onPlay = () => {
			if (isWaiting) setIsWaiting(false);
			setIsPlaying(true);
		};
		const onPause = () => {
			if (isWaiting) setIsWaiting(false);
			setIsPlaying(false);
		};
		const onWaiting = () => {
			if (isPlaying) setIsPlaying(false);

			setIsWaiting(true);
		};
		const element = videoRef.current;
		const onTimeUpdate = () => {
			setIsWaiting(false);

			if (
				videoRef.current &&
				videoRef.current.currentTime === videoRef.current.duration
			) {
			}

			if (!progressRef.current) return;
			const { currentTime, duration } = element;
			const progress = currentTime / duration;
			const width = progress * 100;
			progressRef.current.style.width = `${width}%`;
			if (currentTime === duration) {
				forward();
			}
		};

		const onProgress = () => {
			if (!element.buffered.length || !bufferRef.current) return;
			const { duration } = element;
			const bufferEnd = element.buffered.end(element.buffered.length - 1);
			if (bufferRef.current && duration > 0) {
				const width = (bufferEnd / duration) * 100;
				bufferRef.current.style.width = `${width}%`;
			}
		};

		element.addEventListener('play', onPlay);
		element.addEventListener('playing', onPlay);
		element.addEventListener('pause', onPause);
		element.addEventListener('waiting', onWaiting);
		element.addEventListener('timeupdate', onTimeUpdate);
		element.addEventListener('progress', onProgress);

		return () => {
			element.removeEventListener('play', onPlay);
			element.removeEventListener('playing', onPlay);
			element.removeEventListener('pause', onPause);
			element.removeEventListener('waiting', onWaiting);
			element.removeEventListener('timeupdate', onTimeUpdate);
			element.removeEventListener('progress', onProgress);
		};
	}, [videoRef.current]);
	const handleMute = () => {
		if (!videoRef.current) return;

		const video = videoRef.current;
		if (isMuted) {
			video.muted = false;
			setIsMuted(false);

			video.volume = prevVolume.current;
			setVolumeIcon(
				<FaVolumeHigh className="text-accent text-lg group/volume" />
			);
		} else {
			video.volume != 0
				? (prevVolume.current = video.volume)
				: prevVolume.current;
			console.log(prevVolume.current);
			video.muted = true;
			setIsMuted(true);

			setVolumeIcon(
				<FaVolumeXmark className="text-accent text-lg group/volume" />
			);
			video.volume = 0;
		}
	};

	const handlePlayPause = () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
	};

	return (
		<div
			className={`flex flex-col cursor-pointer items-center justify-center relative overflow-hidden group h-[100%] 
        
 w-full rounded-2xl   shadow-2xl
    `}
		>
			{/* Loading spinner */}
			{isWaiting && (
				<div className="absolute inset-0 flex items-center justify-center z-30">
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						className="w-16 h-16 border-4 border-pink-400/30 border-t-pink-400 rounded-full"
					/>
				</div>
			)}
			{/* {isWaiting && (
				<div className="absolute inset-0 flex items-center justify-center z-30">
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						className="w-16 h-16 border-4 border-pink-400/30 border-t-pink-400 rounded-full"
					/>
				</div>
			)} */}

			<Video
				src={content.content}
				ref={videoRef}
				preload="metadata"
				autoPlay={true}
				muted={true}
			></Video>
			<VideoOverlay />

			<div className="absolute top-0 left-0 right-0 z-30 p-4">
				{/* Progress bar */}
				<div className="w-full h-1 bg-white/30 rounded-full overflow-hidden mb-4">
					<div
						className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
						ref={progressRef}
					>
						<div className="h-full bg-slate-500/60 rounded-full transition-all duration-100 ease-linear" />
					</div>
				</div>

				{/* User info and controls */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<img
							src={content.pfp}
							alt={`${content.name} profile`}
							className="w-10 h-10 rounded-full ring-2 ring-white/30"
						/>
						<span className="font-semibold text-white font-Montserrat text-sm">
							{content.name}
						</span>
					</div>

					<div className="flex items-center gap-3">
						<motion.button
							onClick={handlePlayPause}
							whileTap={{ scale: 0.9 }}
							className="w-8 h-8 rounded-full bg-[#253141] backdrop-blur-sm flex items-center justify-center text-white font-Lato border-2 border-slate-600 transition-all duration-300"
						>
							{isPlaying ? <Pause size={16} /> : <Play size={16} />}
						</motion.button>

						<motion.button
							onClick={handleMute}
							whileTap={{ scale: 0.9 }}
							className="w-8 h-8 rounded-full bg-[#253141] backdrop-blur-sm flex items-center justify-center text-white font-Lato border-2 border-slate-600 transition-all duration-300"
						>
							{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
						</motion.button>

						<motion.button
							onClick={onClose}
							whileTap={{ scale: 0.9 }}
							className="w-8 h-8 rounded-full bg-[#253141] backdrop-blur-sm flex items-center justify-center text-white font-Lato border-2 border-slate-600 transition-all duration-300"
						>
							<X size={16} />
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryPlayer;
