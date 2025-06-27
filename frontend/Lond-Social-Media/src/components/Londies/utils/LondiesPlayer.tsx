import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { CgSpinner } from 'react-icons/cg';
import { FaPlay } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6';
import { VscDebugRestart } from 'react-icons/vsc';
import { handleVideoClick } from '../../post/utils/funcs/HomeFuncs';
import SocialIcon from '../../post/utils/SocialIcon';
import LondiesPlayerDescription from './LondiesPlayerDescription';
import LondiesPlayerPlayButton from './LondiesPlayerPlayButton';
import LondiesPlayerSoundInfo from './LondiesPlayerSoundInfo';
import LondiesPlayerUserInfo from './LondiesPlayerUserInfo';
import LondiesSocialIcon from './LondiesSocialIcon';
const Video = styled.video`
	flex-shrink: 1;
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 10px;
	z-index: 10;
	position: relative;
`;
interface LondiesPlayerProps {
	currentVideoIndex: number;
	index: number;
	src: string;
	name: string;
	pfp: string;
	desc: string;
}
const LondiesPlayer = ({
	index,
	currentVideoIndex,
	src,
	pfp,
	desc,
	name,
}: LondiesPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [isShared, setIsShared] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isComments, setIsComments] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [time, setTime] = useState({ min: '00', sec: '00', h: '00' });

	const videoRef = useRef<HTMLVideoElement>(null);
	const bufferRef = useRef<HTMLDivElement>(null);
	const videoElement = videoRef.current;
	const progressRef = useRef<HTMLDivElement>(null);
	const [videoDuration, setVideoDuration] = useState<number | null>(null);
	const [isDescVisible, setIsDescVisible] = useState<boolean>(true);
	const mainRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLDivElement>(null);
	const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [isMuted, setIsMuted] = useState<boolean>(true);
	const prevVolume = useRef(0.5);
	useEffect(() => {
		if (!videoRef.current) return;
		console.log(index === currentVideoIndex);
		if (index !== currentVideoIndex) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
	}, [currentVideoIndex]);
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
			if (!videoElement) return;
			setTime({
				h: Math.floor(videoElement.currentTime / 3600)
					.toString()
					.padStart(2, '0'),
				min: Math.floor((videoElement.currentTime / 60) % 60)
					.toString()
					.padStart(2, '0'),
				sec: Math.floor(videoElement.currentTime % 60)
					.toString()
					.padStart(2, '0'),
			});

			if (!progressRef.current) return;
			const { currentTime, duration } = element;
			const progress = currentTime / duration;
			const width = progress * 100;
			progressRef.current.style.width = `${width}%`;
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
		const onEnd = () => {
			if (!videoRef.current) return null;
			videoRef.current.currentTime = 0;
			setIsWaiting(false);
			videoRef.current.play();
		};

		element.addEventListener('play', onPlay);
		element.addEventListener('playing', onPlay);
		element.addEventListener('pause', onPause);
		element.addEventListener('waiting', onWaiting);
		element.addEventListener('timeupdate', onTimeUpdate);
		element.addEventListener('progress', onProgress);
		element.addEventListener('ended', onEnd);

		return () => {
			element.removeEventListener('play', onPlay);
			element.removeEventListener('playing', onPlay);
			element.removeEventListener('pause', onPause);
			element.removeEventListener('waiting', onWaiting);
			element.removeEventListener('timeupdate', onTimeUpdate);
			element.removeEventListener('progress', onProgress);
			element.removeEventListener('ended', onEnd);
		};
	}, [videoRef.current]);

	const seekToPosition = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!videoRef.current) return;
		const { left, width } = e.currentTarget.getBoundingClientRect();
		const clickPos = (e.clientX - left) / width;
		if (clickPos < 0 || clickPos > 1) return;
		const durationMs = videoRef.current.duration * 1000;
		const newTime = (durationMs * clickPos) / 1000;
		videoRef.current.currentTime = newTime;
	};

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleMetadataLoaded = () => {
			console.log('Durata video caricata:', video.duration); // utile per debug
			setVideoDuration(video.duration);
		};

		video.addEventListener('loadedmetadata', handleMetadataLoaded);

		return () => {
			video.removeEventListener('loadedmetadata', handleMetadataLoaded);
		};
	}, []);

	const handlePlayPause = () => {
		if (!videoRef.current || !overlayRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
			overlayRef.current.style.backgroundColor = 'rgba(0,0,0,0.2)';
		} else {
			videoRef.current.play();
			overlayRef.current.style.backgroundColor = 'transparent';
		}
	};

	return (
		<div
			className={`flex flex-col cursor-pointer items-center justify-center relative overflow-hidden group aspect-[9/16] h-[100%]
         min-w-full max-w-full 
         rounded-2xl
  
    `}
			ref={mainRef}
		>
			<div className="absolute inset-0  z-0" />
			<AnimatePresence>
				{isWaiting && (
					<div className="absolute w-full h-full flex items-center justify-center z-25 bg-black/20 backdrop-blur-sm rounded-xl">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						>
							<CgSpinner className="text-6xl text-white " />
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<Video
				src={src}
				ref={videoRef}
				preload="metadata"
				autoPlay={index === currentVideoIndex}
				muted={true}
			/>
			<div
				className="absolute inset-0 flex justify-center items-center rounded-2xl z-20 transition-all duration-300"
				ref={overlayRef}
			>
				<div
					className="absolute w-full h-full inset-0 flex justify-center items-center rounded-[10px] z-20 transition-all duration-300"
					onClick={(e) => {
						handleVideoClick(
							e,
							isLiked,
							setIsLiked,
							isPlaying,
							clickTimeoutRef,
							handlePlayPause
						);
					}}
				>
					<LondiesPlayerPlayButton
						isPlaying={isPlaying}
						videoDuration={videoDuration}
						videoRef={videoRef}
					/>
				</div>
			</div>

			<div className="absolute bottom-5 z-30 flex flex-row items-end p-4 pb-5 gap-5">
				<div className="flex flex-col">
					<div className="flex gap-2 flex-col">
						<LondiesPlayerUserInfo pfp={pfp} name={name} />
						<LondiesPlayerDescription
							descRef={descRef}
							isDescVisible={isDescVisible}
							desc={desc}
							setIsDescVisible={setIsDescVisible}
						/>
						<LondiesPlayerSoundInfo />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<LondiesSocialIcon
						icon={Heart}
						isActive={isLiked}
						onClick={() => setIsLiked(!isLiked)}
						count={0}
					/>
					<LondiesSocialIcon
						icon={MessageCircle}
						isActive={isComments}
						onClick={() => setIsComments(!isComments)}
						count={0}
					/>
					<LondiesSocialIcon
						icon={Bookmark}
						isActive={isSaved}
						onClick={() => setIsSaved(!isSaved)}
						count={0}
					/>
					<LondiesSocialIcon
						icon={Share}
						isActive={isShared}
						onClick={() => setIsShared(!isShared)}
						count={0}
					/>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 z-28 px-4 pb-1 opacity-100">
				<div className="mt-2 px-3 py-1 ">
					<span className="text-slate-300 text-[1rem] font-Lato">
						{time.h !== '00' ? `${time.h}:` : ''}
						{time.min}:{time.sec}
					</span>
				</div>
				<div className="flex flex-col items-center">
					<div
						className="w-full h-1 bg-slate-700/70 backdrop-blur-xl rounded-full overflow-hidden cursor-pointer transition-all duration-200"
						onClick={seekToPosition}
					>
						<div className="flex relative w-full h-full">
							<div
								className="play-progress bg-white rounded-full  transition-all duration-200 flex h-full relative overflow-hidden"
								ref={progressRef}
							/>
							<div
								className="buffer-progress flex bg-slate-500/60 absolute h-full rounded-full"
								ref={bufferRef}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LondiesPlayer;
