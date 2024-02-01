import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IUser } from '@/entities/user'

export const useWebsocket = defineStore('websocket', () => {
    const webSocket = ref<null | WebSocket>(null)
    const coinsToDelete = ref(0)

    const createWebsocket = (user: IUser) => {
        if (webSocket.value) return

        webSocket.value = new WebSocket(import.meta.env.VITE_WS_URL)
        webSocket.value.onopen = (e) => {
            webSocket.value.send(
                JSON.stringify({
                    event: 'login',
                    payload: {
                        id: user.id,
                        username: user.username
                    }
                })
            )

            setInterval(() => {
                sendPing()
            }, 2000)
        }

        webSocket.value.addEventListener('message', (msg) => {
            const json = JSON.parse(msg.data)

            switch (json.event) {
                case 'set-money':
                    coinsToDelete.value = json.payload.coins
                    break
                default:
                    break
            }
        })
    }

    const sendPing = () => {
        if (webSocket.value) webSocket.value.send(JSON.stringify({ event: 'ping' }))
    }

    return {
        webSocket,
        coinsToDelete,
        createWebsocket
    }
})
