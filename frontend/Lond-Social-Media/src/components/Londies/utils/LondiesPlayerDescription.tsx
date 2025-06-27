import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
const LondiesPlayerDescription = ({
	descRef,
	isDescVisible,
	desc,
	setIsDescVisible,
}: any) => {
	const expandDescription = () => {
		setIsDescVisible(false);
	};

	return (
		<div>
			<div className="flex gap-1">
				<AnimatePresence mode={'wait'}>
					<motion.div
						key={isDescVisible ? 'collapsed' : 'expanded'}
						className={`text-white text-sm font-light drop-shadow-lg overflow-hidden `}
						ref={descRef}
						animate={{
							height: isDescVisible ? '1.25rem' : 'auto',
						}}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.2,
						}}
						style={{
							display: '-webkit-box',
							WebkitLineClamp: isDescVisible ? 1 : 'unset',
							WebkitBoxOrient: 'vertical',
						}}
					>
						{desc}
					</motion.div>
				</AnimatePresence>

				{desc.length > 58 && isDescVisible && (
					<motion.button
						whileTap={{ scale: 0.9 }}
						className="text-white/80 text-sm font-medium hover:text-white transition-colors duration-200 ml-1"
						onClick={expandDescription}
					>
						altro
					</motion.button>
				)}
			</div>
		</div>
	);
};

export default LondiesPlayerDescription;
