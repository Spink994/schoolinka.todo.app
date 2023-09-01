import { useEffect, useState } from 'react';
import { generateYearsArray, getDaysInMonth } from './timeGenerator';
import { months } from '@/utils/calendar';

interface IDateSettings {
	dateSetter: React.Dispatch<React.SetStateAction<string | null>>;
	isOpen: boolean;
}

/**
 * This is a custom timer function generates a timer that allows the selection of time for a specific task.
 * @param dateSetter - a react setState for getting the value of the time from this component
 * @param isOpen - a boolean value that determines whether the component should be visible or not.
 * @returns - void
 */
export default function DateSettings({ dateSetter, isOpen }: IDateSettings) {
	const [time, setTimer] = useState<{
		month: number;
		day: number;
		year: number;
	}>({
		/** Setting the default month, day and year to the current day's date */
		month: Number(new Date().toISOString().slice(5, 7)),
		day: Number(new Date().toISOString().slice(8, 10)),
		year: new Date().getFullYear(),
	});

	useEffect(() => {
		dateSetter(
			() =>
				/** Just making sure that the generated time is prefixed with zero if the number is less than 10
				 * and also converting the output to a regular date format of - 2023-08-31 using string literals
				 */
				`${time.year}-${
					time.month < 10 ? `0${time.month}` : time.month
				}-${time.day < 10 ? `0${time.day}` : time.day}`
		);
	}, [time.day, time.month, time.year]);

	return (
		<>
			{isOpen ? (
				<div className="custom-scrollbar-variant-two absolute -top-[300%] z-20 flex h-[400px] w-[calc(130%)] max-w-[300px]  overflow-hidden rounded-md border border-gray-100 bg-white p-3 text-sm shadow-lg [@media(min-width:1020px)]:top-[calc(100%+8px)]">
					{/* Months */}
					<div className="flex w-full max-h-[98%] overflow-y-hidden items-center">
						<ul className="custom-scrollbar flex h-[400px] flex-1 flex-col items-end overflow-y-scroll py-4 pr-1">
							{months.map((month, idx) => (
								<li key={`${month}month`}>
									<a
										onClick={() =>
											setTimer(() => ({
												...time,
												month: idx + 1,
											}))
										}
										aria-selected={idx + 1 === time.month}
										className="flex cursor-pointer p-1 hover:bg-[#3F5BF6] hover:text-white [&[aria-selected='true']]:bg-[#3F5BF6] [&[aria-selected='true']]:text-white"
									>
										{month.slice(0, 3)}
									</a>
								</li>
							))}
						</ul>

						{/* Days in the selected month */}
						<ul className="custom-scrollbar flex h-[400px] flex-1 flex-col items-center overflow-y-scroll py-4 pr-1">
							{getDaysInMonth(time.month).map((day) => (
								<li
									aria-disabled={false}
									className="[&[aria-disabled='true']]:pointer-events-none [&[aria-disabled='true']]:opacity-40"
									key={`${day.value}mins`}
								>
									<a
										onClick={() =>
											setTimer(() => ({
												...time,
												day: day.value,
											}))
										}
										aria-selected={day.value === time.day}
										className="flex cursor-pointer p-1 hover:bg-[#3F5BF6] hover:text-white  [&[aria-selected='true']]:bg-[#3F5BF6] [&[aria-selected='true']]:text-white"
									>
										{day.value < 10
											? `0${day.value}`
											: day.value}
									</a>
								</li>
							))}
						</ul>

						{/* Years */}
						<ul className="custom-scrollbar flex h-[400px] flex-1 flex-col items-center overflow-y-scroll py-4 pr-1">
							{generateYearsArray().map((year) => (
								<li key={`${year.value}mins`}>
									<a
										onClick={() =>
											setTimer(() => ({
												...time,
												year: year.value,
											}))
										}
										aria-selected={year.value === time.year}
										className="flex cursor-pointer p-1 hover:bg-[#3F5BF6] hover:text-white [&[aria-selected='true']]:bg-[#3F5BF6] [&[aria-selected='true']]:text-white"
									>
										{year.value}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : null}
		</>
	);
}
