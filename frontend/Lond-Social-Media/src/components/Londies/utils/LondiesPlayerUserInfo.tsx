import { motion } from 'framer-motion';
import { Check, Plus, Verified } from 'lucide-react';
import React from 'react';
const LondiesPlayerUserInfo = ({
	pfp,
	name,
	isVerified,
	handle = '@alessio40',
}: any) => {
	return (
		<div className={`flex items-center gap-3 `}>
			<div className="relative flex-shrink-0">
				<img
					src={pfp}
					alt={`${name} profile`}
					className={`w-11 h-11 rounded-full ring-1 ring-slate-700/40 hover:ring-purple-500/60 transition-all duration-300 cursor-pointer`}
					loading="lazy"
				/>
			</div>

			<div className="flex  flex-col">
				<div className="flex items-center gap-1 flex-wrap">
					<span
						className={`text-white text-sm truncate font-Montserrat font-medium`}
					>
						{name}
					</span>

					{isVerified && (
						<Verified
							size={16}
							className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 flex-shrink-0"
							aria-label="Account verificato"
						/>
					)}
				</div>
				<span className="truncate text-xs text-slate-400">{handle}</span>
			</div>
		</div>
	);
};

export default LondiesPlayerUserInfo;
