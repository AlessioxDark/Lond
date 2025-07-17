import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Bookmark, Heart, MessageCircle, Share, X } from 'lucide-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import PostComments from '../../post/utils/PostComments';
import InstagramPostDialog from '../../post/utils/PostDialog/InstagramPostDialog';
import LondiesPostDialog from '../../post/utils/PostDialog/LondiesPostDialog';
import YoutubePostDialog from '../../post/utils/PostDialog/YoutubePostDialog';

const PostDialog = ({ isOpen, onClose, PostDialogData }) => {
	const findComponent = useCallback(() => {
		switch (PostDialogData?.type) {
			case 'instagram':
				return <InstagramPostDialog PostDialogData={PostDialogData} />;
			case 'youtube':
				return <YoutubePostDialog PostDialogData={PostDialogData} />;
			case 'londies':
				return <LondiesPostDialog PostDialogData={PostDialogData} />;
			default:
				return null;
		}
	}, [PostDialogData]);
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
						<div className="bg-lond-gray rounded-lg shadow-2xl w-[70vw]  flex flex-col z-40 relative">
							<button
								onClick={onClose}
								className="text-lond-light-gray hover:text-lond-text-primary transition-colors p-1 float-right absolute top-4 right-4 z-50"
							>
								<X size={25} />
							</button>

							<div className="flex flex-row h-[94vh] p-3">
								{findComponent()}

								<PostComments />
							</div>
						</div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default PostDialog;
