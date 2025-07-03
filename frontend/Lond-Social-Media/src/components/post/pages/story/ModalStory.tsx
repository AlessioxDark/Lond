import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { Fragment, isValidElement, useEffect, useState } from 'react';
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from 'react-icons/io';
import ImgStory from './ImgStory';
import StoryPlayer from './StoryPlayer';
interface modalStoryProps {
	stories: Array<any>;
	currentStoryIndex: number;
	setCurrentStoryIndex: (index: number) => void;
	isOpen: boolean;
	onClose: () => void;
}
const ModalStory = ({
	isOpen,
	onClose,
	stories,
	currentStoryIndex,
	setCurrentStoryIndex,
}: modalStoryProps) => {
	const [direction, setDirection] = useState<1 | -1>(1);
	const [isImg, setIsImg] = useState<boolean>();
	const allowedImgExtensions = ['webp', 'png', 'jpg'];
	const allowedVideoExtensions = ['mp4', 'mkv'];

	const goForward = () => {
		if (currentStoryIndex + 1 < stories.length + 1) {
			setDirection(1);
			setCurrentStoryIndex(currentStoryIndex + 1);
			console.log('avanti');
		}
	};
	const goBackwards = () => {
		if (currentStoryIndex - 1 > -1) {
			setDirection(-1);
			setCurrentStoryIndex(currentStoryIndex - 1);
			console.log('indietro');
		}
	};
	useEffect(() => {
		const extension = stories[currentStoryIndex].content.split('.')[1];
		if (allowedImgExtensions.includes(extension)) {
			setIsImg(true);
		} else if (allowedVideoExtensions.includes(extension)) {
			setIsImg(false);
		} else {
			console.error('Unsupported file type:', extension);
			setIsImg(true); // fallback to image
		}
	}, [currentStoryIndex]);

	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-hidden">
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 flex items-center justify-center p-4">
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="w-full  h-full max-h-[96vh] flex items-center justify-center gap-4">
							{/* Previous button */}
							<motion.button
								onClick={goBackwards}
								disabled={currentStoryIndex === 0}
								whileTap={{ scale: 0.9 }}
								className="w-12 h-12 rounded-full bg-lond-dark/70 backdrop-blur-md border border-lond-light-gray/20 hover:border-lond-light-gray/40 flex items-center justify-center text-lond-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
							>
								<ChevronLeft size={24} />
							</motion.button>

							{/* Story content */}
							<div className="flex-1 h-full max-w-[48rem]">
								<AnimatePresence mode="wait" initial={false}>
									<motion.div
										key={currentStoryIndex}
										className="h-full w-full"
										initial={{ opacity: 0, x: direction * 100, scale: 0.95 }}
										animate={{ opacity: 1, x: 0, scale: 1 }}
										exit={{ opacity: 0, x: direction * -100, scale: 0.95 }}
										transition={{
											x: { type: 'spring', stiffness: 300, damping: 30 },
											opacity: { duration: 0.2 },
											scale: { duration: 0.2 },
										}}
									>
										{isImg ? (
											<ImgStory
												isOpen={isOpen}
												onClose={onClose}
												content={stories[currentStoryIndex]}
												forward={goForward}
											/>
										) : (
											<StoryPlayer
												isOpen={isOpen}
												onClose={onClose}
												content={stories[currentStoryIndex]}
												forward={goForward}
											/>
										)}
									</motion.div>
								</AnimatePresence>
							</div>

							{/* Next button */}
							<motion.button
								onClick={goForward}
								whileTap={{ scale: 0.9 }}
								className="w-12 h-12 rounded-full bg-lond-dark/70 backdrop-blur-md border border-lond-light-gray/20 hover:border-lond-light-gray/40 flex items-center justify-center text-lond-text-primary transition-all duration-300 hover:shadow-lg"
							>
								<ChevronRight size={24} />
							</motion.button>
						</div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ModalStory;
