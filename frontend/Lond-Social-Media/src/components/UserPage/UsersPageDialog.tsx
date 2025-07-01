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
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 flex items-center justify-center p-4  backdrop-blur-sm"
						>
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								className=" bg-[#253141] rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col border border-white/10"
							>
								<div className="flex items-center justify-between p-3 pl-5 border-b border-white/10">
									<div className="flex items-center gap-3">
										<div>
											<h2 className="text-2xl font-bold text-white">{type}</h2>
										</div>
									</div>
									<button
										onClick={onClose}
										className="p-2 rounded-full hover:bg-white/10 transition-colors"
									>
										<X className="w-6 h-6 text-slate-400" />
									</button>
								</div>

								<div className="flex-1 overflow-y-auto p-6">
									<div className="space-y-4">
										{data.map((user, index) => (
											<motion.div
												key={`${user.handle}-${index}`}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
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
															? 'bg-slate-800 hover:bg-slate-700 text-white'
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
						</motion.div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default UsersPageDialog;
