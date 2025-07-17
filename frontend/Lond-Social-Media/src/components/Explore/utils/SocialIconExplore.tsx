import { motion } from 'framer-motion';
import { Heart, Repeat2, Share } from 'lucide-react';
import { useState } from 'react';
const SocialIconExplore = ({ Icon, count, isActive, onClick }: any) => {
	const [isHover, setIsHover] = useState(false);
	const iconSize = 15; // Dimensione un po' più grande

	let iconFill = 'none';
	let iconStroke = 'var(--color-lond-light-gray)'; // Colore di default per stroke (inattivo)
	let countColorClass = 'text-lond-light-gray'; // Colore di default per il contatore

	if (isActive) {
		if (Icon === Heart) {
			iconFill = 'var(--color-lond-red)';
			iconStroke = 'var(--color-lond-red)';
			countColorClass = 'text-lond-red';
		} else if (Icon === Repeat2) {
			// Esempio per Retweet, potrebbe solo cambiare colore testo/conteggio
			iconStroke = 'var(--color-lond-accent)'; // O solo il colore del conteggio, vedi sotto
			countColorClass = 'text-lond-accent';
		} else if (Icon !== Share) {
			// Per le altre icone attive (non Share)
			iconFill = 'var(--color-lond-accent)';
			iconStroke = 'var(--color-lond-accent)';
			countColorClass = 'text-lond-accent';
		} else {
			// Icona Share potrebbe non cambiare colore o avere un trattamento diverso
			iconStroke = 'var(--color-lond-light-gray)'; // Mantiene il colore di stroke base
		}
		if (Icon == Share) {
			iconStroke = 'var(--color-lond-red)';
		}
	}
	return (
		<motion.div
			className="flex items-center gap-1"
			onClick={onClick}
			whileTap={{ scale: 0.8 }}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Icon
				size={iconSize}
				fill={iconFill}
				className={`transition-colors duration-200 
          ${!isActive && isHover ? 'stroke-lond-text-primary' : ''}
        
        `}
				// fill={isActive && Icon !== Share && Icon !== Repeat2 ? 'white' : 'none'}
				// stroke={isActive ? 'white' : 'rgb(144, 161, 185)'}

				stroke={iconStroke}
			/>
			<span
				// className={`${isActive ? 'text-white' : 'text-slate-400'}`}
				className={`text-xs font-semibold tracking-wide ${countColorClass} ${
					isHover && !isActive && 'text-lond-text-primary'
				}`}
			>
				{count}
			</span>
		</motion.div>
	);
};

export default SocialIconExplore;
