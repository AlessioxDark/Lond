import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import pfp from '../../../../assets/pfp.png';
interface ReactionsDialogProps {
	isOpen: boolean;
	onClose: () => {};
}
const ReactionsDialog = ({ isOpen, onClose }: ReactionsDialogProps) => {
	const reactions = [
		{ name: 'Alessio Quaranta', emoji: '👑', handle: 'alessio40', pfp: pfp },
		{ name: 'Marco Bianchi', emoji: '🔥', handle: 'marco_b', pfp: pfp },
		{ name: 'Giulia Rossi', emoji: '❤️', handle: 'giulia_r', pfp: pfp },
		{ name: 'Luca Verdi', emoji: '😂', handle: 'luca_v', pfp: pfp },
		{ name: 'Sara Neri', emoji: '😎', handle: 'sara_n', pfp: pfp },
		{ name: 'Paolo Gialli', emoji: '💯', handle: 'paolo_g', pfp: pfp },
		{ name: 'Elena Blu', emoji: '👏', handle: 'elena_b', pfp: pfp },
		{ name: 'Andrea Viola', emoji: '🌟', handle: 'andrea_v', pfp: pfp },
		{ name: 'Chiara Rosa', emoji: '😍', handle: 'chiara_r', pfp: pfp },
		{ name: 'Davide Grigio', emoji: '🙌', handle: 'davide_g', pfp: pfp },
		{ name: 'Federica Marrone', emoji: '🤯', handle: 'federica_m', pfp: pfp },
		{ name: 'Stefano Nero', emoji: '🤩', handle: 'stefano_n', pfp: pfp },
		{ name: 'Martina Verde', emoji: '👀', handle: 'martina_v', pfp: pfp },
		{ name: 'Francesco Arancio', emoji: '🥰', handle: 'francesco_a', pfp: pfp },
		{ name: 'Valentina Lilla', emoji: '🫶', handle: 'valentina_l', pfp: pfp },
		{ name: 'Riccardo Celeste', emoji: '👍', handle: 'riccardo_c', pfp: pfp },
		{ name: 'Laura Turchese', emoji: '🔥', handle: 'laura_t', pfp: pfp },
		{ name: 'Laura Turchese', emoji: '🔥', handle: 'laura_t', pfp: pfp },
		{ name: 'Laura Turchese', emoji: '🔥', handle: 'laura_t', pfp: pfp },
		{ name: 'Laura Turchese', emoji: '🔥', handle: 'laura_t', pfp: pfp },
		{ name: 'Giorgio Magenta', emoji: '😆', handle: 'giorgio_m', pfp: pfp },
		{ name: 'Anna Azzurra', emoji: '💥', handle: 'anna_a', pfp: pfp },
		{ name: 'Enrico Rosa', emoji: '🥳', handle: 'enrico_r', pfp: pfp },
		{ name: 'Silvia Ciano', emoji: '🤙', handle: 'silvia_c', pfp: pfp },
	];

	const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

	// Raggruppa le reazioni per emoji e conta
	const groupedReactions = useMemo(() => {
		const grouped = reactions.reduce((acc, reaction) => {
			if (!acc[reaction.emoji]) {
				acc[reaction.emoji] = [];
			}
			acc[reaction.emoji].push(reaction);
			return acc;
		}, {} as Record<string, Reaction[]>);

		// Ordina per count decrescente
		return Object.entries(grouped)
			.sort(([, a], [, b]) => b.length - a.length)
			.reduce((acc, [emoji, reactions]) => {
				acc[emoji] = reactions;
				return acc;
			}, {} as Record<string, Reaction[]>);
	}, [reactions]);

	// Reazioni da mostrare (filtrate o tutte)
	const reactionsToShow = selectedEmoji
		? groupedReactions[selectedEmoji] || []
		: reactions;

	const totalReactions = reactions.length;

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
					<div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
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
						<div className="bg-[var(--color-lond-dark)] rounded-lg shadow-2xl w-full max-w-lg h-[36rem] flex flex-col">
							{/* Header */}
							<div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-lond-gray)]">
								<h1 className="text-xl font-bold text-[var(--color-lond-text-primary)] font-montserrat">
									Reactions ({totalReactions})
								</h1>
								<button
									onClick={onClose}
									className="text-[var(--color-lond-light-gray)] hover:text-[var(--color-lond-text-primary)] transition-colors p-1"
								>
									<X size={25} />
								</button>
							</div>

							{/* Emoji Tabs */}
							<div className="p-4 border-b border-[var(--color-lond-gray)]">
								<div className="flex flex-wrap gap-2">
									<button
										onClick={() => setSelectedEmoji(null)}
										className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
											selectedEmoji === null
												? 'bg-[var(--color-lond-accent)] text-[var(--color-lond-text-primary)]'
												: 'bg-[var(--color-lond-gray)] text-[var(--color-lond-light-gray)] hover:bg-[var(--color-lond-gray)]/70 hover:text-[var(--color-lond-text-primary)]'
										}`}
									>
										All {totalReactions}
									</button>
									{Object.entries(groupedReactions).map(
										([emoji, reactionList], index) => {
											return index < 13 ? (
												<button
													key={emoji}
													onClick={() => setSelectedEmoji(emoji)}
													className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
														selectedEmoji === emoji
															? 'bg-[var(--color-lond-accent)] text-[var(--color-lond-text-primary)]'
															: 'bg-[var(--color-lond-gray)] text-[var(--color-lond-light-gray)] hover:bg-[var(--color-lond-gray)]/70 hover:text-[var(--color-lond-text-primary)]'
													}`}
												>
													<span className="text-base">{emoji}</span>
													<span>{reactionList.length}</span>
												</button>
											) : (
												''
											);
										}
									)}
								</div>
							</div>

							{/* Reactions List */}
							<div className="flex-1 overflow-y-auto p-4 custom-scroll">
								<div className="space-y-3">
									{reactionsToShow.map((reaction, index) => (
										<div
											key={`${reaction.handle}-${index}`}
											className="flex items-center justify-between p-3 rounded-lg bg-transparent hover:bg-[var(--color-lond-gray)]/50 transition-colors"
										>
											<div className="flex items-center gap-3">
												<img
													src={reaction.pfp}
													className="w-10 h-10 rounded-full ring-2 ring-[var(--color-lond-gray)] hover:ring-[var(--color-lond-accent)] transition-all duration-300 cursor-pointer"
													alt={`${reaction.name} profile`}
												/>
												<div className="flex flex-col">
													<span className="text-[var(--color-lond-text-primary)] font-medium font-montserrat text-sm">
														{reaction.name}
													</span>
													<span className="text-[var(--color-lond-light-gray)] font-barlow text-xs">
														@{reaction.handle}
													</span>
												</div>
											</div>
											<span className="text-lg">{reaction.emoji}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ReactionsDialog;
