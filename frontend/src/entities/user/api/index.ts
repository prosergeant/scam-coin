import { http } from '@/shared/api'

export const fetchUsers = async () => (await http.get('/users/')).data
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
