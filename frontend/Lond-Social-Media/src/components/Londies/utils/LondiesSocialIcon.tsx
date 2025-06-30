import { AnimatePresence, motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { useState } from 'react';
const LondiesSocialIcon = ({ icon: Icon, isActive, onClick, count }) => {
	const getIconVariants = () => {
		switch (Icon) {
			case Heart:
				return {
					idle: { scale: 1, rotate: 0 },
					pressed: {
						scale: [1, 1.3, 1.1, 1],
						rotate: [0, -15, 15, 0],
						transition: { duration: 0.4, ease: 'easeOut' },
					},
					active: {
						scale: [1, 1.2, 1],
						transition: { duration: 0.3, ease: 'backOut' },
					},
				};
			case Share:
				return {
					idle: { scale: 1, rotate: 0, x: 0 },
					pressed: {
						x: [0, -3, 3, -2, 2, 0],
						rotate: [0, -10, 10, -5, 5, 0],
						transition: { duration: 0.5, ease: 'easeInOut' },
					},
				};
			case MessageCircle:
				return {
					idle: { scale: 1, rotate: 0 },
					pressed: {
						scale: [1, 0.9, 1.1, 1],
						rotate: [0, -20, 20, 0],
						transition: { duration: 0.4, ease: 'easeOut' },
					},
				};
			case Bookmark:
				return {
					idle: { scale: 1, y: 0 },
					pressed: {
						y: [0, -5, 2, 0],
						scale: [1, 1.1, 0.95, 1],
						transition: { duration: 0.4, ease: 'easeOut' },
					},
					active: {
						y: [0, -3, 0],
						transition: { duration: 0.2, ease: 'easeOut' },
					},
				};
			default:
				return {
					idle: { scale: 1 },
					pressed: { scale: [1, 0.9, 1] },
				};
		}
	};

	return (
		<div className="flex flex-col items-center relative">
			<motion.button
				onClick={onClick}
				className="rounded-full relative z-10"
				whileTap={{ scale: 0.9 }}
			>
				{/* Particelle per il like */}
				<AnimatePresence>
					{Icon === Heart && isActive && (
						<>
							{[...Array(6)].map((_, i) => (
								<motion.div
									key={i}
									className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full"
									initial={{
										scale: 0,
										x: -2,
										y: -2,
										opacity: 1,
									}}
									animate={{
										scale: [0, 1, 0],
										x: Math.cos((i * Math.PI * 2) / 6) * 25,
										y: Math.sin((i * Math.PI * 2) / 6) * 25,
										opacity: [1, 1, 0],
										transition: {
											duration: 0.6,
											delay: i * 0.05,
											ease: 'easeOut',
										},
									}}
									exit={{ opacity: 0 }}
								/>
							))}
						</>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{Icon === Bookmark && isActive && (
						<>
							{[...Array(6)].map((_, i) => (
								<motion.div
									key={i}
									className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
									initial={{
										scale: 0,
										x: -2,
										y: -2,
										opacity: 1,
									}}
									animate={{
										scale: [0, 1, 0],
										x: Math.cos((i * Math.PI * 2) / 6) * 25,
										y: Math.sin((i * Math.PI * 2) / 6) * 25,
										opacity: [1, 1, 0],
										transition: {
											duration: 0.6,
											delay: i * 0.05,
											ease: 'easeOut',
										},
									}}
									exit={{ opacity: 0 }}
								/>
							))}
						</>
					)}
				</AnimatePresence>

				<motion.div initial="idle" variants={getIconVariants()}>
					<Icon
						size={32}
						className={`
              transition-colors duration-200
              ${Icon === Heart && isActive ? 'text-red-500' : 'text-white'}
              ${
								Icon === Bookmark && isActive ? 'text-yellow-400' : 'text-white'
							}
            `}
						fill={
							Icon === Heart && isActive
								? 'red'
								: Icon === Bookmark && isActive
								? 'white'
								: 'none'
						}
						stroke={Icon === Heart && isActive ? 'red' : 'white'}
						strokeWidth={1.5}
					/>
				</motion.div>
			</motion.button>

			{/* Contatore animato */}
			<AnimatePresence mode="wait">
				<motion.span
					key={count}
					className="text-md text-white font-medium "
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					{count}
				</motion.span>
			</AnimatePresence>
		</div>
	);
};

export default LondiesSocialIcon;
