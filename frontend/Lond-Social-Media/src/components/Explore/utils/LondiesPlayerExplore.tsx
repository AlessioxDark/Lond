import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { CgSpinner } from 'react-icons/cg';
import { FaPlay } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6';
import { VscDebugRestart } from 'react-icons/vsc';
import videoEx from '../../../assets/TikTokVideo.mp4';
import LondiesProgressBar from '../../Londies/utils/LondiesProgressBar';
import { handleVideoClick } from '../../post/utils/funcs/HomeFuncs';
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
	isLiked: boolean;
	setIsLiked: Function;
}
const LondiesPlayerExplore = ({ isLiked, setIsLiked }: LondiesPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [time, setTime] = useState({ min: '00', sec: '00', h: '00' });
	const [volumeIcon, setVolumeIcon] = useState<React.ReactNode>(
		<FaVolumeHigh
			className=" text-lg group/volume"
			style={{
				textShadow: '0 0 8px #a855f7',
			}}
		/>
	);
	const videoRef = useRef<HTMLVideoElement>(null);
	const bufferRef = useRef<HTMLDivElement>(null);
	const videoElement = videoRef.current;
	const progressRef = useRef<HTMLDivElement>(null);
	const [videoDuration, setVideoDuration] = useState<number | null>(null);
	const mainRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [isMuted, setIsMuted] = useState<boolean>(false);
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
			if (
				videoRef.current &&
				videoRef.current.currentTime === videoRef.current.duration
			) {
				console.log('ci siamo arrivatri');
				videoRef.current.currentTime = 1000;
				handlePlayPause();
			}

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

	const seekToPosition = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!videoRef.current) return;
		const { left, width } = e.currentTarget.getBoundingClientRect();
		const clickPos = (e.clientX - left) / width;
		if (clickPos < 0 || clickPos > 1) return;
		const durationMs = videoRef.current.duration * 1000;
		const newTime = (durationMs * clickPos) / 1000;
		videoRef.current.currentTime = newTime;
	};

	const handleMute = () => {
		console.log('qui 1');
		if (!videoRef.current) return;

		const video = videoRef.current;
		if (isMuted) {
			video.muted = false;
			setIsMuted(false);

			video.volume = prevVolume.current;
			setVolumeIcon(<FaVolumeHigh />);
		} else {
			console.log('qui');
			video.volume != 0
				? (prevVolume.current = video.volume)
				: prevVolume.current;
			console.log(prevVolume.current);
			video.muted = true;
			setIsMuted(true);

			setVolumeIcon(<FaVolumeXmark />);
			video.volume = 0;
		}
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
	const handleChangeProgressBar = (newValue: number) => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = newValue;
	};
	return (
		<div
			className={`flex flex-col cursor-pointer items-center justify-center relative overflow-hidden group aspect-[3/4]
         min-w-full max-w-full 
         rounded-2xl
  
    `}
			ref={mainRef}
		>
			<div className="absolute inset-0bg-gradient-to-br from-lond-dark/20 via-lond-gray/10 to-lond-accent/10 backdrop-blur-sm rounded-2xl z-0" />
			<AnimatePresence>
				{isWaiting && (
					<div className="absolute w-full h-full flex items-center justify-center z-25 bg-lond-dark/30 backdrop-blur-sm rounded-xl">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						>
							<CgSpinner className="text-6xl text-lond-text-primary " />
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<Video src={videoEx} ref={videoRef} preload="metadata"></Video>
			<div
				className="absolute inset-0 flex justify-center items-center rounded-2xl z-20 transition-all duration-300"
				ref={overlayRef}
			>
				<div
					className="absolute w-full h-full inset-0 flex justify-center items-center rounded-[10px] z-20 transition-all duration-300"
					ref={overlayRef}
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
					<AnimatePresence>
						{!isPlaying && videoDuration !== videoRef.current?.currentTime && (
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								whileTap={{ scale: 0.9 }}
								className="bg-lond-dark/70
                 rounded-full p-6 shadow-2xl  backdrop-blur-sm "
							>
								<FaPlay className="text-4xl text-lond-text-primary ml-1" />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<div className="absolute bottom-5 right-5 z-30" onClick={handleMute}>
				<motion.div
					whileTap={{ scale: 0.9 }}
					className="w-9 h-9 cursor-pointer rounded-full"
				>
					<div className="w-full h-full bg-lond-dark/70 backdrop-blur-md border-2 border-lond-light-gray/50 rounded-full flex justify-center items-center transition-all duration-300">
						<span className="text-lg group/volume text-lond-text-primary">
							{volumeIcon}
						</span>
					</div>
				</motion.div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 z-28 px-4 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<div className="mt-2 px-3 py-1 ">
					<span className="text-lond-light-gray text-[1rem] font-Lato">
						{time.h !== '00' ? `${time.h}:` : ''}
						{time.min}:{time.sec}
					</span>
				</div>
				<LondiesProgressBar
					min={0}
					max={videoRef.current?.duration || 0}
					type="lond"
					value={videoRef.current?.currentTime || 0}
					setValue={handleChangeProgressBar}
				/>
			</div>
		</div>
	);
};
export default LondiesPlayerExplore;
