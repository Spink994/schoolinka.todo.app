import dayjs from 'dayjs';
import relativeTime from 'dayjs//plugin/relativeTime';
import AppTopNav from '@/components/AppTopNav';
import { useEffect, useState } from 'react';
import { months } from '@/utils/calendar';
import { Button } from '@/components/common';
import { FiPlus } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import Pagination from '@/components/Pagination';
import TodoCard from '@/components/TodoCard';
import DatePreview from '@/components/DatePreview';
import Calendar from '@/components/Calendar';
import AddTodo from '@/components/AddTodo';
import {
	handleShowAddTodo,
	handleShowToDoPopUp,
} from '@/redux/features/todo/todoSlice';
import ViewTodo from '@/components/ViewTodo';
import EditTodo from '@/components/EditTodo';
import TaskSearch from '@/components/TaskSearch';
import useResizer from '@/hooks/useResizer';
import useStopScrolling from '@/hooks/useStopScrolling';

dayjs.extend(relativeTime);

function Home() {
	const { screenResize } = useResizer();

	const itemsPerPage = screenResize >= 540 ? 10 : 20;

	const currentDate = dayjs();
	const [today] = useState(currentDate);

	const { todos, showAddTodo, viewTodo, showEditTodo, showTodoPopUp } =
		useAppSelector((state) => state.todo);

	const [currentPage, setCurrentPage] = useState(1);

	/** Getting the index of the first todo item and the last todo item to be shown per page */
	const lastIndex = currentPage * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const currentTodosPerPage = todos.slice(firstIndex, lastIndex);

	/**
	 * This state sets when the pagination should be hidden and shows the search input field instead
	 */
	const [hidePagination, setHidePagination] = useState(false);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const dispatch = useAppDispatch();

	useStopScrolling({
		reverseEffect: true,
		isOpen: showAddTodo || viewTodo || showEditTodo || showTodoPopUp,
	});

	useEffect(() => {
		// Hides the pagination component when the screen size is lesser than 540px
		if (screenResize >= 540) setHidePagination(false);
		else setHidePagination(true);
	}, [screenResize]);

	return (
		<>
			{/* The top navigation bar / header */}
			<AppTopNav />

			{/* Main Section */}
			<section className="max-w-screen w-full pb-20 pt-12">
				<div className="mx-auto mb-8 flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-6 overflow-x-hidden overflow-y-scroll bg-white px-[4%]">
					{/* Greetings */}
					<div>
						<h1 className="text-[30px] font-semibold leading-9 text-gray-900">
							Good morning!
						</h1>
						<span className="text-base font-normal text-gray-600">
							You got some task to do.
						</span>
					</div>

					{/* Create task button */}
					<Button
						disabled={viewTodo || showEditTodo}
						onClick={() => {
							dispatch(
								handleShowToDoPopUp({ status: !showTodoPopUp })
							);
							dispatch(handleShowAddTodo({ status: true }));
						}}
						className="hidden max-w-[176px] disabled:pointer-events-none disabled:opacity-30 [@media(min-width:1020px)]:flex"
					>
						<FiPlus className="text-xl" /> Create Task
					</Button>
				</div>

				{/* The main content */}
				<div className="mx-auto flex w-full max-w-[1440px] gap-6 overflow-x-hidden overflow-y-scroll bg-white px-[4%]">
					{/* The left side of the main content */}
					<div className="relative flex w-full flex-col [@media(min-width:1020px)]:max-w-[66%]">
						{/* Calendar Preview */}
						<div className="mb-8 flex w-full flex-col gap-4">
							<h1 className="select-none font-semibold">
								{months[today.month()]}, {today.year()}
							</h1>

							{/* All the days in the current month */}
							<DatePreview />
						</div>

						{/* My tasks */}
						<div>
							<h2 className="mb-6 select-none font-semibold">
								My Tasks
							</h2>
							<div className="flex flex-col gap-4">
								{currentTodosPerPage.map((todo) => {
									return (
										<TodoCard
											key={todo.id}
											todo={todo}
										/>
									);
								})}
							</div>
						</div>

						{/* Pagination or Task search */}
						{hidePagination ? (
							<TaskSearch />
						) : (
							<Pagination
								currentPage={currentPage}
								handlePageChange={handlePageChange}
								dataLength={todos.length}
								itemsPerPage={itemsPerPage}
							/>
						)}
					</div>

					{/* Create task and calendar */}
					<div
						aria-hidden={showTodoPopUp}
						className="fixed bottom-0 left-0 z-[100] flex w-full shrink flex-col  gap-6 rounded-t-3xl border-l bg-white shadow-xl transition-all before:absolute before:inset-0 before:-top-[110%] before:isolate before:-z-10 before:bg-black/20  before:backdrop-blur-sm [&[aria-hidden='false']]:translate-y-[200vh] [@media(min-width:1020px)]:relative [@media(min-width:1020px)]:flex [@media(min-width:1020px)]:max-w-[34%] [@media(min-width:1020px)]:rounded-none [@media(min-width:1020px)]:pl-5 [@media(min-width:1020px)]:shadow-none [@media(min-width:1020px)]:before:hidden [@media(min-width:1020px)]:[&[aria-hidden='false']]:translate-y-[0] "
					>
						{/* Add todo component */}
						{showAddTodo && (
							<div className="absolute -top-[86px] z-10 h-max w-full overflow-hidden rounded-t-3xl border bg-white [@media(min-width:1020px)]:left-[18px] [@media(min-width:1020px)]:top-0 [@media(min-width:1020px)]:h-full [@media(min-width:1020px)]:rounded-none [@media(min-width:1020px)]:border-none">
								<AddTodo />
							</div>
						)}
						{/* View Todo component */}
						{viewTodo && (
							<div className="absolute -top-[86px] z-10 h-max w-full overflow-hidden rounded-t-3xl border bg-white [@media(min-width:1020px)]:left-[18px] [@media(min-width:1020px)]:top-0 [@media(min-width:1020px)]:h-full [@media(min-width:1020px)]:rounded-none [@media(min-width:1020px)]:border-none">
								<ViewTodo />
							</div>
						)}

						{/* Edit Todo component */}
						{showEditTodo && (
							<div className="absolute -top-[86px] z-10 h-max w-full overflow-hidden rounded-t-3xl border bg-white [@media(min-width:1020px)]:left-[18px] [@media(min-width:1020px)]:top-0 [@media(min-width:1020px)]:h-full [@media(min-width:1020px)]:rounded-none [@media(min-width:1020px)]:border-none">
								<EditTodo />
							</div>
						)}

						{/* Calendar component */}
						<div className="rounded-t-3xl border bg-white [@media(min-width:1020px)]:rounded-none [@media(min-width:1020px)]:border-none">
							<Calendar />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Home;
