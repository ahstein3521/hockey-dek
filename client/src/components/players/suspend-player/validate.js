
export default function(values) {
	let errors = {};

	for (let name in values) {
		if (!values[name]) {
			errors[name] = 'This field must be filled out.';
		}
	}

	if (values.start >= values.end) {
		errors.start = 'This date must be at least one day earlier than the end date.';
	}

	return errors;
}