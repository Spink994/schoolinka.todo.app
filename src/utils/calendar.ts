import dayjs from 'dayjs';

/**
 * This function is used to generate an array of dates in a specified month and year
 * @param month - the month for which the date is to be generated
 * @param year - the year for which the date is to be generated
 * @returns - arrayOfCurrentDates - which is just the date of the current month without any prefix or suffix,
 *             arrayOfDates - which is the date of the current with prefix and suffix
 */
export const generateDate = (
	month = dayjs().month(),
	year = dayjs().year()
) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
	const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

	const arrayOfDates = [];
	const arrayOfCurrentDates = [];

	/** Here we are looping from the first day of the specified month and specified year till the last day of the
	 * specified month of the specified year */
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfCurrentDates.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}

	/** Because the calendar grid is a 6 by 7 we need to generate a the last few days of the previous month
	 *  so we are looping from 0 till the first day of the current month. So the index of days ranges from 0 - 6
	 *  which makes 7 days in a week, so if the current day of the start of the current month falls on tuesday - we will loop from
	 *  0 - 2 (tuesday which is index of 2, if sunday = 0, monday = 1, tuesday = 2), the result would include 3 days from the
	 *  previous month to the arrayOfDates in order to complete the 6 by 7 grid */
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		const date = firstDateOfMonth.day(i);

		arrayOfDates.push({
			currentMonth: false,
			date,
		});
	}

	/**
	 * This will generate all the dates in the current month and add it to the previous loop which already contains the last few days
	 * of the previous month. The currentMonth being true here is just for styling purposes, if the values do not fall in the current
	 * month we can give a slightly different style to those values, to differentiate it from the values of the current month.
	 */
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDates.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}

	/**
	 * The remaining is calculated from the 6 by 7 grid of the calendar which is a total of 42, and the total number of dates in the current month is subtracted from 42 in order to get the remaining days to complete the 6 by 7 grid.
	 */
	const gridRow = 6;
	const gridColumn = 7;
	const gridSize = gridRow * gridColumn; // 42

	const remainingDays = gridSize - arrayOfDates.length;

	/** Because the calendar grid is a 6 by 7 we need to generate a the first few days of the next month
	 *  so we are looping from the last date of the current month till the value of remaining. the currentMonth being false here is just
	 *  for styling purposes, if the values do not fall in the current month we can give a slightly different style to those values to
	 *  differentiate it from the values of the current month
	 */
	for (
		let i = lastDateOfMonth.date() + 1;
		i <= lastDateOfMonth.date() + remainingDays;
		i++
	) {
		arrayOfDates.push({
			currentMonth: false,
			date: lastDateOfMonth.date(i),
		});
	}

	return { arrayOfDates, arrayOfCurrentDates };
};

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const daysInThreeLetters = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thur',
	'Fri',
	'Sat',
];
