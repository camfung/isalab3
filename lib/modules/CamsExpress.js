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
		const urlData = url.parse(req.url, true);
		const parsedUrl = url.parse(req.url);
		const queryParams = querystring.parse(parsedUrl.query);
		req.queryParams = queryParams;

		try {
			let routeCallback;

			// Exact match route
			if (typeof this.routes[urlData.pathname] !== "undefined") {
				routeCallback = this.routes[urlData.pathname];
			} else {
				// Wildcard match: iterate over routes and check for prefixes
				for (const route in this.routes) {
					const routeData = this.routes[route];
					if (routeData.isWildcard && urlData.pathname.startsWith(route)) {
						routeCallback = routeData;
						break;
					}
				}
			}

			if (!routeCallback) {
				throw "routeNotFound";
			} else {
				// Set response helper
				res.send = (content) => {
					if (typeof content === "string") {
						res.setHeader("Content-type", "text/html");
						res.end(content);
					} else if (typeof content === "object") {
						res.setHeader("Content-type", "application/json");
						res.end(JSON.stringify(content));
					}
				};
				res.error = (statusCode, content) => {
					res.writeHead(statusCode)
					res.send(content)
				}

				// Call the callback
				routeCallback.callback(req, res);
			}
		} catch (error) {
			if (error === "routeNotFound") {
				this.routeNotFound(req, res);
			} else {
				this.serverError(req, res, error);
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
		if (route.endsWith('/*')) {
			const prefix = route.slice(0, -2);
			this.routes[prefix] = { callback: cb, isWildcard: true };
		} else {
			this.routes[route] = { callback: cb, isWildcard: false };
		}
	}

}

module.exports = { CamsExpress }
