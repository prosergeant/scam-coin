import type { ITGUser, IUser } from '../model/types'
import type {Ref} from 'vue'
import { createUser, fetchUsers } from '../api'
import { useUser } from '../model'

export const updateOrCreateUser = async (tg_userData: Ref<ITGUser>, coins: Ref<number>) => {
    const store = useUser()

    const user_data: IUser[] = await fetchUsers()
    const curr_user: IUser = user_data.find((el) => el.username === tg_userData.value.username)
    let new_user_id = 0

    if (!curr_user) {
        const res_new_user: IUser = await createUser(tg_userData.value.username, tg_userData.value.id.toString())
        new_user_id = res_new_user?.id
    }

    console.log('updateOrCreateUser.curr_user', curr_user);

    store.user.id = curr_user?.id || new_user_id || 0
    store.user.coins = coins.value = curr_user?.coins || 0
}
