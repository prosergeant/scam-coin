export declare global {
    interface Window {
        Telegram: {
            WebApp: {
                expand: Function
                initDataUnsafe: {
                    user: {
                        id: number
                        isBot: boolean
                        first_name: string
                        last_name: string
                        username: string
                        language_code: string
                    }
                }
            }
        }
    }
}

window.Telegram = window.Telegram || {}
