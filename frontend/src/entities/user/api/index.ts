import { http } from '@/shared/api'
import { AxiosRequestConfig } from 'axios'
import { ITGUser } from '../model/types'

export const fetchUsers = async (params?: AxiosRequestConfig) => (await http.get(`/users/`, { params })).data
export const createUser = async (tg_UserData: ITGUser) =>
    (
        await http.post('/users/', {
            username: tg_UserData.username,
            userid: tg_UserData.id.toString(),
            first_name: tg_UserData.first_name,
            coins: 0
        })
    ).data

export const editUser = async (id: number, coins: number) =>
    (
        await http.patch(`/users/${id}/`, {
            coins
        })
    ).data
