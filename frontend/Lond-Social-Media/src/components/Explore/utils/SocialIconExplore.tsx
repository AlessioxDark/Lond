import { motion } from 'framer-motion';
import { Repeat2, Share } from 'lucide-react';
const SocialIconExplore = ({ Icon, count, isActive, onClick }: any) => {
	return (
		<motion.div
			className="flex items-center gap-1"
			onClick={onClick}
			whileTap={{ scale: 0.8 }}
		>
			<Icon
				size={15}
				className={`transition-transform `}
				fill={isActive && Icon !== Share && Icon !== Repeat2 ? 'white' : 'none'}
				stroke={isActive ? 'white' : 'rgb(144, 161, 185)'}
			/>
			<span className={`${isActive ? 'text-white' : 'text-slate-400'}`}>
				{count}
			</span>
		</motion.div>
	);
};

export default SocialIconExplore;
