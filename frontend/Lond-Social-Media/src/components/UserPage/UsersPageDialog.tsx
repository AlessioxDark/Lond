import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Crown, Star, Users, X } from 'lucide-react';
import React, { Fragment } from 'react';
import pfp from '../../assets/pfp.png';
const UsersPageDialog = ({ isOpen, onClose, data, type }) => {
	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-hidden">
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/60" />
				</TransitionChild>

				<div className="fixed inset-0 flex items-center justify-center p-4">
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="bg-[#2d3b4e] rounded-lg shadow-2xl w-full max-w-lg h-[36rem] flex flex-col">
							<div className="flex items-center justify-between px-5 py-3 border-b border-slate-600">
								<h1 className="text-xl font-bold text-white">{type}</h1>
								<button
									onClick={onClose}
									className="text-slate-400 hover:text-white transition-colors p-1"
								>
									<X size={25} />
								</button>
							</div>

							<div className="flex-1 overflow-y-auto p-4">
								<div className="space-y-3">
									{data.map((dataElement, index) => {
										return (
											<div
												key={`${dataElement.handle}-${index}`}
												className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
											>
												<div className="flex items-center gap-3">
													<img
														src={dataElement.pfp}
														className="w-10 h-10 rounded-full ring-2 ring-slate-600 hover:ring-purple-500 transition-all duration-300 cursor-pointer"
														alt={`${dataElement.name} profile`}
													/>
													<div className="flex flex-col">
														<span className="text-white font-medium text-sm">
															{dataElement.name}
														</span>
														<span className="text-slate-400 text-xs">
															@{dataElement.handle}
														</span>
													</div>
												</div>
												<motion.button
													whileTap={{ scale: 0.95 }}
													className="bg-slate-800  text-base  font-Montserrat text-white font-medium rounded-2xl px-5 py-2"
												>
													{type === 'Seguiti' ? 'Segui già' : 'Follow'}
												</motion.button>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						{/*
             <motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-sm"
							onClick={onClose}
						>
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								className=" bg-[#253141] rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col border border-white/10"
								onClick={(e) => e.stopPropagation()}
							>
							
								<div className="flex items-center justify-between p-6 border-b border-white/10">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
											<Users className="w-5 h-5 text-white" />
										</div>
										<div>
											<h2 className="text-xl font-bold text-white">{type}</h2>
											<p className="text-sm text-slate-400">
												{data.length} utenti
											</p>
										</div>
									</div>
									<button
										onClick={onClose}
										className="p-2 rounded-full hover:bg-white/10 transition-colors"
									>
										<X className="w-5 h-5 text-slate-400" />
									</button>
								</div>

								
								<div className="flex-1 overflow-y-auto p-6">
									<div className="space-y-4">
										{data.map((user, index) => (
											<motion.div
												key={`${user.handle}-${index}`}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: index * 0.05 }}
												className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20"
											>
												<div className="flex items-center gap-4">
													<div className="relative">
														<img
															src={user.pfp}
															className="w-12 h-12 rounded-full ring-2 ring-white/20 hover:ring-purple-500/50 transition-all duration-300"
															alt={user.name}
														/>
													</div>
													<div>
														<div className="flex items-center gap-2">
															<span className="text-white font-semibold">
																{user.name}
															</span>
														</div>
														<span className="text-slate-400 text-sm">
															@{user.handle}
														</span>
													</div>
												</div>
												<motion.button
													whileTap={{ scale: 0.95 }}
													className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
														user.isFollowing
															? 'bg-slate-800 shadow-lg text-white'
															: 'bg-white/10 text-white border border-white/20 '
													}`}
												>
													Follow
												</motion.button>
											</motion.div>
										))}
									</div>
								</div>
							</motion.div>
						</motion.div> */}
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default UsersPageDialog;
