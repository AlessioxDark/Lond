import { motion } from 'framer-motion';
import React from 'react';
import profile from '../../../assets/pfp.png';
interface PostCommentsProps {
	height?: string;
}
function PostComments({ height }: PostCommentsProps) {
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

		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute h-[90%] w-[60%] rounded-2xl top-0 left-[110%]  
      backdrop-blur-xl  
		      bg-lond-gray

		      flex flex-col  overflow-y-hidden "
			style={{ zIndex: 100 }}
		>
			<h3 className="text-lond-text-primary text-xl text-center font-Montserrat font-bold p-3 border-b border-lond-light-gray">
				Commenti
			</h3>
			<div className="flex-1 overflow-y-scroll my-4 custom-scroll">
				{[
					{
						user: name,
						pfp: profile,
						username: 'dybala10',
						text: 'Grande Dybala! 💛❤️',
					},
					{
						user: 'Romafan93',
						pfp: profile,
						username: 'romafan93',
						text: 'Sei un campione',
					},
					{
						user: 'AS Roma',
						pfp: profile,
						username: 'asroma',
						text: 'Sempre con te!',
					},
					{
						user: name,
						pfp: profile,
						username: 'dybala10',
						text: 'Grande Dybala! 💛❤️',
					},
					{
						user: 'Romafan93',
						pfp: profile,
						username: 'romafan93',
						text: 'Sei un campione',
					},
					{
						user: 'AS Roma',
						pfp: profile,
						username: 'asroma',
						text: 'Sempre con te!',
					},
					{
						user: name,
						pfp: profile,
						username: 'dybala10',
						text: 'Grande Dybala! 💛❤️',
					},
					{
						user: 'Romafan93',
						pfp: profile,
						username: 'romafan93',
						text: 'Sei un campione',
					},
					{
						user: 'AS Roma',
						pfp: profile,
						username: 'asroma',
						text: 'Sempre con te!',
					},
					{
						user: name,
						pfp: profile,
						username: 'dybala10',
						text: 'Grande Dybala! 💛❤️',
					},
					{
						user: 'Romafan93',
						pfp: profile,
						username: 'romafan93',
						text: 'Sei un campione',
					},
					{
						user: 'AS Roma',
						pfp: profile,
						username: 'asroma',
						text: 'Sempre con te!',
					},
				].map((comment, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: i * 0.1 }}
						className="
		        group p-3

				"
					>
						<div className="flex items-center gap-3 mb-2">
							<img
								className="w-8 h-8 rounded-full ring-2 ring-slate-600/30"
								src={comment.pfp}
								alt={comment.username}
							/>
							<span className="font-bold text-slate-200 text-sm">
								{comment.username}
							</span>
						</div>
						<p className="text-slate-300 text-sm font-Lato">{comment.text}</p>
					</motion.div>
				))}
			</div>

			<div className="flex gap-3">
				<input
					type="text"
					placeholder="Scrivi un commento..."
					className="flex-1 bg-[#253141] backdrop-blur-sm text-slate-200 font-Lato p-3 rounded-xl placeholder-zinc-400 border border-slate-600/30 focus:border-slate-400/40 focus:outline-none transition-all duration-300"
				/>
				<motion.button
					whileTap={{ scale: 0.95 }}
					className="bg-[#253141] text-white px-6 py-3 rounded-xl font-bold  transition-all duration-300"
				>
					Invia
				</motion.button>
			</div>
		</motion.div>
	);
}

export default PostComments;
