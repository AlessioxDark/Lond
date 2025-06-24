import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { useTimeoutFn } from 'react-use';
import ImgStory from './post/pages/story/ImgStory';
import StoryPlayer from './post/pages/story/StoryPlayer';
const Ex = () => {
	let [isShowing, setIsShowing] = useState(true);
	let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);
	const [isImg, setIsImg] = useState<boolean>();

	return (
		<div className="w-[95%] h-[95%] pl-52">
			<Transition
				as={Fragment}
				show={isShowing}
				enter="transition duration-1000 ease-out"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Dialog
					open={isShowing}
					onClose={() => {
						setIsShowing(false);
					}}
					className="absolute top-0 z-50 w-screen h-screen"
				>
					<div className="w-screen h-screen  ">
						<DialogPanel className="w-full h-screen border bg-black/80 py-4 transition duration-300 ease-in data-closed:opacity-0 ">
							<div
								className={`w-full flex justify-center h-full rounded-xl shadow  `}
							>
								<div className="w-[40%] h-full flex flex-row items-center gap-5">
									<IoIosArrowDropleftCircle className=" text-white bg-[rgba(0,0,0,0.5)] rounded-full w-9 h-9 " />
									<div className="h-full w-[45rem]">
										{isImg ? (
											<ImgStory
												isOpen={isShowing}
												onClose={() => {
													setIsShowing(false);
												}}
												content={isShowing}
												forward={() => {}}
											/>
										) : (
											<StoryPlayer
												isOpen={isShowing}
												onClose={() => {
													setIsShowing(false);
												}}
												content={isShowing}
												forward={() => {}}
											></StoryPlayer>
										)}
									</div>
									<IoIosArrowDroprightCircle className="text-white bg-[rgba(0,0,0,0.5)] rounded-full w-9 h-9 " />
								</div>
							</div>
						</DialogPanel>
					</div>
				</Dialog>
			</Transition>

			<button
				onClick={() => {
					setIsShowing(true);
				}}
				className="backface-visibility-hidden mt-8 flex transform items-center rounded-full bg-black/20 px-3 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-black/30 focus:outline-none active:bg-black/40"
			>
				<span className="ml-3">Click to transition</span>
			</button>
		</div>
	);
};

export default Ex;
