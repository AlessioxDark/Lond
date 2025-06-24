import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
const Searchbar = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	};
	return (
		<motion.div variants={itemVariants} className="mb-8 ">
			<div className="relative w-[70%] mx-auto">
				<Search
					className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10"
					size={20}
				/>
				<input
					type="text"
					placeholder="Cerca contenuti, persone, hashtag..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className=" w-full pl-12 pr-4 py-4 h-full bg-slate-800/50 border border-slate-700/50 rounded-2xl 
                             text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm
                             transition-all duration-300"
				/>
				{searchQuery !== '' && (
					<X
						className="absolute text-white text-4xl left-full  "
						onClick={() => {
							setSearchQuery('');
						}}
					/>
				)}
			</div>
		</motion.div>
	);
};

export default Searchbar;
