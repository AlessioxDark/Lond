import { useCallback } from 'react';
export const handleEmojiClick = (
	clickedEmoji: string,
	userReaction: string,
	setUserReaction: Function,
	setReactions: Function,
	setShowReactions: Function
) => {
	if (userReaction === clickedEmoji) {
		setReactions((prev) =>
			prev
				.map((r) =>
					r.emoji === clickedEmoji
						? { ...r, count: Math.max(0, r.count - 1) }
						: r
				)
				.filter((r) => r.count > 0)
		);
		setUserReaction('');
	} else {
		if (userReaction) {
			setReactions((prev) =>
				prev
					.map((r) =>
						r.emoji === userReaction
							? { ...r, count: Math.max(0, r.count - 1) }
							: r
					)
					.filter((r) => r.count > 0)
			);
		}

		setReactions((prev) => {
			const existing = prev.find((r) => r.emoji === clickedEmoji);
			if (existing) {
				return prev.map((r) =>
					r.emoji === clickedEmoji ? { ...r, count: r.count + 1 } : r
				);
			}
			return [...prev, { emoji: clickedEmoji, count: 1 }];
		});

		setUserReaction(clickedEmoji);
		setShowReactions(false);
	}
};

export const handleDoubleTapImgs = (isLiked, setIsLiked, e) => {
	e.preventDefault();
	if (!isLiked) {
		setIsLiked(true);
	}
};
export const handleDoubleTapVideos = (e, isLiked, setIsLiked, isPlaying) => {
	e.preventDefault();
	if (isPlaying) {
		if (!isLiked) {
			setIsLiked(true);
		}
	}
};
export const handleVideoClick = (
	e,
	isLiked,
	setIsLiked,
	isPlaying,
	clickTimeoutRef,
	handlePlayPause
) => {
	if (clickTimeoutRef.current) {
		clearTimeout(clickTimeoutRef.current);
		clickTimeoutRef.current = null;

		// Double click detected

		handleDoubleTapVideos(e, isLiked, setIsLiked, isPlaying);
	} else {
		// Start timer for single click
		clickTimeoutRef.current = setTimeout(() => {
			handlePlayPause(); // Single click logic
			clickTimeoutRef.current = null;
		}, 150); // 250ms: se entro questo tempo arriva un secondo click, è doppio
	}
};

export const cardVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
};

export const postContainerStyles =
	' relative group overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer backdrop-blur-sm  p-6 hover:shadow-xl shadow-lg  hover:shadow-slate-900/25  bg-slate-800/90  ';

// border-2 border-slate-500
