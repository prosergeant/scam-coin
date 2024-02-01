export type TJsonError = {
	error: string
}

export const parseJson = <T>(data: string): T | TJsonError => {
	try {
		return JSON.parse(data)
	} catch (e) {
		return {
			error: JSON.stringify(e)
		}
	}
}
