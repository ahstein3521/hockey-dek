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
	'October',
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

export default function formatDate(d, showDayOfWeek = true) {

	if (!(d instanceof Date)){
		d = new Date(d);
	}

	const year = d.getFullYear();
	const monthIndex = d.getMonth();
	const day = d.getDate();
	const dayOfWeek = days[d.getDay()];

	const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

	if (showDayOfWeek) {
		return `${dayOfWeek}, ${formattedDate}`;
	}
	return formattedDate;
}