import React from 'react';

const RegisterPage = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col gap-7 w-[30%] h-[40%]">
				<h1 className="text-white font-Montserrat font-bold text-4xl text-center">
					Registrati
				</h1>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col">
						<label
							htmlFor="email"
							className="font-Lato text-lg text-white font-base mb-2"
						>
							Email o Username
						</label>
						<input
							type="text"
							id="email"
							name="email"
							className="p-3 font-Lato text-white text-base border-2 border-slate-500 bg-slate-800 rounded-2xl outline-none"
							placeholder="Inserisci un email o username"
						/>
					</div>
					<div className="flex flex-col">
						<label
							htmlFor="password"
							className="font-Lato text-lg text-white font-base mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="p-3 font-Lato text-white text-base border-2 border-slate-500 bg-slate-800 rounded-2xl outline-none"
							placeholder="Inserisci la password"
						/>
					</div>
				</div>
				{/* <label htmlFor="email">Email o Username</label>
				<input type="text" id="email" name="email" /> */}
			</div>
		</div>
	);
};

export default RegisterPage;
