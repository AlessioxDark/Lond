import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

const LondiesPlayerPlayButton = ({
	isPlaying,
	videoDuration,
	videoRef,
}: any) => {
	return (
		<AnimatePresence>
			{!isPlaying && videoDuration !== videoRef.current?.currentTime && (
				<motion.div
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					whileTap={{ scale: 0.9 }}
					className=" p-6  "
				>
					<FaPlay className="text-4xl text-white ml-1" />
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LondiesPlayerPlayButton;
