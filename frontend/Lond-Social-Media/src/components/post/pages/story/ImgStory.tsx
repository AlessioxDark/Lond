import { motion } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface imgStoryProps {
	onClose: () => void;
	isOpen: boolean;
	content: object;
	forward: () => void;
}
const ImgStory = ({ content, onClose, isOpen, forward }: imgStoryProps) => {
	const progressRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(true);
	const elapsedRef = useRef<number>(0); // tiene traccia del tempo trascorso
	const handlePlayPause = () => {
		setIsPlaying((prevPlay) => !prevPlay);
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;
		const duration = 5000;

		if (isOpen && isPlaying) {
			const start = Date.now() - elapsedRef.current; // riparte da dove era

			interval = setInterval(() => {
				const elapsed = Date.now() - start;
				elapsedRef.current = elapsed; // aggiorna continuamente il tempo trascorso

				const percent = Math.min((elapsed / duration) * 100, 100);
				if (progressRef.current) {
					progressRef.current.style.width = `${percent}%`;
				}

				if (elapsed >= duration && progressRef.current) {
					clearInterval(interval);
					elapsedRef.current = 0; // reset per la prossima storia
					progressRef.current.style.width = `0%`;
					forward();
				}
			}, 100);
		}

		return () => clearInterval(interval);
	}, [isOpen, isPlaying, content]);

	return (
		<div className="h-full w-full relative rounded-2xl overflow-hidden bg-lond-gray border border-lond-light-gray/10 shadow-2xl">
			{/* Background image with overlay */}
			<div className="absolute inset-0">
				<img
					src={content.content}
					className="w-full h-full object-cover"
					alt="Story content"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
			</div>

			{/* Header */}
			<div className="absolute top-0 left-0 right-0 z-30 p-4">
				{/* Progress bar */}
				<div className="w-full h-1 bg-lond-light-gray/30 rounded-full overflow-hidden mb-4">
					<div
						className="h-full bg-lond-text-primary rounded-full transition-all duration-100 ease-linear"
						ref={progressRef}
					>
						{/* Questo div interno non sembra necessario se il parent ha già il colore di progresso */}
						{/* <div className="h-full bg-slate-500/60 rounded-full transition-all duration-100 ease-linear" /> */}
					</div>
				</div>

				{/* User info and controls */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<img
							src={content.pfp}
							alt={`${content.name} profile`}
							className="w-10 h-10 rounded-full ring-2 ring-lond-light-gray/30"
						/>
						<span className="font-semibold text-lond-text-primary font-montserrat text-sm">
							{content.name}
						</span>
					</div>

					<div className="flex items-center gap-3">
						<motion.button
							onClick={handlePlayPause}
							whileTap={{ scale: 0.9 }}
							className="w-8 h-8 rounded-full bg-lond-dark/70 backdrop-blur-sm flex items-center justify-center text-lond-text-primary font-lato border-2 border-lond-light-gray/50 transition-all duration-300"
						>
							{isPlaying ? <Pause size={16} /> : <Play size={16} />}
						</motion.button>

						<motion.button
							onClick={onClose}
							whileTap={{ scale: 0.9 }}
							className="w-8 h-8 rounded-full bg-lond-dark/70 backdrop-blur-sm flex items-center justify-center text-lond-text-primary font-lato border-2 border-lond-light-gray/50 transition-all duration-300"
						>
							<X size={16} />
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImgStory;
