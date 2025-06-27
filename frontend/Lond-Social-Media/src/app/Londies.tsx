import { useEffect, useRef, useState } from 'react';
import pfp from '../assets/pfp.png';
import videoEx from '../assets/TikTokVideo.mp4';
import LondiesPlayer from '../components/Londies/utils/LondiesPlayer';
const Londies = () => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const LondiesRef = useRef<HTMLDivElement>(null);
	const videoRefs = useRef<HTMLVideoElement[]>([]);

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

	useEffect(() => {
		const intersectionObserverOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.5,
		};
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = videoRefs.current.indexOf(entry.target);
					if (index !== -1) {
						setCurrentVideoIndex(index);
					}
				}
			});
		}, intersectionObserverOptions);
		videoRefs.current.forEach((video) => {
			if (video) {
				observer.observe(video);
			}
		});
		// Pulizia dell'osservatore
		return () => {
			videoRefs.current.forEach((video) => {
				if (video) {
					observer.unobserve(video);
				}
			});
			observer.disconnect();
		};
	}, []);
	useEffect(() => {
		console.log(currentVideoIndex);
	}, [currentVideoIndex]);
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
						ref={(el) => {
							videoRefs.current[index] = el;
						}}
					>
						<div className="aspect-[9/16] ">
							<LondiesPlayer
								currentVideoIndex={currentVideoIndex}
								index={index}
								src={src}
								name="Alessio Quaranta"
								pfp={pfp}
								desc="Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter."
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Londies;
