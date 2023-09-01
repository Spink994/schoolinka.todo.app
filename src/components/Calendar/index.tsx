import dayjs from 'dayjs';
import { useState } from 'react';
import { Button } from '../common';
import { generateDate, months } from '@/utils/calendar';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useAppSelector } from '@/redux/app/hooks';

export default function Calendar() {
	const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat'];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(
		currentDate.toDate().toDateString()
	);
	const { arrayOfDates } = generateDate(today.month(), today.year());

	const { todos } = useAppSelector((state) => state.todo);

	return (
		<div className="h-max w-full rounded-lg p-3 shadow-md">
			{/* Navigate Calendar */}
			<div className="flex w-full items-center justify-between">
				<GrFormPrevious
					className="h-5 w-5 cursor-pointer transition-all hover:scale-105"
					onClick={() => {
						setToday(today.month(today.month() - 1));
					}}
				/>
				<h1 className=" cursor-pointer text-sm transition-all hover:scale-[1.03]">
					{months[today.month()]}, {today.year()}
				</h1>
				<GrFormNext
					className="h-5 w-5 cursor-pointer transition-all hover:scale-105"
					onClick={() => {
						setToday(today.month(today.month() + 1));
					}}
				/>
			</div>

			{/* Today's date  */}
			<div className="my-4 grid grid-cols-1 gap-3 [@media(min-width:350px)]:grid-cols-3">
				<span className="col-span-2 flex h-10 items-center rounded-lg border px-3 text-sm">
					{months[today.month()]} {today.date()}, {today.year()}
				</span>
				<Button
					onClick={() => {
						setToday(currentDate);
					}}
					className="w-full justify-center rounded-lg border bg-transparent"
				>
					<span className="my-4 flex h-10 items-center px-6 font-semibold text-gray-900">
						Today
					</span>
				</Button>
			</div>

			{/* The days of the week */}
			<div className="grid grid-cols-7">
				{days.map((day, index) => {
					return (
						<h1
							key={index}
							className="grid h-10 select-none place-content-center bg-transparent text-center text-sm text-gray-800"
						>
							{day}
						</h1>
					);
				})}
			</div>

			{/* All the days in the current month grid*/}
			<div className="grid grid-cols-7 gap-2">
				{arrayOfDates.map(({ date, currentMonth, today }, index) => {
					const findMatchingUpcomingTodoDate = todos.find(
						(todo) =>
							dayjs(todo.updatedAt).format('YYYY-MM-DD') ===
								date.format('YYYY-MM-DD') &&
							dayjs(todo.updatedAt).diff() >= 0
					);

					const findMatchingPastTodoDate = todos.find(
						(todo) =>
							dayjs(todo.updatedAt).format('YYYY-MM-DD') ===
								date.format('YYYY-MM-DD') &&
							dayjs(todo.updatedAt).diff() < 0
					);
					return (
						<div
							key={index}
							className="grid h-10 place-content-center p-2 text-center text-sm"
						>
							{/* a dy in the current month */}
							<button
								className={cn(
									currentMonth ? '' : '!text-gray-400',
									today ? '!bg-[#3F5BF6] !text-white' : '',
									selectDate === date.toDate().toDateString()
										? 'bg-black text-white'
										: 'text-gray-700',
									'relative grid h-10 w-10 cursor-pointer select-none place-content-center rounded-full transition-all hover:bg-gray-100 hover:text-gray-900'
								)}
								onClick={() => {
									setSelectDate(date.toDate().toDateString());
								}}
							>
								{date.date()}

								{/* To add a purple dot to todos that are upcoming */}
								{findMatchingUpcomingTodoDate && (
									<span className="absolute bottom-1 left-1/2 flex h-1 w-1 -translate-x-1/2 rounded-full bg-[#3F5BF6]"></span>
								)}

								{/* To add a gray dot to todos that are in the past */}
								{findMatchingPastTodoDate && (
									<span className="absolute bottom-1 left-1/2 flex h-1 w-1 -translate-x-1/2 rounded-full bg-gray-400"></span>
								)}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function cn(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}
