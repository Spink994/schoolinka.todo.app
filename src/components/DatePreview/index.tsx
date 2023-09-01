import { daysInThreeLetters, generateDate } from '@/utils/calendar';
import dayjs from 'dayjs';

export default function DatePreview() {
	const { arrayOfCurrentDates } = generateDate(
		dayjs().month(),
		dayjs().year()
	);

	return (
		<div className="flex w-full gap-4 overflow-x-scroll pb-3 custom-scrollbar">
			{/* arrayOfCurrentDate returns all the dates in the current month, so in order to only show the date
            from today to eleven(11) days ahead i am slicing from today to 11 days ahead */}
			{arrayOfCurrentDates
				.slice(dayjs().date() - 1)
				.map(({ date, today }, index) => {
					return (
						<div
							key={index}
							aria-current={today}
							className="flex h-[68px] min-w-[62px] flex-col items-center justify-center gap-2 rounded-lg border border-gray-300 shadow-sm hover:bg-[#3F5BF6]/70 hover:text-white [&[aria-current='true']]:bg-[#3F5BF6] [&[aria-current='true']]:text-white"
						>
							<span className="text-sm font-semibold">
								{daysInThreeLetters[date.day()]}
							</span>
							<span className="text-sm font-semibold">
								{date.date()}
							</span>
						</div>
					);
				})}
		</div>
	);
}
