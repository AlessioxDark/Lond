import React from 'react';

const SocialIconExplore = ({ Icon, count }: any) => {
	return (
		<div className="flex items-center gap-1">
			<Icon size={15} />
			<span>{count}</span>
		</div>
	);
};

export default SocialIconExplore;
