function getDate() {
	const currentDate = new Date();

	// Format the date as: YYYY-MM-DD
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const day = String(currentDate.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}
module.exports = { getDate }
