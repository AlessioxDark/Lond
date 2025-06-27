import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Share } from 'lucide-react';
import { useState } from 'react';
const LondiesSocialIcon = ({ icon: Icon, isActive, onClick, count }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div className=" flex items-center flex-col">
			<motion.button
				onClick={onClick}
				className={`
					relative  rounded-full focus:outline-none
					transition-colors duration-200 
					
          ${isActive ? 'text-slate-100 ' : 'text-slate-400 hover:text-white '}
				`}
				/* {`
	//   group relative  rounded-3xl
	//   transition-all duration-300 ease-out transform
	 `}*/
				whileTap={{ scale: 0.85 }}
			>
				<Icon
					size={30}
					className={` transition-all duration-300 ease-out transform `}
					fill={
						isActive && Icon !== Share
							? Icon === Heart
								? 'red'
								: 'white'
							: isHovered && Icon !== Share
							? 'rgba(255, 255, 255, 0.3)'
							: 'none'
					}
					stroke={Icon == Heart && isActive ? 'red' : 'white'}
					stroke-width={1.5}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				/>
			</motion.button>
			<span>
				<span className="text-md font-medium text-white tracking-wide">
					{count}
				</span>
			</span>
		</div>
	);
};

export default LondiesSocialIcon;
