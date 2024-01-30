import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebsocket = defineStore('websocket', () => {
    const webSocket = ref<null | WebSocket>(null)

    const createWebsocket = (user_id: number) => {
        if (webSocket.value) return

        webSocket.value = new WebSocket(import.meta.env.VITE_WS_URL)
        webSocket.value.onopen = (e) => {
            console.log('open popen')
            webSocket.value.send(
                JSON.stringify({
                    event: 'login',
                    payload: {
                        id: user_id
                    }
                })
            )
        }
    }

    return {
        webSocket,
        createWebsocket
    }
})
