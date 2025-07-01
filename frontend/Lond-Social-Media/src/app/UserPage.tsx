import { AnimatePresence, motion } from 'framer-motion';
import {
	Bookmark,
	Calendar,
	Camera,
	Crown,
	Edit2,
	ExternalLink,
	Grid3X3,
	Heart,
	MapPin,
	MessageCircle,
	MoreHorizontal,
	Pencil,
	Repeat2,
	Settings,
	Share,
	User,
} from 'lucide-react';
import React, { useState } from 'react';
import pfp from '../assets/pfp.png';
import post1 from '../assets/post.jpg';
import InstagramPostExplore from '../components/Explore/pages/InstagramPostExplore';
import LondiesPostExplore from '../components/Explore/pages/LondiesPostExplore';
import TwitterPostExplore from '../components/Explore/pages/TwitterPostExplore';
import YoutubePostExplore from '../components/Explore/pages/YoutubePostExplore';
import InstagramPost from '../components/post/pages/InstagramPost';
import LondiesPost from '../components/post/pages/LondiesPost';
import TwitterPost from '../components/post/pages/TwitterPost';
import YoutubePost from '../components/post/pages/YoutubePost';
import UsersPageDialog from '../components/UserPage/UsersPageDialog';

const UserPage = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [activeGrid, setActiveGrid] = useState<null | 'Seguiti' | 'Followers'>(
		null
	);
	const [isOpen, setIsOpen] = useState(false);
	const categories = [
		{
			name: 'Posts',
			icon: <Grid3X3 className="w-4 h-4" />,
			posts: Array(12)
				.fill(null)
				.map((_, i) => ({
					id: i,
					type: ['Twitter', 'Instagram', 'Youtube', 'Londies'][i % 4],
					isViral: Math.random() > 0.5,
					engagement: Math.floor(Math.random() * 10000),
					image: `https://picsum.photos/400/600?random=${i}`,
				})),
		},
		{
			name: 'Liked',
			icon: <Heart className="w-4 h-4" />,
			posts: Array(8)
				.fill(null)
				.map((_, i) => ({
					id: i + 20,
					type: ['Twitter', 'Instagram', 'Youtube', 'Londies'][i % 4],
					isViral: Math.random() > 0.5,
					engagement: Math.floor(Math.random() * 10000),
					image: `https://picsum.photos/400/600?random=${i + 20}`,
				})),
		},
		{
			name: 'Saved',
			icon: <Bookmark className="w-4 h-4" />,
			posts: Array(6)
				.fill(null)
				.map((_, i) => ({
					id: i + 40,
					type: ['Twitter', 'Instagram', 'Youtube', 'Londies'][i % 4],
					isViral: Math.random() > 0.5,
					engagement: Math.floor(Math.random() * 10000),
					image: `https://picsum.photos/400/600?random=${i + 40}`,
				})),
		},
		{
			name: 'Reposts',
			icon: <Repeat2 className="w-4 h-4" />,
			posts: Array(4)
				.fill(null)
				.map((_, i) => ({
					id: i + 60,
					type: ['Twitter', 'Instagram', 'Youtube', 'Londies'][i % 4],
					isViral: Math.random() > 0.5,
					engagement: Math.floor(Math.random() * 10000),
					image: `https://picsum.photos/400/600?random=${i + 60}`,
				})),
		},
	];

	const followers = Array(24)
		.fill(null)
		.map((_, i) => ({
			name: `User ${i + 1}`,
			handle: `user${i + 1}`,
			pfp: `https://picsum.photos/100/100?random=${i + 100}`,
			verified: Math.random() > 0.7,
			isFollowing: Math.random() > 0.5,
		}));
	const seguiti = Array(24)
		.fill(null)
		.map((_, i) => ({
			name: `User ${i + 1}`,
			handle: `user${i + 1}`,
			pfp: `https://picsum.photos/100/100?random=${i + 100}`,
			verified: Math.random() > 0.7,
			isFollowing: Math.random() > 0.5,
		}));
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};
	const LoadPost = ({ post }) => {
		return;
	};
	const PostComponents = {
		Youtube: ({ post }) => (
			<YoutubePostExplore
				comments={0}
				title="Dybala"
				pfp={pfp}
				isViral={true}
				isVerified={false}
				repost={0}
				name="Alessio Quaranta"
				likes={0}
				saved={0}
				desc={
					'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.'
				}
				handle={'@alessio40'}
				createdAt={new Date()}
			/>
		),
		Instagram: ({ post }) => (
			<InstagramPostExplore
				pfp={pfp}
				comments={0}
				images={[post1, post1, post1]}
				title="Dybala"
				isViral={true}
				isVerified={false}
				repost={0}
				name="Alessio Quaranta"
				likes={0}
				saved={0}
				desc={
					'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.'
				}
				handle={'@alessio40'}
				createdAt={new Date()}
			/>
		),
		Twitter: ({ post }) => (
			<TwitterPostExplore
				id={'abc'}
				pfp={pfp}
				isViral={true}
				isVerified={false}
				retweets={0}
				name="Alessio Quaranta"
				likes={0}
				saved={0}
				text={
					'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.'
				}
				handle={'@alessio40'}
				createdAt={new Date()}
			/>
		),
		Londies: ({ post }) => (
			<LondiesPostExplore
				comments={0}
				title="Dyabala"
				pfp={pfp}
				isViral={true}
				isVerified={false}
				repost={0}
				name="Alessio Quaranta"
				likes={0}
				saved={0}
				desc={
					'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.'
				}
				handle={'@alessio40'}
				createdAt={new Date()}
			/>
		),
	};

	return (
		<div className="w-[85%]">
			<div className="">
				{/* <div className="relative z-10  px-4 py-8">
				
					<div className="flex flex-col items-center gap-8 mb-8">
						<div className="flex flex-col items-center gap-8">
							<div className="flex flex-row justify-center  items-center gap-8 w-full">
								
								<div className="relative ">
									<div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-1">
										<div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
											<User className="w-16 h-16 text-white/70" />
										</div>
									</div>
									<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-slate-900"></div>
								</div>

								
								<div className="flex flex-row h-32 items-center gap-3">
									<div className="text-left ">
										<h1 className="text-3xl font-bold text-white ">
											Alessio Quaranta
										</h1>
										<p className="text-slate-300 text-lg ">@alessio40</p>
									</div>
									<Edit2 className="w-5 h-5 text-white self-start mt-5" />
								</div>
							</div>
							<div className="w-full text-white font-Lato font-normal">
								<span style={{ whiteSpace: 'pre-line' }}>
									{`🌟 Cacciatore di snack professionista 
📚 Studente di procrastinazione (laurea in "Come rimandare tutto")   
🐱 Amante dei gatti (ho 3 gatti e un cane che si crede un gatto)  
🎮 Giocatore di videogiochi (specializzato in "perdere" a Mario Kart)  
🍔 Cibo è vita (il mio motto: "Mangia, dormi, ripeti")  
🌍 Esploratore del divano (il mio viaggio preferito è dal frigo al divano)  
💬 DM aperti per meme e ricette di pancake 🥞`}
								</span>
							</div>
						</div> */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative z-10"
				>
					<div className=" rounded-3xl p-3 ">
						<div className="flex flex-col items-center gap-4">
							{/* Profile Picture */}
							<div className="relative group">
								<div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1 ">
									<div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
										<User className="w-16 h-16 text-white/70" />
									</div>
								</div>
							</div>

							{/* User Info */}
							<div className="flex-1 text-center ">
								<div className="flex items-center justify-center  gap-3 mb-2">
									<h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
										Alessio Quaranta
									</h1>
								</div>

								<p className="text-slate-300 text-lg mb-4 flex items-center justify-center  gap-2">
									<span>@alessio40</span>
								</p>

								<div className="text-slate-300 mb-6 leading-relaxed">
									<p>🌟 Professional snack hunter & procrastination student</p>
									<p>🐱 Cat lover (3 cats + 1 dog who thinks he's a cat)</p>
									<p>
										🎮 Gaming enthusiast • 🍔 Food is life • 🌍 Couch explorer
									</p>
								</div>

								<div className="flex items-center justify-center  gap-4 text-sm text-slate-400 mb-6">
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										Joined March 2020
									</div>
									<div className="flex items-center gap-1">
										<ExternalLink className="w-4 h-4" />
										alessio40.dev
									</div>
								</div>
								<div className="flex flex-wrap gap-3 justify-center ">
									<motion.button
										whileTap={{ scale: 0.95 }}
										className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg'}`}
									>
										Modifica Profilo
									</motion.button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
				{/* Stats */}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="grid grid-cols-3 gap-6 w-full  max-w-[50%] mx-auto my-6 "
				>
					{[
						{
							label: 'Posts',
							count: 156,
						},
						{
							label: 'Follower',
							count: 1247,
						},
						{
							label: 'Seguiti',
							count: 892,
						},
					].map((stat, index) => (
						<motion.div
							key={index}
							className="text-center p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/10  hover:border-white/40 flex flex-col justify-center items-center"
							onClick={() => {
								if (stat.label == 'Follower' || stat.label === 'Seguiti') {
									console.log('ok');
									setIsOpen(true);
									setActiveGrid(stat.label);
								}
							}}
						>
							<div className={`text-3xl font-bold mb-1 text-white`}>
								{stat.count.toLocaleString()}
							</div>
							<div className="text-slate-400 font-medium">{stat.label}</div>
						</motion.div>
					))}
				</motion.div>

				{/* Tabs Section */}
				<div className="flex justify-center items-center">
					<div className="bg-white/5 backdrop-blur-sm w-[90%] rounded-3xl border border-white/10">
						{/* Tab Navigation */}
						<div className="flex gap-1 p-2 bg-white/5 rounded-t-3xl border-b border-white/10">
							{categories.map((category, index) => (
								<button
									key={index}
									onClick={() => setActiveTab(index)}
									className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all text-sm ${
										activeTab === index
											? 'bg-[#253141] text-white backdrop-blur-md'
											: 'text-slate-400 hover:text-white hover:bg-white/10'
									}`}
								>
									{category.icon}
									{category.name}
								</button>
							))}
						</div>

						{/* Tab Content */}
						<div className="p-6">
							{categories[activeTab].posts.length > 0 ? (
								<div className="grid grid-cols-4 gap-8">
									{/* Main Content */}
									<motion.div variants={itemVariants} className="col-span-4">
										<AnimatePresence mode="wait">
											<motion.div
												key={`mansory`}
												className={
													'columns-1 md:columns-3 lg:columns-4 gap-3 space-y-3'
												}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ duration: 0.3 }}
											>
												{categories[activeTab].posts.map((post) => {
													const PostComponent = PostComponents[post.type];
													return (
														<motion.div
															key={post.id}
															className={`
												break-inside-avoid`}
															transition={{ duration: 0.2 }}
															layout
														>
															<PostComponent post={post} />
														</motion.div>
													);
												})}
											</motion.div>
										</AnimatePresence>
									</motion.div>
								</div>
							) : (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
										{categories[activeTab].icon || (
											<User className="w-8 h-8 text-slate-400" />
										)}
									</div>
									<h3 className="text-xl font-semibold text-white mb-2">
										Nessun contenuto
									</h3>
									<p className="text-slate-400">
										Non ci sono ancora contenuti in questa sezione.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<UsersPageDialog
				isOpen={isOpen}
				type={activeGrid}
				data={activeGrid == 'Followers' ? followers : seguiti}
				onClose={() => {
					setIsOpen(false);
				}}
			/>
		</div>
	);
};

export default UserPage;
