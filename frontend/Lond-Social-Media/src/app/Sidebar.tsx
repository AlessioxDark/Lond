import React, { useEffect, useState } from 'react';
import { BsFilePlayFill } from 'react-icons/bs';
import { FaBell, FaPlus } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { MdChatBubble, MdOutlineExplore } from 'react-icons/md';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useNavigate } from 'react-router';
import londLogo from '../assets/Lond-Logo.png';

type ButtonType = {
	id: number;
	name: string;
	icon: React.ReactElement; // Indica che è un componente React
};

export default function Sidebar() {
	const [active, setActive] = useState<string>('Home');
	const navigate = useNavigate();
	const buttons: ButtonType[] = [
		{
			id: 1,
			name: 'Home',
			icon: <IoMdHome />,
		},
		{
			id: 2,
			name: 'Explore',
			icon: <MdOutlineExplore />,
		},

		{
			id: 3,
			name: 'Londies',
			icon: <BsFilePlayFill />,
		},
		{
			id: 4,
			name: 'Notifications',
			icon: <FaBell />,
		},
		{
			id: 5,
			name: 'Dms',
			icon: <MdChatBubble />,
		},
		{
			id: 6,
			name: 'Create',
			icon: <FaPlus />,
		},
		{
			id: 7,
			name: 'Profile',
			icon: <FaPlus />,
		},
	];
	useEffect(() => {
		navigate(active === 'Home' ? '/' : `/${active.toLowerCase()}`);
	}, [active]);
	return (
		<div className="w-13/100 fixed top-15 left-10 h-screen ">
			<div className="flex flex-row items-center ">
				<img src={londLogo} alt="" className="w-23" />
				<span className="font-Montserrat font-black text-white text-[48px] m-3">
					LOND
				</span>
			</div>
			<div className="flex flex-col gap-5 mt-17">
				{buttons.map(({ id, icon, name }) => {
					return (
						<div
							key={id}
							className={`flex flex-row gap-2 items-center text-slate-400 w-full rounded-4xl p-4  hover:bg-lond-accent-hover
    
    hover:border-slate-600/60 hover:text-white
     ${active == name ? 'bg-lond-accent border-slate-600/60 text-white' : ''}`}
							onClick={() => {
								setActive(name);
							}}
						>
							{React.cloneElement(icon, {
								className: `${
									active === name ? 'text-white' : 'text-slate-400'
								} text-[32px] group-hover:text-black`,
							})}

							<span
								className={` font-Montserrat font-black text-2xl group-hover:text-black  ${
									active == name ? 'text-white' : 'text-slate-400'
								}`}
							>
								{name}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
