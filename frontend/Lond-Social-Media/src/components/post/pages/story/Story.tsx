import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { cardVariants } from '../../utils/funcs/HomeFuncs';
import ModalStory from './ModalStory';
interface StoryProps {
	stories: Array<any>;
	index: number;
	cover: string;
	content: any;
	pfp: string;
	name: string;
	isViewed: boolean;
}

const Story = ({ stories, pfp, index, name, isViewed }: StoryProps) => {
	const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
	const [isOpen, setIsOpen] = useState(false);

	const handleStoryClick = () => {
		setIsOpen(true);
		setCurrentStoryIndex(index);
	};

	return (
		<motion.div
			className="max-w-26 min-w-26 flex-shrink-0 h-full flex flex-col items-center justify-center p-1"
			variants={cardVariants}
			animate="animate"
			initial="initial"
		>
			<motion.div
				className="relative cursor-pointer group max-w-26 min-w-26 min-h-26 max-h-26"
				whileTap={{ scale: 0.95 }}
				onClick={handleStoryClick}
			>
				{/* Outer gradient ring */}
				<motion.div
					className="absolute inset-0 rounded-full w-full p-[3px] shadow-lg"
					style={{
						background: isViewed
							? '#6b7280'
							: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)',
					}}
					animate={{ rotate: 360 }}
					transition={{
						repeat: Infinity,
						duration: 3,
						ease: 'linear',
					}}
				>
					<motion.div
						className="relative w-full h-full rounded-full overflow-hidden"
						animate={{ rotate: -360 }}
						transition={{
							repeat: Infinity,
							duration: 3,
							ease: 'linear',
						}}
					>
						<img
							className="w-full h-full object-cover transition-all duration-300"
							src={pfp}
							alt={`${name}'s story`}
						/>
					</motion.div>
				</motion.div>
			</motion.div>

			<motion.div className="mt-3 px-3 py-1 rounded-xl">
				<span
					className={`text-xs font-medium tracking-wide truncate max-w-[100px] block text-center ${
						isViewed ? 'text-gray-400' : 'text-white'
					}`}
				>
					{name}
				</span>
			</motion.div>

			<ModalStory
				currentStoryIndex={currentStoryIndex}
				setCurrentStoryIndex={setCurrentStoryIndex}
				stories={stories}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</motion.div>
	);
};

export default Story;
