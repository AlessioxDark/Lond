import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import profile from '../../../assets/pfp.png';
import CommentItem from '../../Londies/utils/CommentItem';
interface PostCommentsProps {
	height?: string;
}

function PostComments({ height }: PostCommentsProps) {
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
		{
			id: '9',
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
			id: '10',
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
			id: '11',
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
			id: '12',
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
			id: '13',
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
			id: '14',
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
		// <motion.div
		// 	initial={{ opacity: 0, height: 0 }}
		// 	animate={{ opacity: 1, height: 'auto' }}
		// 	exit={{ opacity: 0, height: 0 }}
		// 	transition={{ duration: 0.4 }}
		// 	className={`group

		//     backdrop-blur-xl border border-lond-light-gray
		//     rounded-3xl p-3 bg-lond-dark

		//      flex flex-col  overflow-y-hidden ${height && `max-h-[${height}]`}`}
		// >
		// 	<h3 className="text-lond-text-primary text-xl font-Montserrat font-bold mb-4">
		// 		Commenti
		// 	</h3>

		// 	<div className="flex-1 overflow-y-scroll mb-4 custom-scroll">
		// 		{[
		// 			{
		// 				user: name,
		// 				pfp: profile,
		// 				username: 'dybala10',
		// 				text: 'Grande Dybala! 💛❤️',
		// 			},
		// 			{
		// 				user: 'Romafan93',
		// 				pfp: profile,
		// 				username: 'romafan93',
		// 				text: 'Sei un campione',
		// 			},
		// 			{
		// 				user: 'AS Roma',
		// 				pfp: profile,
		// 				username: 'asroma',
		// 				text: 'Sempre con te!',
		// 			},
		// 			{
		// 				user: name,
		// 				pfp: profile,
		// 				username: 'dybala10',
		// 				text: 'Grande Dybala! 💛❤️',
		// 			},
		// 			{
		// 				user: 'Romafan93',
		// 				pfp: profile,
		// 				username: 'romafan93',
		// 				text: 'Sei un campione',
		// 			},
		// 			{
		// 				user: 'AS Roma',
		// 				pfp: profile,
		// 				username: 'asroma',
		// 				text: 'Sempre con te!',
		// 			},
		// 			{
		// 				user: name,
		// 				pfp: profile,
		// 				username: 'dybala10',
		// 				text: 'Grande Dybala! 💛❤️',
		// 			},
		// 			{
		// 				user: 'Romafan93',
		// 				pfp: profile,
		// 				username: 'romafan93',
		// 				text: 'Sei un campione',
		// 			},
		// 			{
		// 				user: 'AS Roma',
		// 				pfp: profile,
		// 				username: 'asroma',
		// 				text: 'Sempre con te!',
		// 			},
		// 			{
		// 				user: name,
		// 				pfp: profile,
		// 				username: 'dybala10',
		// 				text: 'Grande Dybala! 💛❤️',
		// 			},
		// 			{
		// 				user: 'Romafan93',
		// 				pfp: profile,
		// 				username: 'romafan93',
		// 				text: 'Sei un campione',
		// 			},
		// 			{
		// 				user: 'AS Roma',
		// 				pfp: profile,
		// 				username: 'asroma',
		// 				text: 'Sempre con te!',
		// 			},
		// 		].map((comment, i) => (
		// 			<motion.div
		// 				key={i}
		// 				initial={{ opacity: 0, x: -20 }}
		// 				animate={{ opacity: 1, x: 0 }}
		// 				transition={{ delay: i * 0.1 }}
		// 				className="  p-3  border-b border-t border-b-lond-light-gray border-t-lond-light-gray
		//         group

		// 		"
		// 			>
		// 				<div className="flex items-center gap-3 mb-2">
		// 					<img
		// 						className="w-8 h-8 rounded-full ring-2 ring-slate-600/30"
		// 						src={comment.pfp}
		// 						alt={comment.username}
		// 					/>
		// 					<span className="font-bold text-slate-200 text-sm">
		// 						{comment.username}
		// 					</span>
		// 				</div>
		// 				<p className="text-slate-300 text-sm font-Lato">{comment.text}</p>
		// 			</motion.div>
		// 		))}
		// 	</div>

		// 	<div className="flex gap-3">
		// 		<input
		// 			type="text"
		// 			placeholder="Scrivi un commento..."
		// 			className="flex-1 bg-[#253141] backdrop-blur-sm text-slate-200 font-Lato p-3 rounded-xl placeholder-zinc-400 border border-slate-600/30 focus:border-slate-400/40 focus:outline-none transition-all duration-300"
		// 		/>
		// 		<motion.button
		// 			whileTap={{ scale: 0.95 }}
		// 			className="bg-[#253141] text-white px-6 py-3 rounded-xl font-bold  transition-all duration-300"
		// 		>
		// 			Invia
		// 		</motion.button>
		// 	</div>
		// </motion.div>

		<motion.div className="p-3  rounded-2xl  flex jusitfy-between flex-col  w-[50%] h-full  z-10 ">
			<div className="flex-1 overflow-y-scroll h-auto p-4 space-y-6">
				{comments.map((comment) => (
					<div key={comment.id}>
						<CommentItem
							comment={comment}
							onToggleReplies={handleToggleReplies}
							handleLike={handleLike}
						/>

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

			<div className="p-3 pb-0 border-t border-lond-light-gray/40">
				<div className="flex gap-3 items-center">
					<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
						Tu
					</div>
					<div className="flex-1">
						<input
							type="text"
							placeholder="Scrivi un commento..."
							className="w-full px-3 py-2 bg-lond-dark text-white rounded-lg border border-lond-gray focus:outline-none duration-200"
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default PostComments;
