import { motion } from 'framer-motion';
import { MoreHorizontal, TrendingUp, Verified, Zap } from 'lucide-react';
import React, { memo } from 'react';

interface PostHeaderProps {
	pfp: string;
	name: string;
	handle: string;
	isViral: boolean;
	isVerified: boolean;
	createdAt: Date;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

const PostHeader = memo(
	({
		name,
		handle,
		pfp,
		isViral,
		isVerified,
		createdAt,
		size = 'md',
	}: PostHeaderProps) => {
		// Configurazioni responsive per le diverse grandezze
		const sizeConfig = {
			sm: {
				container: 'gap-2 mb-3',
				avatar: 'w-8 h-8',
				nameText: 'text-sm font-semibold',
				handleText: 'text-xs',
				verifiedIcon: 14,
				trendingIcon: 10,
				viralPadding: 'px-1.5 py-0.5',
				viralText: 'text-xs',
				moreIcon: 16,
				buttonPadding: 'p-1.5',
			},
			md: {
				container: 'gap-3 mb-4',
				avatar: 'w-11 h-11',
				nameText: 'text-base font-bold',
				handleText: 'text-sm',
				verifiedIcon: 16,
				trendingIcon: 12,
				viralPadding: 'px-2 py-0.5',
				viralText: 'text-xs',
				moreIcon: 18,
				buttonPadding: 'p-2',
			},
			lg: {
				container: 'gap-4 mb-5',
				avatar: 'w-14 h-14',
				nameText: 'text-lg font-bold',
				handleText: 'text-base',
				verifiedIcon: 18,
				trendingIcon: 14,
				viralPadding: 'px-3 py-1',
				viralText: 'text-sm',
				moreIcon: 20,
				buttonPadding: 'p-2.5',
			},
			xl: {
				container: 'gap-5 mb-6',
				avatar: 'w-16 h-16',
				nameText: 'text-xl font-bold',
				handleText: 'text-lg',
				verifiedIcon: 20,
				trendingIcon: 16,
				viralPadding: 'px-4 py-1.5',
				viralText: 'text-sm',
				moreIcon: 22,
				buttonPadding: 'p-3',
			},
		};

		const config = sizeConfig[size];

		return (
			<div className={`flex items-center ${config.container}`}>
				<div className="relative flex-shrink-0">
					<img
						src={pfp}
						alt={`${name} profile`}
						className={`${config.avatar} rounded-full ring-1 ring-lond-gray/40 hover:ring-lond-accent/60 transition-all duration-300 cursor-pointer`}
						loading="lazy"
					/>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-1 sm:gap-2 mb-0.5 flex-wrap">
						<span
							className={`text-lond-text-primary font-montserrat ${config.nameText} truncate`}
						>
							{name}
						</span>

						{isVerified && (
							<Verified
								size={config.verifiedIcon}
								className="text-lond-accent flex-shrink-0"
								aria-label="Account verificato"
							/>
						)}

						{isViral && (
							<div
								className={`flex items-center gap-1 ${config.viralPadding} rounded-full bg-lond-yellow/15 border border-lond-yellow/40 flex-shrink-0`}
							>
								<TrendingUp
									size={config.trendingIcon}
									className="text-lond-yellow"
								/>
								<span
									className={`text-lond-yellow font-bold ${config.viralText}  xs:inline`}
								>
									VIRAL
								</span>
							</div>
						)}
					</div>

					<div
						className={`flex items-center gap-1 sm:gap-2 text-lond-light-gray font-barlow ${config.handleText}`}
					>
						<span className="truncate">{handle}</span>
						<span className="hidden xs:inline">•</span>
						<time dateTime={createdAt.toISOString()} className="truncate">
							{new Date(createdAt).toLocaleString('it-IT', {
								day: 'numeric',
								month: 'short',
								hour: '2-digit',
								minute: '2-digit',
							})}
						</time>
					</div>
				</div>

				<button
					className={`${config.buttonPadding} rounded-full hover:bg-lond-gray/60 transition-colors flex-shrink-0`}
					aria-label="Altre opzioni"
				>
					<MoreHorizontal
						size={config.moreIcon}
						className="text-lond-light-gray hover:text-lond-text-primary transition-colors"
					/>
				</button>
			</div>
		);
	}
);

PostHeader.displayName = 'PostHeader';

export default PostHeader;
