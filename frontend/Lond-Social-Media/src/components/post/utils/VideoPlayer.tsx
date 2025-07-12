import { CgSpinner } from 'react-icons/cg';
import { FiChevronDown } from 'react-icons/fi';
import { VscDebugRestart } from 'react-icons/vsc';

import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
	EventHandler,
	ReactEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6';
import { ImVolumeMedium } from 'react-icons/im';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import LondiesBufferBar from '../../Londies/utils/LondiesBufferBar';
import LondiesProgressBar from '../../Londies/utils/LondiesProgressBar';
import { handleVideoClick } from './funcs/HomeFuncs';
const Video = styled.video`
	flex-shrink: 1;
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 10px;
	position: relative;
	z-index: 10;
`;
interface VideoPlayerProps {
	src: string;
	isLiked: boolean;
	setIsLiked: Function;
}

const VideoPlayer = ({ src, isLiked, setIsLiked }: VideoPlayerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showVolumeSlider, setShowVolumeSlider] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [time, setTime] = useState({ min: '00', sec: '00', h: '00' });
	const [volumeIcon, setVolumeIcon] = useState<React.ReactNode>(
		<FaVolumeHigh className="text-white text-md group/volume" />
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
	const prevVolume = useRef(0.5);
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
						<FaVolumeXmark className="text-white text-md group/volume" />
					);
				} else {
					if (volume <= 0.25) {
						setVolumeIcon(
							<FaVolumeLow
								onClick={handleMute}
								className="text-white text-md group/volume"
							/>
						);
					} else if (volume <= 0.5) {
						setVolumeIcon(
							<ImVolumeMedium
								onClick={handleMute}
								className="text-white text-md group/volume"
							/>
						);
					} else {
						setVolumeIcon(
							<FaVolumeHigh
								onClick={handleMute}
								className="text-white text-md group/volume"
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

	// const seekToPosition = (e: React.MouseEvent<HTMLDivElement>) => {
	// 	if (!videoRef.current) return;
	// 	const { left, width } = e.currentTarget.getBoundingClientRect();
	// 	const clickPos = (e.clientX - left) / width;
	// 	if (clickPos < 0 || clickPos > 1) return;
	// 	const durationMs = videoRef.current.duration * 1000;
	// 	const newTime = (durationMs * clickPos) / 1000;
	// 	videoRef.current.currentTime = newTime;
	// };

	const handleMute = () => {
		console.log('muting...', volumeRef.current);
		if (!videoRef.current) return;
		if (!volumeRef.current) return;

		const video = videoRef.current;
		if (isMuted) {
			console.log('è mutato');
			video.muted = false;
			setIsMuted(false);

			video.volume = prevVolume.current;
		} else {
			console.log('non è mutato');
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
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		switch (e.code) {
			case 'Space':
				e.preventDefault();
				console.log('spazio');
				handlePlayPause();
				break;
			case 'ArrowRight':
				e.preventDefault();
				if (!videoRef.current) return;
				// setIsWaiting(false);
				videoRef.current.currentTime += 10;
				break;
			case 'ArrowLeft':
				e.preventDefault();
				if (!videoRef.current) return;
				// setIsWaiting(false);
				videoRef.current.currentTime -= 10;
				break;
			case 'KeyM':
				handleMute();
				break;
			case 'F11':
				e.preventDefault();
				handleFullscreen();
				break;
			default:
				console.log(e.code);
				break;
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
		console.log('sto leggendo');
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
	const handleChangeProgressBar = (newValue: number) => {
		if (!videoRef.current) return;
		setIsWaiting(false);
		videoRef.current.currentTime = newValue;
	};
	return (
		<motion.div
			className="group
				 border border-lond-gray/70 hover:border-lond-gray
				hover:shadow-lond-dark/20
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
						className="absolute w-full h-full flex items-center justify-center z-20 rounded-xl"
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
						>
							<CgSpinner className="text-6xl text-lond-text-primary" />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<Video src={src} ref={videoRef} preload="metadata"></Video>
			<div
				className="absolute w-full h-full inset-0 flex justify-center items-center rounded-[10px] z-10 transition-all duration-300 outline-none" // z-index ridotto
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
					console.log('ciao sto al click');
					if (document.activeElement !== overlayRef.current) {
						overlayRef.current?.focus();
					}
					console.log(document.activeElement == overlayRef.current);
				}}
				onKeyDown={(e) => {
					handleKeyDown(e);
				}}
				tabIndex={0}
			>
				<AnimatePresence>
					{!isPlaying && videoDuration !== videoRef.current?.currentTime && (
						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0, opacity: 0 }}
							whileTap={{ scale: 0.9 }}
							className="bg-lond-dark/70 backdrop-blur-xl rounded-full p-6 shadow-2xl"
						>
							<FaPlay className="text-4xl text-lond-text-primary ml-1" />
						</motion.button>
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
								className="bg-lond-gray/80 backdrop-blur-sm rounded-full p-6 shadow-2xl"
							>
								<VscDebugRestart className="text-4xl text-lond-text-primary" />
							</motion.div>
						)}
				</AnimatePresence>
			</div>

			<div
				className="bg-lond-dark/80 flex gap-2 flex-col backdrop-blur-md
				  rounded-b-lg p-3 shadow-2xl border-t border-lond-gray
		      absolute w-full bottom-0 z-30 transition-all duration-500  ease-in-out right-0
					opacity-0 group-hover:opacity-100"
			>
				{/* Timeline */}
				<div
					className="timeline w-full h-2 mb-3 bg-lond-gray/70
							rounded-full overflow-hidden cursor-pointer shadow-inner transition-all duration-200"
					// onClick={seekToPosition}
				>
					<div className="flex relative w-full h-full">
						{/* <motion.div
							className="play-progress bg-lond-text-primary rounded-full transition-all duration-200 flex h-full relative overflow-hidden z-30 "
							ref={progressRef}
						/> */}
						<LondiesProgressBar
							max={videoRef.current?.duration || 0}
							min={0}
							value={videoRef.current?.currentTime || 0}
							setValue={handleChangeProgressBar}
							type="youtube"
						/>
						<div
							className="buffer-progress flex bg-lond-light-gray/50 z-0 absolute h-full rounded-full"
							ref={bufferRef}
						/>
					</div>
				</div>

				{/* Controls */}
				<div className="flex w-full justify-between items-center">
					<div className="flex items-center gap-4">
						<motion.button
							className="flex items-center justify-center w-10 h-10 rounded-xl
									border-2 bg-lond-gray/80 backdrop-blur-sm
								 text-lond-text-primary hover:border-lond-light-gray
									border-lond-light-gray/50
									transition-all duration-300
		              "
							onClick={handlePlayPause}
							whileTap={{ scale: 0.95 }}
						>
							{isPlaying ? (
								<FaPause className="text-md" />
							) : (
								<FaPlay className="text-md ml-0.5" />
							)}
						</motion.button>

						<div
							className="font-bold font-lato bg-lond-gray/80
								backdrop-blur-sm px-3 py-1 rounded-xl border-2 border-lond-light-gray/50"
						>
							<span className="text-lond-text-primary">
								{time.min}:{time.sec}
							</span>
							<span className="text-lond-light-gray mx-2">/</span>
							<span className="text-lond-light-gray">
								{' '}
								{/* Leggermente meno enfasi sulla durata totale */}
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
								className="w-10 h-10 rounded-xl bg-lond-gray/80
										border-2 border-lond-light-gray/50 text-lond-text-primary backdrop-blur-sm transition-all duration-300 flex items-center justify-center
		                "
							>
								{volumeIcon}
							</motion.div>

							<AnimatePresence>
								{/*se vuoi che funziona il fatto del vlume devi togliere la condizione perchè deve essere sempre visibile*/}
								{/* {showVolumeSlider && ( */}
								<motion.div
									initial={{
										width: showVolumeSlider ? 0 : 96,
										opacity: showVolumeSlider ? 0 : 1,
									}}
									animate={{
										width: showVolumeSlider ? 96 : 0,
										opacity: showVolumeSlider ? 1 : 0,
									}}
									exit={{
										width: showVolumeSlider ? 0 : 96,
										opacity: showVolumeSlider ? 0 : 1,
									}}
									className="h-3 bg-lond-gray/70
												rounded-full overflow-hidden cursor-pointer shadow-inner"
									onClick={modifyVolume}
								>
									<div
										className="h-full bg-lond-text-primary rounded-full"
										ref={volumeRef}
									/>
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Playback Speed */}
						<div className="relative">
							<motion.button
								className="flex items-center gap-2 h-10 px-2 py-2 rounded-xl
										bg-lond-gray/80 backdrop-blur-sm border-2 border-lond-light-gray/50
										hover:border-lond-light-gray text-lond-text-primary transition-all duration-300"
								onClick={() => setIsOpen(!isOpen)}
								whileTap={{ scale: 0.95 }}
							>
								<div>
									<span className="font-bold text-md">{playbackRate}</span>
									<span className="text-sm font-bold">x</span>
								</div>
								<motion.div
									animate={{ rotate: isOpen ? 180 : 0 }}
									transition={{ duration: 0.2 }}
								>
									<FiChevronDown className="w-5 h-5 text-lond-light-gray" />
								</motion.div>
							</motion.button>

							<AnimatePresence>
								{isOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										className="bg-lond-dark/90 absolute bottom-full mb-3 left-0 w-24
												backdrop-blur-md border border-lond-gray rounded-xl shadow-2xl z-40"
									>
										<div
											className="w-full bg-lond-gray/80
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
																		? 'bg-lond-accent text-lond-text-primary shadow-lg'
																		: 'bg-transparent text-lond-light-gray hover:text-lond-text-primary'
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
							className="w-10 h-10 items-center justify-center flex rounded-xl bg-lond-gray/80 backdrop-blur-sm
									border-2 border-lond-light-gray/50 hover:border-lond-light-gray
									text-lond-text-primary transition-all duration-300"
						>
							{isFullScreen ? (
								<MdFullscreenExit className="text-2xl" />
							) : (
								<MdFullscreen className="text-2xl" />
							)}
						</motion.button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default VideoPlayer;
