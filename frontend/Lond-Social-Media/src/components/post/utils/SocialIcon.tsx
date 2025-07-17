import { motion } from 'framer-motion';
import { Heart, Repeat2, Share } from 'lucide-react';
import { useState } from 'react';
const SocialIcon = ({ icon: Icon, isActive, onClick, count, label }) => {
	// <button
	// 	onClick={onClick}
	// 	className={`
	//     group relative flex items-center gap-2 px-3.5 py-2.5 rounded-3xl
	//      transition-all duration-300 ease-out transform

	//     ${
	// 			isActive
	// 				? 'text-white bg-slate-200/20   '
	// 				: 'text-slate-200 hover:text-white  hover:bg-white/10   '
	// 		}
	//   `}
	// >
	// 	<Icon size={16} className="transition-transform" />
	// 	<span className="text-xs font-semibold tracking-wide">{count}</span>
	// 	{isActive && <div className="absolute inset-0 rounded-xl  -z-10" />}
	// </button>
	const [isHover, setIsHover] = useState(false);
	const iconSize = 22; // Dimensione un po' più grande
	const iconStrokeWidth = 1.5;

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
		<motion.button
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			title={label} // Utile per accessibilità
			className={`
        group relative flex items-center gap-2 px-3 py-2 rounded-full
        transition-all duration-300 ease-out transform font-barlow
        hover:bg-lond-gray/50 
      `}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Icon
				size={iconSize}
				fill={iconFill}
				stroke={iconStroke}
				strokeWidth={iconStrokeWidth}
				className={`transition-colors duration-200 
          ${!isActive && isHover ? 'stroke-lond-text-primary' : ''}
        
        `}
			/>
			{count !== undefined && (
				<span
					className={`text-xs font-semibold tracking-wide ${countColorClass} ${
						isHover && !isActive && 'text-lond-text-primary'
					}`}
				>
					{count}
				</span>
			)}
		</motion.button>
	);
};
// 	<button
// 		onClick={onClick}
// 		className={`
//     group relative flex items-center gap-2 px-3 py-2 rounded-full
//     transition-all duration-300 ease-out transform font-barlow
//     ${
// 			isActive
// 				? 'text-lond-accent'
// 				: 'text-lond-light-gray hover:text-lond-accent hover:bg-lond-accent/10'
// 		}
//   `}
// 	>
// 		<Icon size={22} className="transition-transform" />
// 		<span className="text-xs font-semibold tracking-wide">{count}</span>
// 		{/* isActive && (
// 			<div className="absolute inset-0 rounded-full -z-10 bg-lond-accent/10" />
// 		)*/}
// 	</button>
// );
export default SocialIcon;
