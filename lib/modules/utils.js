const fs = require("fs").promises
// gpt generated
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

const readFileText = async (fileName) => {
	try {
		const fileData = await fs.readFile("/home/camer/Documents/bcitfall2024/ia/labs/isalab3/lib/public/" + fileName, 'utf8')
		return fileData
	} catch (error) {
		throw new error("E1 error reading file" + error.message)
	}

}
async function writeFileText(filePath, content) {
	try {
		await fs.writeFile(filePath, content, { flag: 'a' });
	} catch (err) {
		throw new Error(`Error writing to file: ${err.message}`);
	}
}
module.exports = { getDate, readFileText, writeFileText }
