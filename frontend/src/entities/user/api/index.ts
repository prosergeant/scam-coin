import { http } from '@/shared/api'
import { AxiosRequestConfig } from 'axios'

export const fetchUsers = async (params: AxiosRequestConfig) => (await http.get(`/users/`, { params })).data
export const createUser = async (username: string, userid: string) =>
    (
        await http.post('/users/', {
            username,
            userid,
            coins: 0
        })
    ).data

export const editUser = async (id: number, coins: number) =>
    (
        await http.patch(`/users/${id}/`, {
            coins
        })
    ).data
