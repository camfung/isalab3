const CamsExpress = require("./modules/CamsExpress")
const strings = require("./lang/en/en.js")
const utils = require("./modules/utils")
const url = require("url")

const app = new CamsExpress.CamsExpress()

app.get("/readFile/*", async (req, res) => {
	try {
		const parsedUrl = url.parse(req.url);
		let cleanedUrl = parsedUrl.pathname.replace(/\/+$/, '');
		const path = cleanedUrl.split("/")
		const fileName = path[path.length - 1]

		try {
			const fileData = await utils.readFileText(fileName)
			res.send(fileData)
		} catch (error) {
			res.status = 404
			res.setHeader("content-type", "text/html")
			res.end(strings.strings.fileNotFound + fileName)
		}
	} catch (error) {
		res.send(error.message)
	}
})

app.get("/writeFile", (req, res) => {

	try {
		const text = req.queryParams.text;
		utils.writeFileText("/home/camer/Documents/bcitfall2024/ia/labs/isalab3/lib/public/file.txt", text)
		res.send("write successful")
	} catch {
		res.error(500, "Error writing to file")
	}


})
app.listen(3000, () => {
	console.log("server listening on port 3000")
})
