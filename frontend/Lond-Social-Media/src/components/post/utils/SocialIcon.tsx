import { Heart, Repeat2, Share } from 'lucide-react';
import { useState } from 'react';

const SocialIcon = ({ icon: Icon, isActive, onClick, count }) => {
	const [isHover, setIsHover] = useState(false);
	const loadFillColor = () => {
		if (Icon == Heart && isActive) {
			return 'red';
		}

		if (isActive && Icon !== Repeat2 && Icon !== Share) {
			return '#2563eb';
		} else {
			return 'none';
		}
	};
	const loadStrokeColor = () => {
		if (Icon == Heart && isActive) {
			return 'red';
		}

		if (isActive && Icon !== Repeat2 && Icon !== Repeat2 && Icon !== Share) {
			return '#2563eb';
		} else {
			return 'currentColor';
		}
	};
	return (
		<button
			onClick={onClick}
			className={`
    group relative flex items-center gap-2 px-3 py-2 rounded-full
    transition-all duration-300 ease-out transform font-barlow
   
    
  `}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Icon
				size={23}
				className={`"transition-transform ${
					isActive && Icon === Repeat2 && 'text-lond-accent'
				}`}
				fill={loadFillColor()}
				stroke={loadStrokeColor()}
				strokeWidth={1.2}
			/>
			<span className="text-xs font-semibold tracking-wide">{count}</span>
		</button>
	);
};
export default SocialIcon;
