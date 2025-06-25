import { Bookmark, Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import React from 'react';
import ReactIconExplore from './ReactIconExplore';
import SocialIconExplore from './SocialIconExplore';
interface SocialIconsExploreFullRowProps {
	reactions: any[];
	setReactions: React.Dispatch<React.SetStateAction<any[]>>;
	userReaction: string;
	setUserReaction: React.Dispatch<React.SetStateAction<string>>;
	isLiked: boolean;
	setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
	isComments?: boolean;
	setIsComments?: React.Dispatch<React.SetStateAction<boolean>>;
	isSaved: boolean;
	setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
	isShared: boolean;
	setIsShared: React.Dispatch<React.SetStateAction<boolean>>;
	isRetweeted?: boolean;
	setIsRetweeted?: React.Dispatch<React.SetStateAction<boolean>>;
	isTwitter?: boolean;
}
const SocialIconsExploreFullRow = ({
	reactions,
	setReactions,
	userReaction,
	setUserReaction,
	isLiked,
	setIsLiked,
	isComments,
	setIsComments,
	isSaved,
	setIsSaved,
	isShared,
	setIsShared,
	isTwitter = false,
	isRetweeted,
	setIsRetweeted,
}: SocialIconsExploreFullRowProps) => {
	return (
		<div className="flex items-center justify-between text-xs">
			<div className="flex items-center gap-3 text-slate-400">
				<SocialIconExplore
					isActive={isLiked}
					onClick={() => {
						setIsLiked(!isLiked);
					}}
					Icon={Heart}
					count={0}
				/>
				{isTwitter ? (
					<SocialIconExplore
						isActive={isRetweeted}
						onClick={() => {
							setIsRetweeted(!isRetweeted);
						}}
						Icon={Repeat2}
						count={0}
					/>
				) : (
					<SocialIconExplore
						isActive={isComments}
						onClick={() => {
							setIsComments(!isComments);
						}}
						Icon={MessageCircle}
						count={0}
					/>
				)}
				<SocialIconExplore
					isActive={isSaved}
					onClick={() => {
						setIsSaved(!isSaved);
					}}
					Icon={Bookmark}
					count={0}
				/>
				<ReactIconExplore
					reactions={reactions}
					setReactions={setReactions}
					userReaction={userReaction}
					setUserReaction={setUserReaction}
				/>
				<SocialIconExplore
					Icon={Share}
					isActive={isShared}
					onClick={() => {
						setIsShared(!isShared);
					}}
					count={0}
				/>
			</div>
		</div>
	);
};

export default SocialIconsExploreFullRow;
