import { CgSpinner } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';
import { VscDebugRestart } from 'react-icons/vsc';

import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6';
import { ImVolumeMedium } from 'react-icons/im';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { handleVideoClick } from '../../post/utils/funcs/HomeFuncs';
const Video = styled.video`
	flex-shrink: 1;
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 10px;
	position: relative;
	z-index: 10;
`;
interface VideoPlayerExploreProps {
	src: string;
	isLiked: boolean;
	setIsLiked: Function;
}

const VideoPlayerExplore = ({
	src,
	isLiked,
	setIsLiked,
}: VideoPlayerExploreProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showVolumeSlider, setShowVolumeSlider] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [time, setTime] = useState({ min: '00', sec: '00', h: '00' });
	const [volumeIcon, setVolumeIcon] = useState<React.ReactNode>(
		<FaVolumeHigh className="text-white text-sm group/volume" />
	);
	const videoRef = useRef<HTMLVideoElement>(null);
	const bufferRef = useRef<HTMLDivElement>(null);
	const videoElement = videoRef.current;
	const progressRef = useRef<HTMLDivElement>(null);
	const [videoDuration, setVideoDuration] = useState<number | null>(null);
	const mainRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const volumeRef = useRef<HTMLDivElement>(null);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [isFullScreen, setIsFullscreen] = useState<boolean>(false);
	const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const prevVolume = useRef(0.3);
	useEffect(() => {
		if (!videoRef.current || !volumeRef.current) return;
		videoRef.current.volume = 0.5;
		volumeRef.current.style.width = `${0.5 * 100}`;
	}, []);
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
		const onFullScreen = () => {
			if (document.fullscreenElement === mainRef.current) {
				setIsFullscreen(true);
			} else {
				setIsFullscreen(false);
			}
		};
		const onVolumeChange = () => {
			const { volume } = element;

			if (volumeRef.current && volume > 0) {
				const width = volume * 100;
				volumeRef.current.style.width = `${width}%`;
				if (volume === 0 || isMuted) {
					setVolumeIcon(
						<FaVolumeXmark className="text-white text-sm group/volume" />
					);
				} else {
					if (volume <= 0.25) {
						setVolumeIcon(
							<FaVolumeLow
								onClick={handleMute}
								className="text-white text-sm group/volume"
							/>
						);
					} else if (volume <= 0.5) {
						setVolumeIcon(
							<ImVolumeMedium
								onClick={handleMute}
								className="text-white text-sm group/volume"
							/>
						);
					} else {
						setVolumeIcon(
							<FaVolumeHigh
								onClick={handleMute}
								className="text-white text-sm group/volume"
							/>
						);
					}
				}
			}
		};
		element.addEventListener('play', onPlay);
		element.addEventListener('playing', onPlay);
		element.addEventListener('pause', onPause);
		element.addEventListener('waiting', onWaiting);
		element.addEventListener('timeupdate', onTimeUpdate);
		element.addEventListener('progress', onProgress);
		element.addEventListener('volumechange', onVolumeChange);
		document.addEventListener('fullscreenchange', onFullScreen);

		return () => {
			element.removeEventListener('play', onPlay);
			element.removeEventListener('playing', onPlay);
			element.removeEventListener('pause', onPause);
			element.removeEventListener('waiting', onWaiting);
			element.removeEventListener('timeupdate', onTimeUpdate);
			element.removeEventListener('progress', onProgress);
			element.removeEventListener('volumechange', onVolumeChange);
			document.removeEventListener('fullscreenchange', onFullScreen);
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
		if (!videoRef.current) return;
		if (!volumeRef.current) return;
		const video = videoRef.current;
		if (isMuted) {
			video.muted = false;
			setIsMuted(false);

			video.volume = prevVolume.current;
		} else {
			video.volume != 0
				? (prevVolume.current = video.volume)
				: prevVolume.current;
			console.log(prevVolume.current);
			video.muted = true;
			setIsMuted(true);
			volumeRef.current.style.width = `0`;
			setVolumeIcon(
				<FaVolumeXmark className="text-white text-md group/volume" />
			);
			video.volume = 0;
		}
	};

	const modifyVolume = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!videoRef.current) return;

		if (!videoRef.current) return;
		const { left, width } = e.currentTarget.getBoundingClientRect();
		const clickPos = (e.clientX - left) / width;
		if (clickPos < 0 || clickPos > 1) return;
		videoRef.current.volume = clickPos;
		if (clickPos > 0) {
			setIsMuted(false);
			videoRef.current.muted = false;
		}
	};
	const handleFullscreen = () => {
		if (!mainRef.current) return;
		if (document.fullscreenElement === mainRef.current) {
			document.exitFullscreen().catch((err) => {
				console.error('Exit fullscreen failed:', err);
			});
		} else {
			mainRef.current.requestFullscreen().catch((err) => {
				console.error('Enter fullscreen failed:', err);
			});
		}
	};
	useEffect(() => {
		if (!videoRef.current) return;
		if (videoRef.current.playbackRate == playbackRate) return;
		videoRef.current.playbackRate = playbackRate;
	}, [playbackRate]);
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
	const restartVideo = () => {
		if (!videoRef.current) return;
		videoRef.current.currentTime = 0;
		handlePlayPause();
	};
	const formatTime = (duration: number): string => {
		const h = Math.floor(duration / 3600)
			.toString()
			.padStart(2, '0');
		const m = Math.floor((duration % 3600) / 60)
			.toString()
			.padStart(2, '0');
		const s = Math.floor(duration % 60)
			.toString()
			.padStart(2, '0');

		return h === '00' ? `${m}:${s}` : `${h}:${m}:${s}`;
	};

	return (
		<motion.div
			className="group
				 border border-slate-700/30 hover:border-slate-600/50
				hover:shadow-slate-900/20
				hover:shadow-2xl cursor-pointer overflow-visible relative rounded-2xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			ref={mainRef}
		>
			<AnimatePresence>
				{isWaiting && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						className="absolute w-full h-full flex items-center justify-center z-25 bg-[#253141] backdrop-blur-sm rounded-xl"
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						>
							<CgSpinner className="text-6xl text-white " />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<Video src={src} ref={videoRef} preload="metadata"></Video>
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
							className="bg-[#253141]
		   rounded-full p-4 shadow-2xl  backdrop-blur-xl "
						>
							<FaPlay className="text-xl text-white ml-1" />
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{videoDuration &&
						videoRef.current &&
						videoDuration === videoRef.current?.currentTime && (
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								whileTap={{ scale: 0.9 }}
								onClick={restartVideo}
								className="bg-slate-600/80 backdrop-blur-sm rounded-full p-6 shadow-2xl"
							>
								<VscDebugRestart className="text-4xl text-white" />
							</motion.div>
						)}
				</AnimatePresence>
			</div>

			<div
				className="bg-[#253141]
		    backdrop-blur-xl
				  rounded-b-lg rounded-t-2xl p-2 shadow-2xl border border-slate-600/30  background-blur-xl
		      border-t absolute w-full bottom-0 z-30 transition-all duration-500  ease-in-out right-0
					opacity-0 group-hover:opacity-100 pb-1 "
			>
				{/* Timeline */}
				<div
					className="timeline w-full  h-2 mb-2  bg-slate-700/70
							rounded-full overflow-hidden cursor-pointer shadow-inner  transition-all duration-200"
					onClick={seekToPosition}
				>
					<div className="flex relative w-full h-full">
						<motion.div
							className="play-progress bg-white rounded-full transition-all duration-200 flex h-full relative overflow-hidden"
							ref={progressRef}
						/>
						<div
							className="buffer-progress flex bg-slate-500/60 absolute h-full rounded-full"
							ref={bufferRef}
						/>
					</div>
				</div>

				{/* Controls */}
				<div className="flex w-full justify-between items-center">
					<div className="flex items-center gap-4">
						<motion.button
							className="flex items-center justify-center w-8 h-8 rounded-xl
									border-2 bg-slate-800/60
								 text-white hover:border-slate-300/90
									border-slate-600
									transition-all duration-300 backdrop-blur-sm

		              "
							onClick={handlePlayPause}
							whileTap={{ scale: 0.95 }}
						>
							{isPlaying ? (
								<FaPause className="text-sm" />
							) : (
								<FaPlay className="text-sm ml-0.5" />
							)}
						</motion.button>

						<div
							className="text-white font-bold font-Lato bg-slate-800/60
								backdrop-blur-sm px-2 py-1 rounded-xl border-2 border-slate-600"
						>
							<span className="text-slate-100">
								{time.min}:{time.sec}
							</span>
							<span className="text-slate-400 text-sm mx-2">/</span>
							<span className="text-slate-300 text-sm">
								{videoDuration && formatTime(videoDuration)}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						{/* Volume Control */}
						<div
							className="flex items-center gap-3 group/volume h-10"
							onMouseEnter={() => setShowVolumeSlider(true)}
							onMouseLeave={() => setShowVolumeSlider(false)}
						>
							<motion.div
								onClick={handleMute}
								whileTap={{ scale: 0.9 }}
								className="w-8 h-8 rounded-xl bg-slate-800/60
										border-2 border-slate-600  text-white backdrop-blur-sm  transition-all duration-300 flex items-center justify-center
		                "
							>
								{volumeIcon}
							</motion.div>

							<AnimatePresence>
								{showVolumeSlider && (
									<motion.div
										initial={{ width: 0, opacity: 0 }}
										animate={{ width: 60, opacity: 1 }}
										exit={{ width: 0, opacity: 0 }}
										className="h-2 bg-slate-700/70
												rounded-full overflow-hidden cursor-pointer shadow-inner"
										onClick={modifyVolume}
									>
										<div
											className="h-full bg-white rounded-full"
											ref={volumeRef}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Playback Speed */}
						<div className="relative">
							<motion.button
								className="flex items-center gap-2 h-8 px-1.5 py-1.5 rounded-xl
										bg-slate-800/60 backdrop-blur-sm border-2 border-slate-600
										hover:border-slate-300/90 text-white transition-all duration-300  "
								onClick={() => setIsOpen(!isOpen)}
								whileTap={{ scale: 0.95 }}
							>
								<div>
									<span className="font-bold text-sm">{playbackRate}</span>
									<span className="text-sm font-bold">x</span>
								</div>
								<motion.div
									animate={{ rotate: isOpen ? 180 : 0 }}
									transition={{ duration: 0.2 }}
								>
									<FiChevronDown className="w-5 h-5 text-slate-400" />
								</motion.div>
							</motion.button>

							<AnimatePresence>
								{isOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										className="bg-black/80 absolute bottom-full mb-3 left-0 w-24
												backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl z-40"
									>
										<div
											className="w-full bg-gradient-to-br from-slate-800/40 via-slate-900/40 to-slate-900/60
		    backdrop-blur-xl
				  rounded-xl p-2 shadow-2xl"
										>
											<div className="space-y-1">
												{[0.5, 1, 1.5, 2].map((rate, i) => {
													const isHovered = hoveredIndex === i;
													const isActive = rate === playbackRate;

													return (
														<motion.button
															key={`playbackRate_${rate}_${i}`}
															onClick={() => {
																if (!isActive) setPlaybackRate(rate);
																setIsOpen(false);
															}}
															onMouseEnter={() => setHoveredIndex(i)}
															onMouseLeave={() => setHoveredIndex(null)}
															className={`w-full flex items-center justify-center px-3 py-2
																rounded-lg cursor-pointer transition-all duration-200 font-bold
																${
																	isHovered || isActive
																		? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
																		: 'bg-transparent text-slate-300 hover:text-white'
																}
															`}
															whileTap={{ scale: 0.95 }}
														>
															{rate.toFixed(1)}x
														</motion.button>
													);
												})}
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Fullscreen */}
						<motion.button
							onClick={handleFullscreen}
							whileTap={{ scale: 0.9 }}
							className="w-8 h-8 items-center justify-center flex rounded-xl bg-slate-800/60 backdrop-blur-sm
									border-2 border-slate-600 hover:border-slate-300
									text-white hover:text-slate-300 transition-all duration-300"
						>
							{isFullScreen ? (
								<MdFullscreenExit className="text-xl" />
							) : (
								<MdFullscreen className="text-xl" />
							)}
						</motion.button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default VideoPlayerExplore;
