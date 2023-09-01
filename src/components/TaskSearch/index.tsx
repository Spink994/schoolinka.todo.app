import { useAppSelector } from '@/redux/app/hooks';
import { Todo } from '@/redux/features/todo/todo.types';
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import TodoCard from '../TodoCard';
import { useDebounce } from '@/hooks/useDebounce';
import { GrFormClose } from 'react-icons/gr';
import useStopScrolling from '@/hooks/useStopScrolling';

export default function TaskSearch() {
	const { todos } = useAppSelector((state) => state.todo);
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState<Todo[]>([]);
	const [resultModalStateHidden, setResultsModalStateHidden] = useState(true);

	const ref = useRef<HTMLDivElement>(null);

	useStopScrolling({ isOpen: resultModalStateHidden });

	const debounce = useDebounce(searchQuery, 300);

	useEffect(() => {
		const matchingResults = todos?.filter((todo) =>
			todo?.title?.toLowerCase()?.includes(debounce.toLowerCase())
		);
		setResults(matchingResults);

		if (searchQuery === '') setResults([]);
	}, [debounce, searchQuery]);

	return (
		<>
			{/* Search result modal */}
			{resultModalStateHidden ? null : (
				<div
					ref={ref}
					aria-hidden={resultModalStateHidden}
					onClick={(e) => {
						if (e.target === ref.current) {
							setResultsModalStateHidden(true);
							setSearchQuery('');
						}
					}}
					className="fixed bottom-0 left-0 z-50 flex h-[95vh] w-screen flex-col justify-end bg-black/20 backdrop-blur-sm transition-transform [&[aria-hidden='true']]:translate-y-[200vh] [@media(min-width:1020px)]:hidden"
				>
					<button
						onClick={() => {
							setResultsModalStateHidden(true);
							setSearchQuery('');
						}}
						className="mb-4 ml-auto mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-white "
					>
						<GrFormClose />
					</button>

					<div className="h-[65vh] w-full overflow-y-scroll rounded-t-3xl border bg-white p-4 pb-24">
						{results.length > 0 ? (
							<div className="flex flex-col gap-4">
								{results !== null &&
									results.map((todo) => (
										<TodoCard
											key={todo.id}
											todo={todo}
										/>
									))}
							</div>
						) : (
							<div className="flex h-full items-center justify-center text-sm">
								<p>
									{results.length} result(s) found for{' '}
									{searchQuery}
								</p>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Search input  */}
			<div className="fixed bottom-0 left-0 z-[60] w-full bg-white p-4">
				<div className="relative flex">
					<input
						onFocus={() => setResultsModalStateHidden(false)}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						type="text"
						placeholder="Input task"
						className="h-12 w-full rounded-lg border border-gray-300 px-4 outline-none"
					/>
					<FaMicrophone className="absolute right-4 top-1/2 -translate-y-1/2 text-[24px] text-[#3F5BF6]" />
				</div>
			</div>
		</>
	);
}
