import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import pfp from '../../../assets/pfp.png'; // Adjust the path as necessary
import CommentItem from './CommentItem';
const LondiesComments = ({ handleClose }) => {
	const SAMPLE_COMMENTS = [
		{
			id: '1',
			name: 'Marco Rossi',
			username: '@marcoross',
			isVerified: true,
			text: "Bellissimo contenuto! Mi piace molto come hai gestito l'animazione. Continua così! 🚀",
			likesCount: 24,
			isLiked: false,
			createdAt: new Date('2025-06-29T10:30:00'),
			replies: [
				{
					id: '1-1',
					name: 'Giulia Bianchi',
					username: '@giuliab',
					isVerified: false,
					text: "Sono d'accordo! Ottimo lavoro 👏",
					likesCount: 8,
					isLiked: true,
					createdAt: new Date('2025-06-29T11:15:00'),
					replies: [],
				},
				{
					id: '1-2',
					name: 'Alessandro Tech',
					username: '@alextech',
					isVerified: true,
					text: 'Quale libreria hai usato per le animazioni? Framer Motion?',
					likesCount: 12,
					isLiked: false,
					createdAt: new Date('2025-06-29T12:00:00'),
					replies: [],
				},
			],
			areRepliesVisible: false,
		},
		{
			id: '2',
			name: 'Sara Developer',
			username: '@saradev',
			isVerified: true,
			text: 'Il design è fantastico! Potresti condividere il codice sorgente? Sarebbe molto utile per la community. 💻✨',
			likesCount: 45,
			isLiked: true,
			createdAt: new Date('2025-06-29T09:45:00'),
			replies: [
				{
					id: '2-1',
					name: 'Luca Frontend',
					username: '@lucafront',
					isVerified: false,
					text: "Sì, per favore! Anch'io sono interessato 🙏",
					likesCount: 6,
					isLiked: false,
					createdAt: new Date('2025-06-29T10:00:00'),
					replies: [],
				},
			],
			areRepliesVisible: false,
		},
		{
			id: '3',
			name: 'Paolo Designer',
			username: '@paolodesign',
			isVerified: false,
			text: 'La palette di colori è perfetta per il tema dark. Complimenti! 🎨',
			likesCount: 18,
			isLiked: false,
			createdAt: new Date('2025-06-29T08:20:00'),
			replies: [],
			areRepliesVisible: false,
		},
		{
			id: '4',
			name: 'Anna UX',
			username: '@annaux',
			isVerified: true,
			text: "L'esperienza utente è fluida e intuitiva. Ottimo lavoro sull'accessibilità! ♿️💙",
			likesCount: 31,
			isLiked: true,
			createdAt: new Date('2025-06-29T07:30:00'),
			replies: [],
			areRepliesVisible: false,
		},
		{
			id: '5',
			name: 'Anna UX',
			username: '@annaux',
			isVerified: true,
			text: "L'esperienza utente è fluida e intuitiva. Ottimo lavoro sull'accessibilità! ♿️💙",
			likesCount: 31,
			isLiked: true,
			createdAt: new Date('2025-06-29T07:30:00'),
			replies: [],
			areRepliesVisible: false,
		},
		{
			id: '6',
			name: 'Anna UX',
			username: '@annaux',
			isVerified: true,
			text: "L'esperienza utente è fluida e intuitiva. Ottimo lavoro sull'accessibilità! ♿️💙",
			likesCount: 31,
			isLiked: true,
			createdAt: new Date('2025-06-29T07:30:00'),
			replies: [],
			areRepliesVisible: false,
		},
		{
			id: '7',
			name: 'Anna UX',
			username: '@annaux',
			isVerified: true,
			text: "L'esperienza utente è fluida e intuitiva. Ottimo lavoro sull'accessibilità! ♿️💙",
			likesCount: 31,
			isLiked: true,
			createdAt: new Date('2025-06-29T07:30:00'),
			replies: [],
			areRepliesVisible: false,
		},
		{
			id: '8',
			name: 'Anna UX',
			username: '@annaux',
			isVerified: true,
			text: "L'esperienza utente è fluida e intuitiva. Ottimo lavoro sull'accessibilità! ♿️💙",
			likesCount: 31,
			isLiked: true,
			createdAt: new Date('2025-06-29T07:30:00'),
			replies: [],
			areRepliesVisible: false,
		},
	];
	const [comments, setComments] = useState(SAMPLE_COMMENTS);
	const handleToggleReplies = useCallback((commentId) => {
		console.log('eccoci');
		setComments((prevComments) =>
			prevComments.map((comment) =>
				comment.id === commentId
					? { ...comment, areRepliesVisible: !comment.areRepliesVisible }
					: comment
			)
		);
	}, []);

	const handleLike = useCallback((commentId, isLiked) => {
		setComments((prevComments) =>
			prevComments.map((comment) => {
				if (comment.id === commentId) {
					console.log('lo è', comment.id);
					return {
						...comment,
						isLiked: !comment.isLiked,
						likesCount: isLiked
							? comment.likesCount - 1
							: comment.likesCount + 1,
					};
				}
				console.log('non lo è', comment.id);

				// Controlla anche nelle risposte

				if (comment.replies) {
					const updatedReplies = comment.replies.map((reply) => {
						console.log('controllo tra reply e commentId', reply, commentId);
						if (reply.id === commentId) {
							console.log('replyUguale');
							return {
								...reply,
								isLiked: !reply.isLiked,
								likesCount: isLiked
									? reply.likesCount - 1
									: reply.likesCount + 1,
							};
						}
						return reply;
					});

					if (
						JSON.stringify(updatedReplies) !== JSON.stringify(comment.replies)
					) {
						return { ...comment, replies: updatedReplies };
					}
				}

				return comment;
			})
		);
	}, []);
	return (
		<motion.div
			className="absolute bottom-0 z-30 h-[48rem] w-full bg-[#253141] rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between"
			initial={{ opacity: 0, y: '100%' }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: '100%' }}
			transition={{ type: 'spring', damping: 25, stiffness: 200 }}
		>
			<div className="flex items-center justify-between p-4 py-1 border-b border-slate-600">
				<h2 className="text-lg font-semibold text-white">Commenti</h2>
				<button
					onClick={handleClose}
					className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200 group/X"
					aria-label="Chiudi commenti"
				>
					<X className="w-5 h-5 text-slate-400 group-hover/X:text-white" />
				</button>
			</div>

			<div className="overflow-y-scroll">
				{/* Header */}

				{/* Lista commenti con scroll */}
				<div className="flex-1 overflow-y-auto p-4 space-y-6">
					{comments.map((comment) => (
						<div key={comment.id}>
							<CommentItem
								comment={comment}
								onToggleReplies={handleToggleReplies}
								handleLike={handleLike}
							/>

							{/* Risposte animate */}
							<AnimatePresence mode="wait">
								{comment.areRepliesVisible && comment.replies && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3, ease: 'easeInOut' }}
										className="overflow-hidden"
									>
										<div className="space-y-4 mt-4">
											{comment.replies.map((reply) => (
												<motion.div
													key={reply.id}
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ duration: 0.2 }}
												>
													<CommentItem
														comment={reply}
														handleLike={handleLike}
														isReply={true}
													/>
												</motion.div>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					))}
				</div>

				{/* Input per nuovo commento */}
			</div>

			<div className="p-4 border-t border-slate-600">
				<div className="flex gap-3">
					<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
						Tu
					</div>
					<div className="flex-1">
						<input
							type="text"
							placeholder="Scrivi un commento..."
							className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-400 focus:outline-none transition-colors duration-200"
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default LondiesComments;
