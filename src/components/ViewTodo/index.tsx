import { FiCalendar, FiClock } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { Button } from '../common';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
	deleteTodo,
	handleShowEditTodo,
	handleShowToDoPopUp,
	handleViewTodo,
} from '@/redux/features/todo/todoSlice';
import dayjs from 'dayjs';

export default function ViewTodo() {
	const { todo } = useAppSelector((state) => state.todo);
	const dispatch = useAppDispatch();

	function handleCloseTodo() {
		dispatch(handleShowToDoPopUp({ status: false }));
		dispatch(handleViewTodo({ status: false }));
	}

	function handleEditTodo() {
		dispatch(handleViewTodo({ status: false }));
		dispatch(handleShowEditTodo({ status: true }));
		dispatch(handleShowToDoPopUp({ status: true }));
	}

	return (
		<div className="h-[80vh] w-full rounded-lg p-4 shadow-md [@media(min-width:1020px)]:h-max">
			<div className="mb-4 flex w-full justify-end gap-4">
				<GrFormClose
					onClick={() => handleCloseTodo()}
					className="text-[24px]"
				/>
			</div>

			{/* Task title */}
			<h1 className="mb-6 text-lg font-semibold capitalize">
				{todo?.title}
			</h1>

			{/* Time details */}
			<div className="flex items-center gap-3">
				<FiCalendar
					strokeWidth={2.5}
					className="text-[19px] text-[#3F5BF6]"
				/>
				<span>{dayjs(todo?.todoDate).format('D MMMM, YYYY')}</span>
			</div>

			<div className="mt-1 flex items-center gap-3">
				<FiClock
					strokeWidth={2.5}
					className="text-[19px] text-[#3F5BF6]"
				/>
				<span>
					{todo?.time?.startTime} - {todo?.time?.endTime}
				</span>
			</div>

			{/* Action Buttons */}
			<div className="mt-10 flex gap-6">
				<Button
					onClick={() => {
						if (todo === null) return;
						dispatch(deleteTodo({ id: todo.id as number }));
						handleCloseTodo();
					}}
					className="border border-gray-300 bg-transparent font-semibold !text-gray-700"
				>
					Delete
				</Button>
				<Button
					onClick={() => handleEditTodo()}
					className="font-[600]"
				>
					Edit
				</Button>
			</div>
		</div>
	);
}
