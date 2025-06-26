import { useEffect, useRef, useState } from 'react';
import videoEx from '../assets/TikTokVideo.mp4';
import LondiesPlayer from '../components/Londies/utils/LondiesPlayer';

const Londies = () => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

	const londies = [
		videoEx,
		videoEx,
		videoEx,
		videoEx,
		videoEx,
		videoEx,
		videoEx,
		videoEx,
		videoEx,
	];
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const intersectionObserverOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.5,
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				setCurrentVideoIndex(londies.indexOf(entry));
			}
		});
	});
	londies.forEach((londie) => {
		observer.observe(londie), intersectionObserverOptions;
	});

	return (
		<div
			className="w-[85%] relative overflow-y-scroll snap-y snap-mandatory scroll-smooth"
			style={{ height: 'calc(100vh - 80px)', scrollbarWidth: 'none' }}
		>
			<div className="flex flex-col gap-5">
				{londies.map((src, index) => (
					<div
						key={index}
						className="h-[85vh] w-full flex justify-center snap-center"
					>
						<div className="aspect-[9/16] " ref={londie}>
							<LondiesPlayer
								currentVideoIndex={currentVideoIndex}
								index={index}
								src={src}
								isLiked={index % 2 === 0}
								setIsLiked={() => {}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Londies;
