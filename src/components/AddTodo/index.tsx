import { GrFormClose } from 'react-icons/gr';
import { FaBell } from 'react-icons/fa';
import { Button } from '../common';
import { useRef, useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import TimeSettings from '../TimeSettings';
import { useHandleClickOutside } from '@/hooks/useClickOutside';
import { useAppDispatch } from '@/redux/app/hooks';
import {
	addTodo,
	handleShowAddTodo,
	handleShowToDoPopUp,
} from '@/redux/features/todo/todoSlice';
import DateSettings from '../DateSettings';

export default function AddTodo() {
	/** The states for setting the date and time values */
	const [dateValue, setDateValue] = useState<string | null>(null);
	const [startTime, setStartTime] = useState<string | null>(null);
	const [endTime, setEndTime] = useState<string | null>(null);

	/** The states for setting the date and time dropdown on/off */
	const [startTimeDropDown, setStartTimeDropDown] = useState(false);
	const [endTimeDropDown, setEndTimeDropDown] = useState(false);
	const [monthDropDown, setMonthDropDown] = useState(false);

	const [title, setTitle] = useState<string>('');

	const dateSettingsContainerRef = useRef<HTMLDivElement>(null);

	function closeAllTimeSettingsDropDown() {
		setStartTimeDropDown(false);
		setEndTimeDropDown(false);
		setMonthDropDown(false);
	}

	/** This hook monitors a click outside the specified ref and closes the dropdowns
	 * if they are current toggled on */
	useHandleClickOutside(
		dateSettingsContainerRef,
		closeAllTimeSettingsDropDown
	);

	const dispatch = useAppDispatch();

	const todaysDateInISOFormat = new Date(
		new Date().toISOString().slice(0, 10)
	).toISOString();

	function handleCloseTodo() {
		dispatch(handleShowToDoPopUp({ status: false }));
		dispatch(handleShowAddTodo({ status: false }));
	}

	function handleAddToDo() {
		if (title === '') return;
		dispatch(
			addTodo({
				todo: {
					title: title,
					todoDate: `${dateValue}T${endTime}:30.454Z` as string,
					time: {
						startTime: startTime as string,
						endTime: endTime as string,
					},
				},
			})
		);

		setTimeout(() => {
			handleCloseTodo();
		}, 50);
	}

	return (
		<div className="h-[80vh] w-full  rounded-lg bg-white p-4 shadow-md [@media(min-width:1020px)]:h-max">
			<div className="mb-4 flex w-full justify-between gap-4">
				<h1 className="text-lg font-semibold">Add Task</h1>
				<GrFormClose
					onClick={() => handleCloseTodo()}
					className="text-[24px]"
				/>
			</div>

			{/* Input area */}
			<textarea
				onChange={(e) => setTitle(e.target.value)}
				name="task label"
				className="min-h-[140px] w-full resize-none rounded-lg border border-gray-300 bg-gray-100 p-3 outline-none"
			/>

			{/* Date settings */}
			<div
				ref={dateSettingsContainerRef}
				className="items-centers mt-4 grid w-full justify-stretch gap-2 lg:grid-cols-2 xl:grid-cols-3 [@media(min-width:390px)]:grid-cols-3"
			>
				<div className="relative w-full">
					<Button
						onClick={() => setMonthDropDown((prev) => !prev)}
						className="w-full overflow-x-hidden whitespace-nowrap border border-gray-300 bg-transparent font-semibold !text-gray-500"
					>
						<FiCalendar
							strokeWidth={2.5}
							className="text-[19px]"
						/>
						{/* Shows today if the current date is equal to the chosen date, which is the detault date */}
						{new Date(dateValue as string).toISOString() ===
						todaysDateInISOFormat
							? 'Today'
							: dateValue}
					</Button>

					{/* Date dropdown */}
					<DateSettings
						isOpen={monthDropDown}
						dateSetter={setDateValue}
					/>
				</div>

				{/* Start time */}
				<div className="relative w-full">
					<Button
						onClick={() => setStartTimeDropDown((prev) => !prev)}
						className="border border-gray-300 bg-transparent  font-semibold !text-gray-500"
					>
						<FiClock
							className="text-[19px]"
							strokeWidth={2.5}
						/>
						{startTime || '00:00'}
					</Button>

					{/* Start Time dropdown */}
					<TimeSettings
						isOpen={startTimeDropDown}
						timeSetter={setStartTime}
					/>
				</div>

				{/* End time */}
				<div className="relative w-full">
					<Button
						onClick={() => setEndTimeDropDown((prev) => !prev)}
						className="border border-gray-300 bg-transparent  font-semibold !text-gray-500"
					>
						<FiClock
							className="text-[19px]"
							strokeWidth={2.5}
						/>
						{endTime || '00:00'}
					</Button>

					{/* End Time dropdown */}
					<TimeSettings
						isOpen={endTimeDropDown}
						timeSetter={setEndTime}
					/>
				</div>
			</div>

			{/* Alert time */}
			<Button className="mb-4 bg-transparent !p-0">
				<FaBell className="text-[#667085]" />{' '}
				<span className="text-gray-900">10 Minutes before</span>
				<GrFormClose className="ml-auto text-[20px]" />
			</Button>

			{/* Action Buttons */}
			<div className="flex gap-6">
				<Button
					onClick={() => handleCloseTodo()}
					className="border border-gray-300 bg-transparent font-semibold !text-gray-700"
				>
					Cancel
				</Button>
				<Button
					disabled={title === ''}
					onClick={() => handleAddToDo()}
					className="font-[600] disabled:pointer-events-none disabled:opacity-50"
				>
					Add
				</Button>
			</div>
		</div>
	);
}
