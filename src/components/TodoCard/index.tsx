import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { Todo } from '@/redux/features/todo/todo.types';
import {
	getSingleToDo,
	handleShowToDoPopUp,
	handleViewTodo,
	updateToDo,
} from '@/redux/features/todo/todoSlice';
import dayjs from 'dayjs';
import { CgCheckR } from 'react-icons/cg';
import { FiSquare } from 'react-icons/fi';

type TodoCardType = {
	todo: Todo;
};

export default function TodoCard({ todo }: TodoCardType) {
	const { showAddTodo, viewTodo, showEditTodo } = useAppSelector(
		(state) => state.todo
	);
	const valueOfTodoDateFromToday = dayjs(todo.todoDate).fromNow();
	const dispatch = useAppDispatch();

	return (
		<div
			onClick={() => {
				dispatch(getSingleToDo({ id: todo.id }));
				dispatch(handleViewTodo({ status: true }));
				dispatch(handleShowToDoPopUp({ status: true }));
			}}
			aria-disabled={showAddTodo || viewTodo || showEditTodo}
			className="flex min-h-[72px] w-full items-center  justify-between border-b-2 border-gray-100 bg-gray-50 px-[4%] py-4 hover:bg-[#EAEDFE] md:px-6 [&[aria-disabled='true']]:pointer-events-none [&[aria-disabled='true']]:opacity-60"
			key={todo.id}
		>
			<div className="flex items-center gap-3">
				<button
					className="w-max bg-transparent p-0"
					onClick={(e) => {
						e.stopPropagation();
						dispatch(
							updateToDo({
								todo: { ...todo, completed: !todo.completed },
							})
						);
					}}
				>
					{todo.completed ? (
						<CgCheckR className="rounded-[6px] bg-[#3F5BF640] text-[20px] text-[#3F5BF6]" />
					) : (
						<FiSquare className="rounded-[6px] bg-white text-[20px] text-gray-300" />
					)}
				</button>

				<div>
					<p
						aria-checked={todo.completed}
						className="text-sm font-[500] [&[aria-checked='true']]:line-through [&[aria-checked='true']]:opacity-30"
					>
						{todo.title}
					</p>
					<span
						aria-checked={todo.completed}
						className="text-sm text-gray-600 [&[aria-checked='true']]:line-through [&[aria-checked='true']]:opacity-30"
					>
						{todo.time.startTime} - {todo.time.endTime}
					</span>
				</div>
			</div>

			<span className="inline-flex text-sm capitalize text-gray-600">
				{valueOfTodoDateFromToday}
			</span>
		</div>
	);
}
