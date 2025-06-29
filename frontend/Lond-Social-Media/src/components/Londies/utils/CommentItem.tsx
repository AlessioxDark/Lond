import { motion } from 'framer-motion';
import { Check, ChevronDown, Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import pfp from '../../../assets/pfp.png';
const CommentItem = ({ comment, isReply, onToggleReplies, handleLike }) => {
	return (
		<div className={`flex flex-col gap-3 ${isReply ? 'ml-10 mt-4' : ''}`}>
			<div className="flex flex-col gap-3 rounded-lg">
				<div className="flex flex-row gap-3 items-start">
					{/* Avatar con gradiente animato */}
					<div className="relative">
						<img src={pfp} className="w-10 h-10 rounded-full" alt="" />
					</div>

					<div className="flex-1 flex flex-col gap-1">
						<div className="flex flex-row gap-3 items-center">
							<div className="flex flex-row gap-2 items-center">
								<span className="text-base font-semibold text-white">
									{comment.name}
								</span>
								{comment.isVerified && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 500,
											damping: 30,
										}}
										className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
									>
										<Check className="w-2.5 h-2.5 text-white" />
									</motion.div>
								)}
							</div>
							<time
								dateTime={comment.createdAt.toISOString()}
								className="text-sm text-slate-400"
							>
								{new Date(comment.createdAt).toLocaleString('it-IT', {
									day: 'numeric',
									month: 'short',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</time>
						</div>

						<p className="text-sm text-white leading-relaxed">{comment.text}</p>

						{/* Azioni del commento */}
						<div className="flex items-center gap-4">
							<button
								onClick={() => handleLike(comment.id, comment.isLiked)}
								className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
									comment.isLiked
										? 'text-red-400 hover:text-red-300'
										: 'text-slate-400 hover:text-red-400'
								}`}
								aria-label={comment.isLiked ? 'Rimuovi like' : 'Metti like'}
							>
								<Heart
									className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`}
								/>
								{comment.likesCount}
							</button>

							<button className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200">
								<MessageCircle className="w-4 h-4" />
								Rispondi
							</button>
						</div>
						{/* Toggle per visualizzare le risposte */}
						{comment.replies && comment.replies.length > 0 && !isReply && (
							<button
								onClick={() => onToggleReplies(comment.id)}
								className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 self-start"
								aria-expanded={comment.areRepliesVisible}
								aria-label={`${
									comment.areRepliesVisible ? 'Nascondi' : 'Mostra'
								} ${comment.replies.length} rispost${
									comment.replies.length === 1 ? 'a' : 'e'
								}`}
							>
								<motion.div
									animate={{ rotate: comment.areRepliesVisible ? 180 : 0 }}
									transition={{ duration: 0.2 }}
								>
									<ChevronDown className="w-4 h-4" />
								</motion.div>
								{comment.areRepliesVisible ? 'Nascondi' : 'Visualizza'}{' '}
								{comment.replies.length} rispost
								{comment.replies.length === 1 ? 'a' : 'e'}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
