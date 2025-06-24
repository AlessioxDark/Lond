import { Heart } from 'lucide-react';
import pfp from '../../../assets/pfp.png';
import PostHeader from '../../post/utils/PostHeader';
interface InstagramPost {
	post: any;
}

export default function InstagramPostExplore({ post }: InstagramPost) {
	return (
		<div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30 backdrop-blur-sm">
			<PostHeader
				createdAt={new Date()}
				name="Alessio Quaranta"
				pfp={pfp}
				isVerified={false}
				handle="alessio40"
				isViral={false}
			/>
			<img
				src={post.src}
				alt=""
				className="aspect-square bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl mb-3 relative overflow-hidden"
			/>
			<h4 className="text-slate-100 font-medium text-sm mb-1">{post.title}</h4>
			<p className="text-slate-400 text-xs">
				{(post.likes / 1000).toFixed(1)}K likes
			</p>
		</div>
	);
}
