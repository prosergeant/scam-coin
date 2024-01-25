export declare global {
	interface Window {Telegram: {
			WebApp: {
				expand: Function
			}
		}
	}
}

window.Telegram = window.Telegram || {}
