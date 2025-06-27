import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import React from 'react';
const LondiesPlayerUserInfo = ({ pfp, name, isVerified }: any) => {
	return (
		<div className={`flex items-center gap-2`}>
			<div className={`flex items-center gap-2`}>
				<div className="relative flex-shrink-0">
					<img
						src={pfp}
						alt={`${name} profile`}
						className={`w-10 h-10 rounded-full ring-1 ring-slate-700/40 hover:ring-purple-500/60 transition-all duration-300 cursor-pointer`}
						loading="lazy"
					/>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<motion.span className="text-white text-sm font-semibold truncate bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
							{name}
						</motion.span>

						{/* Badge verificato */}
						{isVerified && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: 'spring', stiffness: 500, damping: 30 }}
								className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
							>
								<Check className="w-2.5 h-2.5 text-white" />
							</motion.div>
						)}
					</div>
				</div>
				<motion.button
					className={`px-3 py-2 rounded-full font-medium text-sm transition-all duration-200 text-white ${'bg-[#253141] hover:bg-slate-700  shadow-lg shadow-black/25'}`}
					whileTap={{ scale: 0.95 }}
				>
					<div className="flex items-center">
						<span>Follow</span>
					</div>
				</motion.button>
			</div>
		</div>
	);
};

export default LondiesPlayerUserInfo;
