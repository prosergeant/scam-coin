import { http_ws, http } from '@/shared/api'
import { Ref } from 'vue'

export const getOnlineUsers = async (user_id: number, percentage?: Ref<number>) =>
    (
        await http_ws.get(`/online-users/?id=${user_id}`, {
            onDownloadProgress: (progressEvent) => {
                if (typeof percentage.value === 'number') percentage.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
        })
    ).data

export const getUsersForFight = async (user_id, percentage?: Ref<number>) =>
    (
        await http.get(`/get-user-for-fight/?id=${user_id}`, {
            onDownloadProgress: (progressEvent) => {
                if (typeof percentage.value === 'number') percentage.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
        })
    )
