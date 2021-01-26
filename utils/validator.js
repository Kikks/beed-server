const isEmpty = string => {
	if (string.trim("") === "") return true
	else return false
}

exports.validateAuction = (title, start, end, image) => {
	const errors = {}

	if (isEmpty(title)) errors.title = "Title must not be empty"
	if (isEmpty(start)) errors.start = "Start Time must not be empty"
	if (isEmpty(end)) errors.end = "End Time must not be empty"
	if (isEmpty(image)) errors.image = "Image must be supplied"

	return {
		errors,
		valid: Object.keys(errors) < 1
	}
}
