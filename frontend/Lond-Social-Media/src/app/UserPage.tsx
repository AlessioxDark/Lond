// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
// import { Bookmark, Heart, Repeat2 } from 'lucide-react';
// import React from 'react';
// import pfp from '../assets/pfp.png';
// const UserPage = () => {
// 	const categories = [
// 		{
// 			name: 'Post',
// 			posts: [
// 				{
// 					id: 1,
// 					title: 'Does drinking coffee make you smarter?',
// 					date: '5h ago',
// 					commentCount: 5,
// 					shareCount: 2,
// 				},
// 				{
// 					id: 2,
// 					title: "So you've bought coffee... now what?",
// 					date: '2h ago',
// 					commentCount: 3,
// 					shareCount: 2,
// 				},
// 			],
// 		},
// 		{
// 			name: `${Bookmark}`,
// 			posts: [
// 				{
// 					id: 1,
// 					title: 'Does drinking coffee make you smarter?',
// 					date: '5h ago',
// 					commentCount: 5,
// 					shareCount: 2,
// 				},
// 				{
// 					id: 2,
// 					title: "So you've bought coffee... now what?",
// 					date: '2h ago',
// 					commentCount: 3,
// 					shareCount: 2,
// 				},
// 			],
// 		},
// 		{
// 			name: 'Like',
// 			posts: [
// 				{
// 					id: 1,
// 					title: 'Does drinking coffee make you smarter?',
// 					date: '5h ago',
// 					commentCount: 5,
// 					shareCount: 2,
// 				},
// 				{
// 					id: 2,
// 					title: "So you've bought coffee... now what?",
// 					date: '2h ago',
// 					commentCount: 3,
// 					shareCount: 2,
// 				},
// 			],
// 		},
// 		{
// 			name: 'Repost',
// 			posts: [
// 				{
// 					id: 1,
// 					title: 'Is tech making coffee better or worse?',
// 					date: 'Jan 7',
// 					commentCount: 29,
// 					shareCount: 16,
// 				},
// 				{
// 					id: 2,
// 					title: 'The most innovative things happening in coffee',
// 					date: 'Mar 19',
// 					commentCount: 24,
// 					shareCount: 12,
// 				},
// 			],
// 		},
// 	];
// 	return (
// 		<div className="w-[85%] relative ">
// 			<div className="flex w-full flex-col items-center gap-10">
// 				<div className="flex flex-col gap-10">
// 					<div className="flex flex-row items-center gap-5">
// 						<img src={pfp} alt="" className="w-32 h-32 rounded-full" />
// 						<div className="flex flex-col">
// 							<h1 className="text-3xl font-bold text-white">
// 								Alessio Quaranta
// 							</h1>
// 							<span className="text-slate-200 text-lg font-medium">
// 								@alessio40
// 							</span>
// 						</div>
// 					</div>
// 					<div className="flex flex-row gap-5 text-white">
// 						<button className="bg-[#253141] px-9 py-5 rounded-3xl text-xl font-bold">
// 							Segui
// 						</button>
// 						<button className="bg-[#253141] px-9 py-5 rounded-3xl text-xl font-bold">
// 							Messaggio
// 						</button>
// 					</div>
// 				</div>

// 				<div className="grid grid-cols-3 w-[40%] gap-4 pt-6 border-t border-white/10 ">
// 					<button
// 						className={`group p-4   rounded-2xl transition-all duration-300 transform  ${'bg-white/5'}`}
// 					>
// 						<div className="text-center">
// 							<div className="text-2xl font-bold text-white mb-1  transition-colors">
// 								{127}
// 							</div>
// 							<div className="text-slate-400 text-sm font-medium  transition-colors">
// 								Follower
// 							</div>
// 						</div>
// 					</button>
// 					<button
// 						className={`group p-4   rounded-2xl transition-all duration-300 transform  ${'bg-white/5'}`}
// 					>
// 						<div className="text-center">
// 							<div className="text-2xl font-bold text-white mb-1 transition-colors">
// 								{127}
// 							</div>
// 							<div className="text-slate-400 text-sm font-medium  transition-colors">
// 								Seguiti
// 							</div>
// 						</div>
// 					</button>
// 					<button
// 						className={`group p-4  rounded-2xl transition-all duration-300 transform  ${'bg-white/5 '}`}
// 					>
// 						<div className="text-center">
// 							<div className="text-2xl font-bold text-white mb-1  transition-colors">
// 								{127}
// 							</div>
// 							<div className="text-slate-400 text-sm font-medium  transition-colors">
// 								Post
// 							</div>
// 						</div>
// 					</button>
// 				</div>
// 			</div>
// 			<div className="flex h-screen w-full justify-center px-4 pt-24">
// 				<div className="w-full max-w-md">
// 					<TabGroup>
// 						<TabList className="flex gap-4">
// 							{categories.map(({ name }) => (
// 								<Tab
// 									key={name}
// 									className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
// 								>
// 									{name}
// 								</Tab>
// 							))}
// 						</TabList>
// 						<TabPanels className="mt-3">
// 							{categories.map(({ name, posts }) => (
// 								<TabPanel key={name} className="rounded-xl bg-white/5 p-3">
// 									<ul>
// 										{posts.map((post) => (
// 											<li
// 												key={post.id}
// 												className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5"
// 											>
// 												<a href="#" className="font-semibold text-white">
// 													<span className="absolute inset-0" />
// 													{post.title}
// 												</a>
// 												<ul
// 													className="flex gap-2 text-white/50"
// 													aria-hidden="true"
// 												>
// 													<li>{post.date}</li>
// 													<li aria-hidden="true">&middot;</li>
// 													<li>{post.commentCount} comments</li>
// 													<li aria-hidden="true">&middot;</li>
// 													<li>{post.shareCount} shares</li>
// 												</ul>
// 											</li>
// 										))}
// 									</ul>
// 								</TabPanel>
// 							))}
// 						</TabPanels>
// 					</TabGroup>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default UserPage;

import {
	Bookmark,
	Heart,
	MessageCircle,
	MoreHorizontal,
	Pencil,
	Repeat2,
	Share,
	User,
} from 'lucide-react';
import React, { useState } from 'react';
import pfp from '../assets/pfp.png';
import post1 from '../assets/post.jpg';
import InstagramPost from '../components/post/pages/InstagramPost';
import LondiesPost from '../components/post/pages/LondiesPost';
import TwitterPost from '../components/post/pages/TwitterPost';
import YoutubePost from '../components/post/pages/YoutubePost';

const UserPage = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [isFollowing, setIsFollowing] = useState(false);

	const categories = [
		{
			name: 'Post',
			icon: null,
			posts: [
				{
					id: 1,
					type: 'Twitter',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					retweets: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					text: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 2,
					type: 'Instagram',
					pfp: pfp,
					isViral: true,
					images: [post1, post1],
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					title: 'Dybala va per i 200',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 3,
					type: 'Youtube',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					repost: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					comments: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					title: 'Dybala va per i 200',
					createdAt: new Date(),
				},
				{
					id: 4,
					type: 'Londies',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					title: 'Dybala va per i 200',
					handle: '@alessio40',
					createdAt: new Date(),
				},
			],
		},
		{
			name: 'Liked',
			icon: <Heart className="w-4 h-4" />,
			posts: [
				{
					id: 10,
					type: 'Twitter',
					isLikedProp: true,
					pfp: pfp,
					isViral: true,
					isVerified: false,
					retweets: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					text: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 2,
					type: 'Instagram',
					pfp: pfp,
					isViral: true,
					images: [post1, post1],
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					title: 'Dybala va per i 200',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 3,
					type: 'Youtube',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					repost: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					comments: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					title: 'Dybala va per i 200',
					createdAt: new Date(),
				},
				{
					id: 4,
					type: 'Londies',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					title: 'Dybala va per i 200',
					handle: '@alessio40',
					createdAt: new Date(),
				},
			],
		},
		{
			name: 'Saved',
			icon: <Bookmark className="w-4 h-4" />,
			posts: [
				{
					id: 1,
					type: 'Twitter',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					retweets: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					text: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 2,
					type: 'Instagram',
					pfp: pfp,
					isViral: true,
					images: [post1, post1],
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					title: 'Dybala va per i 200',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 3,
					type: 'Youtube',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					repost: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					comments: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					title: 'Dybala va per i 200',
					createdAt: new Date(),
				},
				{
					id: 4,
					type: 'Londies',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					title: 'Dybala va per i 200',
					handle: '@alessio40',
					createdAt: new Date(),
				},
			],
		},
		{
			name: 'Repost',
			icon: <Repeat2 className="w-4 h-4" />,
			posts: [
				{
					id: 1,
					type: 'Twitter',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					retweets: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					text: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 2,
					type: 'Instagram',
					pfp: pfp,
					isViral: true,
					images: [post1, post1],
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					title: 'Dybala va per i 200',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					createdAt: new Date(),
				},
				{
					id: 3,
					type: 'Youtube',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					repost: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					comments: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					handle: '@alessio40',
					title: 'Dybala va per i 200',
					createdAt: new Date(),
				},
				{
					id: 4,
					type: 'Londies',
					pfp: pfp,
					isViral: true,
					isVerified: false,
					reposts: 0,
					comments: 0,
					name: 'Alessio Quaranta',
					likes: 0,
					saved: 0,
					desc: 'Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.',
					title: 'Dybala va per i 200',
					handle: '@alessio40',
					createdAt: new Date(),
				},
			],
		},
	];

	const LoadPost = ({ post }) => {
		return;
	};
	return (
		<div className="w-[85%]">
			<div className="">
				<div className="relative z-10  px-4 py-8">
					{/* Profile Header */}
					<div className="flex flex-col items-center gap-8 mb-8">
						<div className="flex flex-col items-center gap-8">
							<div className="flex flex-row justify-center  items-center gap-8 w-full">
								{/* Profile Picture */}
								<div className="relative ">
									<div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 p-1">
										<div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
											<User className="w-16 h-16 text-white/70" />
										</div>
									</div>
									<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-slate-900"></div>
								</div>

								{/* User Info */}
								<div className="flex flex-row h-32 items-center gap-3">
									<div className="text-left ">
										<h1 className="text-3xl font-bold text-white ">
											Alessio Quaranta
										</h1>
										<p className="text-slate-300 text-lg ">@alessio40</p>

										{/* <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
										<button
											onClick={() => setIsFollowing(!isFollowing)}
											className={`px-8 py-3 rounded-full font-semibold transition-all transform text-white  ${
												isFollowing
													? 'bg-white/10  border border-white/20 hover:bg-white/20'
													: 'bg-slate-800 backdrop-blur-md'
											}`}
										>
											{isFollowing ? 'Seguendo' : 'Segui'}
										</button>
										<button className="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all transform  border border-white/20">
											Messaggio
										</button>
									</div> */}
									</div>
									<Pencil className="w-6 h-6 text-white self-start mt-3" />
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
    💬 DM aperti per meme e ricette di pancake 🥞
  `}
								</span>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-6 w-full max-w-[60%] h-25 ">
							{[
								{ label: 'Follower', count: 1247 },
								{ label: 'Seguiti', count: 892 },
								{ label: 'Post', count: 156 },
							].map((stat, index) => (
								<div
									key={index}
									className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex flex-col justify-center items-center"
								>
									<div className="text-2xl font-bold text-white mb-1">
										{stat.count.toLocaleString()}
									</div>
									<div className="text-slate-400 text-sm font-medium">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Tabs Section */}
					<div className="flex justify-center items-center">
						<div className="bg-white/5 backdrop-blur-sm w-[68%] rounded-3xl border border-white/10">
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
									<div className="flex h-full w-auto flex-col  items-center gap-4">
										{categories[activeTab].posts.map((post) => {
											switch (post.type) {
												case 'Twitter':
													return <TwitterPost {...post} />;
												case 'Instagram':
													return <InstagramPost {...post} />;
												case 'Youtube':
													return <YoutubePost {...post} />;
												case 'Londies':
													return <LondiesPost {...post} />;
											}
										})}
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
			</div>
		</div>
	);
};

export default UserPage;
