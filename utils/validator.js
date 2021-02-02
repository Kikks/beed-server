const isEmpty = string => {
	if (string.trim("") === "") return true
	else return false
}

exports.validateAuction = (title, start, end, image) => {
	const errors = {}

	if (isEmpty(title)) errors.title = "Title must not be empty"
	if (isEmpty(start)) errors.start = "Start Time must not be empty"
	else if (new Date(start).getTime() < new Date().getTime())
		errors.start = "Start date for the auction cannot be in the past!"
	if (isEmpty(end)) errors.end = "End Time must not be empty"
	else if (new Date(end).getTime() < new Date(start).getTime())
		errors.end = "End date for the auction cannot be before the Start date!"
	if (isEmpty(image)) errors.image = "Image must be supplied"

	return {
		errors,
		valid: Object.keys(errors) < 1
	}
}
