const CamsExpress = require("./modules/CamsExpress")
const date = require("./modules/utils.js")
const strings = require("./lang/en/en.js")

const server = new CamsExpress.CamsExpress()

server.get("/getDate", (req, res) => {
	const name = req.queryParams.name;
	message = strings.strings.message.replace("%1", name)
	res.setHeader('Content-Type', 'text/html');
	res.end("<p style='color: blue;'>" + message + " " + date.getDate() + "</p>")
})
server.listen(3000, () => {
	console.log("server listening on port 3000")
})
