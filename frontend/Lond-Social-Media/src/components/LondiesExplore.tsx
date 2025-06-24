import React, { useState } from 'react';
import CommentsIcon from './Icons/CommentsIcon';
import HeartIcon from './Icons/HeartIcon';
import SavedIcon from './Icons/SavedIcon';
import LondiesPlayer from './post/utils/LondiesPlayer';
interface LondiesExplore {
	images: Array<any>;
	name: string;
	title: string;
	like: string;
	desc: string;
	comments: string;
	saved: string;
	profile: string;
	handle: string;
	createdAt: Date;
}
const LondiesExplore = ({
	images,
	name,
	profile,
	like,
	comments,
	saved,
	handle,
	createdAt,
}: LondiesExplore) => {
	const [isComments, setIsComments] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	return (
		<div className="bg-[#1d1d1f] ring-2 ring-black p-4 w-[37.5%] sm:p-5 h-full hover:bg-[#2a2a2d] transition-colors duration-200 cursor-pointer group inline ">
			<div className="flex items-center gap-3 mb-4">
				<img src={profile} className="w-12 h-12 rounded-full " alt="" />
				<div className="flex flex-col">
					<span className="font-semibold text-white font-Montserrat">
						{name}
					</span>
					<span className="text-sm text-gray-400">{handle}</span>
				</div>
			</div>
			<div className="flex flex-col items-start h-[84%] min-w-[117.5rem] max-w-[117.5rem]">
				<LondiesPlayer />
			</div>
			<div className="flex flex-row gap-5 items-center w-14 mt-10">
				{/* <HeartIcon like={like} setIsLiked={setIsLiked} isLiked={isLiked} /> */}

				{/* <SavedIcon isSaved={isSaved} setIsSaved={setIsSaved} saved={saved} /> */}
			</div>
		</div>
	);
};

export default LondiesExplore;
