const https = require('https')

const parseJson = (string) => {
	try {
		return JSON.parse(string)
	} catch (e) {
		return {
			error: JSON.stringify(e)
		}
	}
}

const httpsGetData = (url, params) => {
	const options = {
		host: 'bronkz.app',
		port: 443,
		path: `/api${url}`,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}

	if(params?.query)
		options.path += params.query


	let data = ''

	return new Promise((resolve, reject) => {
		try {
			https.get(options, (res) => {
				res.setEncoding('utf-8')
				res.on('data', (chunk) => { data += chunk })
				res.on('end', () => { resolve(JSON.parse(data)) })
			})
		} catch (e) {
			console.log('httpsGetData error', e);
			reject()
		}
	})
}

module.exports = { parseJson, httpsGetData }
