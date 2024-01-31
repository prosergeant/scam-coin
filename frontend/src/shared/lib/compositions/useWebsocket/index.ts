import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebsocket = defineStore('websocket', () => {
    const webSocket = ref<null | WebSocket>(null)

    const createWebsocket = (user_id: number) => {
        if (webSocket.value) return

        webSocket.value = new WebSocket(import.meta.env.VITE_WS_URL)
        webSocket.value.onopen = (e) => {
            webSocket.value.send(
                JSON.stringify({
                    event: 'login',
                    payload: {
                        id: user_id
                    }
                })
            )

            setInterval(() => {
                sendPing()
            }, 2000)
        }
    }

    const sendPing = () => {
        if(webSocket.value)
            webSocket.value.send(JSON.stringify({ event: 'ping' }))
    }

    return {
        webSocket,
        createWebsocket
    }
})
