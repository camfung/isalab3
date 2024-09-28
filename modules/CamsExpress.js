const http = require("http")
const querystring = require('querystring');
const url = require("url")

class CamsExpress {
	constructor() {
		this.routes = {}
		this.server = http.createServer((req, res) => {
			this.routeRequests(req, res);
		})
	}
	routeRequests(req, res) {
		const urlData = url.parse(req.url, true)
		const parsedUrl = url.parse(req.url);

		// Get the query string from the parsed URL
		const queryParams = querystring.parse(parsedUrl.query);
		req.queryParams = queryParams
		try {
			if (typeof (this.routes[urlData.pathname]) !== "function") {
				throw "routeNotFound"
			} else {
				this.routes[urlData.pathname](req, res)
			}
		} catch (error) {
			if (error === "routeNotFound") {
				this.routeNotFound(req, res)
			}
			else {
				this.serverError(req, res, error)
			}

		}
	}
	routeNotFound(req, res) {
		res.statusCode = 404
		res.end(`You lost? No route here! `)

	}
	serverError(req, res, error) {
		console.error(`Error occurred: ${error}`);
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({
			status: 'error',
			message: 'Internal Server Error',
			error: error.message,
		}));
	}
	listen(port, cb) {
		this.server.listen(port);
		cb();

	}
	get(route, cb) {
		this.routes[route] = cb;

	}
}

module.exports = { CamsExpress }
