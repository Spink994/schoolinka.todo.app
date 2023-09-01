import { useEffect, useState } from 'react';
import { timeInHours, timeInMinutes } from './timeGenerator';

interface ITimeSettings {
	timeSetter: React.Dispatch<React.SetStateAction<string | null>>;
	isOpen: boolean;
}

/**
 * This is a custom timer function generates a timer that allows the selection of time for a specific task.
 * @param timeSetter - a react setState for getting the value of the time from this component
 * @param isOpen - a boolean value that determines whether the component should be visible or not.
 * @returns - void
 */
export default function TimeSettings({ timeSetter, isOpen }: ITimeSettings) {
	const [time, setTimer] = useState<{ hour: number; minutes: number }>({
		/** Setting the default hour and minutes */
		hour: Number(new Date().toISOString().slice(11, 13)),
		minutes: Number(new Date().toISOString().slice(14, 16)),
	});

	useEffect(() => {
		timeSetter(
			() =>
				/** Just making sure that the generated time is prefixed with zero if the number is less than 10
				 * and also converting the output to a regular time format of - 00:00
				 */
				`${time.hour < 10 ? `0${time.hour}` : time.hour}:${
					time.minutes < 10 ? `0${time.minutes}` : time.minutes
				}`
		);
	}, [time.hour, time.minutes]);

	return (
		<>
			{isOpen ? (
				<div className="custom-scrollbar-variant-two absolute -top-[350%] z-20 flex h-[400px] w-full overflow-hidden  rounded-md border border-gray-100 bg-white p-3 text-sm shadow-lg [@media(min-width:1020px)]:top-[calc(100%+8px)]">
					{/* Hours */}
					<div className="flex max-h-[98%] overflow-hidden w-full items-center">
						<ul className="custom-scrollbar flex h-[400px] flex-1 flex-col items-end overflow-y-scroll py-4 pr-3">
							{timeInHours.map((hour) => (
								<li key={`${hour}hours`}>
									<a
										onClick={() =>
											setTimer(() => ({ ...time, hour }))
										}
										aria-selected={hour === time.hour}
										className="flex cursor-pointer p-1 hover:bg-[#3F5BF6] hover:text-white [&[aria-selected='true']]:bg-[#3F5BF6] [&[aria-selected='true']]:text-white"
									>
										{hour < 10 ? `0${hour}` : hour}
									</a>
								</li>
							))}
						</ul>

						{/* Minutes */}
						<ul className="custom-scrollbar flex h-[400px] flex-1 flex-col items-center overflow-y-scroll py-4 pr-4">
							{timeInMinutes.map((minutes) => (
								<li key={`${minutes}mins`}>
									<a
										onClick={() =>
											setTimer(() => ({
												...time,
												minutes,
											}))
										}
										aria-selected={minutes === time.minutes}
										className="flex cursor-pointer p-1 hover:bg-[#3F5BF6] hover:text-white [&[aria-selected='true']]:bg-[#3F5BF6] [&[aria-selected='true']]:text-white"
									>
										{minutes < 10 ? `0${minutes}` : minutes}
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
