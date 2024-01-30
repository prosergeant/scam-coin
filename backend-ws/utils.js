const parseJson = (string) => {
	try {
		return JSON.parse(string)
	} catch (e) {
		return {
			error: JSON.stringify(e)
		}
	}
}

module.exports = { parseJson }
