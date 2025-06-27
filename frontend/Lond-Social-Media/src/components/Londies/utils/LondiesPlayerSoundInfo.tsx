import { AnimatePresence, motion } from 'framer-motion';
import { Disc3, Music, Volume2 } from 'lucide-react';
import React from 'react';
const LondiesPlayerSoundInfo = () => {
	return (
		<div className="relative">
			{/* Contenitore principale */}
			<div className="relative flex items-center gap-3 px-2 py-1 rounded-2xl border border-white/20 bg-black/20 backdrop-blur-md">
				{/* Disco rotante con effetti */}
				<div className="relative">
					<motion.div
						animate={{
							rotate: 360,
							scale: 1,
						}}
						transition={{
							rotate: {
								repeat: Infinity,
								duration: 4,
								ease: 'linear',
							},
							scale: {
								duration: 0.3,
								ease: 'easeInOut',
							},
						}}
						className="relative"
					>
						<Disc3 className="w-7 h-7 text-white " />
					</motion.div>

					{/* Punto centrale del disco */}
				</div>

				{/* Visualizzatore audio */}

				{/* Testo del suono con effetti */}
				<div className="flex items-center gap-2 flex-1">
					<Music className="w-4 h-4 text-slate-300" />

					<p className="text-white font-medium text-sm bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
						Suono originale
					</p>
				</div>

				{/* Pulsante play/pause */}

				{/* Icona volume con animazione */}
			</div>
		</div>
	);
};

export default LondiesPlayerSoundInfo;
