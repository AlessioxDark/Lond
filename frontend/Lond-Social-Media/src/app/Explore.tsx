import { AnimatePresence, motion } from 'framer-motion';
import {
	Filter,
	Flame,
	Grid3X3,
	Hash,
	Heart,
	Image,
	List,
	MapPin,
	Play,
	Search,
	SlidersHorizontal,
	TrendingUp,
	Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
	PiInstagramLogoBold,
	PiTwitterLogoBold,
	PiYoutubeLogoBold,
} from 'react-icons/pi';
import pfp from '../assets/pfp.png';
import post1 from '../assets/post.jpg';
import InstagramPostExplore from '../components/Explore/pages/InstagramPostExplore';
import LondiesPostExplore from '../components/Explore/pages/LondiesPostExplore';
import TwitterPostExplore from '../components/Explore/pages/TwitterPostExplore';
import YoutubePostExplore from '../components/Explore/pages/YoutubePostExplore';
import Searchbar from '../components/SearchBar';
import InstagramPost from '../components/post/pages/InstagramPost';
import LondiesPost from '../components/post/pages/LondiesPost';
import TwitterPost from '../components/post/pages/TwitterPost';
import YoutubePost from '../components/post/pages/YoutubePost';

// Mock data per la demo - simulo i tuoi componenti
const mockPosts = [
	{
		id: 1,
		type: 'Youtube',
		category: 'Video',
		title: 'Amazing Tech Review',
		views: 2000000,
		duration: '10:45',
		likes: 15000,
		isViral: true,
	},
	{
		id: 2,
		type: 'Instagram',
		src: post1,
		title: 'Beautiful Sunset',
		views: 850000,
		likes: 45000,
		isViral: false,
	},
	{
		id: 3,
		type: 'Twitter',
		category: 'Tendenze',
		title: 'Breaking News Update',
		views: 1200000,
		likes: 8500,
		isViral: true,
	},
	{
		id: 4,
		type: 'Londies',
		category: 'Popolari',
		title: 'Gaming Highlights',
		views: 750000,
		duration: '5:30',
		likes: 12000,
		isViral: false,
	},
	{
		id: 5,
		type: 'Youtube',
		category: 'Video',
		title: 'Cooking Tutorial',
		views: 500000,
		duration: '15:20',
		likes: 9800,
		isViral: false,
	},
	{
		id: 6,
		type: 'Instagram',
		category: 'Foto',
		title: 'Street Photography',
		views: 320000,
		likes: 6700,
		isViral: false,
	},
	{
		id: 7,
		type: 'Twitter',
		category: 'Tendenze',
		title: 'Sports Commentary',
		views: 890000,
		likes: 15600,
		isViral: true,
	},
	{
		id: 8,
		type: 'Londies',
		category: 'Popolari',
		title: 'Travel Vlog',
		views: 1100000,
		duration: '8:15',
		likes: 22000,
		isViral: true,
	},
];

const trendingTopics = [
	{ tag: '#DybalaRoma', posts: '15.2K', trend: '+45%', category: 'Sport' },
	{ tag: '#Champions', posts: '8.7K', trend: '+32%', category: 'Sport' },
	{ tag: '#TechNews', posts: '5.3K', trend: '+28%', category: 'Tech' },
	{ tag: '#Calcio', posts: '12.1K', trend: '+18%', category: 'Sport' },
	{ tag: '#Gaming', posts: '4.9K', trend: '+55%', category: 'Gaming' },
];

const suggestedUsers = [
	{
		name: 'Marco Rossi',
		handle: '@marcorossi',
		followers: '45K',
		verified: true,
		category: 'Sport',
	},
	{
		name: 'Tech Italia',
		handle: '@techitalia',
		followers: '32K',
		verified: false,
		category: 'Tech',
	},
	{
		name: 'Sports News',
		handle: '@sportsnews',
		followers: '67K',
		verified: true,
		category: 'Sport',
	},
	{
		name: 'Gamer Pro',
		handle: '@gamerpro',
		followers: '23K',
		verified: false,
		category: 'Gaming',
	},
];

const categories = [
	{
		name: 'Tutti',
		icon: Grid3X3,

		active: true,
	},
	{
		name: 'Tendenze',
		icon: TrendingUp,

		active: false,
	},
	{
		name: 'Twitter',
		icon: PiTwitterLogoBold,

		active: false,
	},
	{
		name: 'Instagram',
		icon: PiInstagramLogoBold,

		active: false,
	},
	{
		name: 'Youtube',
		icon: PiYoutubeLogoBold,

		active: false,
	},
	{
		name: 'Londies',
		icon: Play,
		active: false,
	},
];

// Componenti mock per simolare i tuoi post
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

export default function Explore() {
	const [activeCategory, setActiveCategory] = useState('Tutti');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState('trending'); // trending | recent | popular

	// Filtro intelligente dei post
	const filteredPosts = useMemo(() => {
		let filtered = mockPosts;

		// Filtra per categoria
		if (activeCategory === 'Tendenze') {
			filtered = filtered.filter((post) => post.category === activeCategory);
		}
		// Filtra per ricerca
		if (searchQuery) {
			filtered = filtered.filter((post) =>
				post.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		if (
			activeCategory === 'Youtube' ||
			activeCategory === 'Twitter' ||
			activeCategory === 'Instagram' ||
			activeCategory === 'Londies'
		) {
			console.log(filtered);
			filtered = filtered.filter((post) => post.type === activeCategory);
		}

		// Ordina
		switch (sortBy) {
			case 'popular':
				return filtered.sort((a, b) => b.likes - a.likes);
			case 'recent':
				return filtered.sort((a, b) => b.id - a.id);
			default: // trending
				return filtered.sort((a, b) => {
					if (a.isViral && !b.isViral) return -1;
					if (!a.isViral && b.isViral) return 1;
					return b.views - a.views;
				});
		}
	}, [activeCategory, searchQuery, sortBy]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	return (
		<div className="min-h-screen w-[85%] flex flex-col items-center p-6">
			<motion.div
				className="w-full "
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Header */}
				<motion.div variants={itemVariants} className="mb-6">
					<Searchbar />
				</motion.div>

				{/* Categories + Controls */}
				<motion.div variants={itemVariants} className="mb-3">
					<div className="flex items-center justify-between mb-4">
						<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
							{categories.map((category) => {
								const Icon = category.icon;
								return (
									<motion.button
										key={category.name}
										onClick={() => setActiveCategory(category.name)}
										className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
											activeCategory === category.name
												? ` bg-slate-500  text-white shadow-lg`
												: 'bg-[#253141] text-slate-300'
										}`}
										whileTap={{ scale: 0.95 }}
									>
										<Icon size={18} />
										<span className="font-medium">{category.name}</span>
									</motion.button>
								);
							})}
						</div>

						{/* Controls */}
					</div>
				</motion.div>

				<div className="grid grid-cols-4 gap-8">
					{/* Main Content */}
					<motion.div variants={itemVariants} className="lg:col-span-3">
						<AnimatePresence mode="wait">
							<motion.div
								key={`${activeCategory}-${sortBy}-mansory`}
								className={
									'columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3'
								}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								{filteredPosts.map((post) => {
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

						{filteredPosts.length === 0 && (
							<motion.div
								className="text-center py-12"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<Search size={48} className="text-slate-600 mx-auto mb-4" />
								<h3 className="text-slate-400 text-lg mb-2">
									Nessun contenuto trovato
								</h3>
								<p className="text-slate-500">
									Prova a cambiare filtro o cerca qualcos'altro
								</p>
							</motion.div>
						)}
					</motion.div>

					{/* Sidebar */}
					<motion.div
						variants={itemVariants}
						className="lg:col-span-1 space-y-6"
					>
						{/* Trending Topics */}
						<div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
							<div className="flex items-center gap-2 mb-4">
								<TrendingUp className="text-pink-400" size={20} />
								<h3 className="text-lg font-bold text-slate-100">Trending</h3>
							</div>
							<div className="space-y-3">
								{trendingTopics.map((topic) => (
									<motion.div
										key={topic.tag}
										className="flex items-center justify-between p-3 rounded-xl bg-slate-700/20 hover:bg-slate-700/40 cursor-pointer transition-colors duration-200"
										onClick={() => setActiveCategory(topic.category)}
									>
										<div>
											<p className="font-medium text-slate-100">{topic.tag}</p>
											<p className="text-sm text-slate-400">
												{topic.posts} post
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Suggested Users */}
						<div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
							<div className="flex items-center gap-2 mb-4">
								<Users className="text-blue-400" size={20} />
								<h3 className="text-lg font-bold text-slate-100">
									Persone da seguire
								</h3>
							</div>
							<div className="space-y-3">
								{suggestedUsers.map((user) => (
									<motion.div
										key={user.handle}
										className="flex items-center justify-between p-3 rounded-xl bg-slate-700/20 hover:bg-slate-700/40 cursor-pointer transition-colors duration-200"
									>
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
											<div>
												<div className="flex items-center gap-1">
													<p className="font-medium text-slate-100 text-sm">
														{user.name}
													</p>
													{user.verified && (
														<div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
															<span className="text-white text-xs">✓</span>
														</div>
													)}
												</div>
												<p className="text-xs text-slate-400">{user.handle}</p>
											</div>
										</div>
										<motion.button
											className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full transition-colors duration-200"
											whileTap={{ scale: 0.95 }}
										>
											Segui
										</motion.button>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
