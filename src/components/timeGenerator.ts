const timeInHours = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	21, 22, 23,
];

const timeInMinutes = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
	40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
	59,
];

export function getDaysInMonth(month: number) {
	const year = new Date().getFullYear();

	const daysInMonth = new Date(year, month, 0).getDate();
	const daysArray = [];

	for (let day = 1; day <= daysInMonth; day++) {
		const label = `${day}`;
		const value = day;
		daysArray.push({ label, value });
	}

	return daysArray;
}

export function generateYearsArray() {
	const currentYear = new Date().getFullYear();
	const endYear = currentYear + 50;
	const yearsArray = [];

	for (let year = currentYear; year <= endYear; year++) {
		yearsArray.push({ label: year.toString(), value: year });
	}

	return yearsArray;
}

export { timeInHours, timeInMinutes };
