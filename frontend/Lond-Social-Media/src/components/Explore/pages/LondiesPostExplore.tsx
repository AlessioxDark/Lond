import pfp from '../../../assets/pfp.png';
import PostHeader from '../../post/utils/PostHeader';
interface LondiesPostProps {
	post: any;
}
const LondiesPostExplore = ({ post }: LondiesPostProps) => {
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
			<div className="aspect-[4/3] bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl mb-3 relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				{post.duration && (
					<div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
						{post.duration}
					</div>
				)}
			</div>
			<h4 className="text-slate-100 font-medium text-sm mb-1">{post.title}</h4>
			<p className="text-slate-400 text-xs">
				{(post.views / 1000000).toFixed(1)}M views
			</p>
		</div>
	);
};

export default LondiesPostExplore;
