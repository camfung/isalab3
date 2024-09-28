function getDate() {
	const currentDate = new Date();

	// Format the date as: YYYY-MM-DD
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');

	// Get hours, minutes, seconds for time in 12-hour format
	let hours = currentDate.getHours();
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	const seconds = String(currentDate.getSeconds()).padStart(2, '0');

	// Determine AM or PM
	const ampm = hours >= 12 ? 'PM' : 'AM';

	// Convert 24-hour time to 12-hour format
	hours = hours % 12 || 12; // Convert 0 to 12 for midnight hour

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}
module.exports = { getDate }
