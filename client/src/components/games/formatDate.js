const months = [
	'January',
	'Febuary',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'November',
	'December'
];

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export default function formatDate(d) {
	const year = d.getFullYear();
	const monthIndex = d.getMonth();
	const day = d.getDate();
	const dayOfWeek = days[d.getDay()];

	return `${dayOfWeek}, ${months[monthIndex]} ${day}, ${year}`;
}

