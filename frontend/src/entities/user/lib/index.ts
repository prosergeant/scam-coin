import type { ITGUser, IUser } from '../model/types'
import type { Ref } from 'vue'
import { createUser, fetchUsers } from '../api'
import { useUser } from '../model'
import { useCoin } from '../../coin/model'

export const updateOrCreateUser = async (tg_userData: Ref<ITGUser>) => {
    const store = useUser()
    const coinStore = useCoin()

    const user_data: IUser[] = await fetchUsers()
    const curr_user: IUser = user_data.find((el) => el.username === tg_userData.value.username)
    let new_user_id = 0

    if (!curr_user) {
        const res_new_user: IUser = await createUser(tg_userData.value)
        new_user_id = res_new_user?.id
    }

    store.user.id = curr_user?.id || new_user_id || 0
    store.user.coins = coinStore.num = coinStore.coins = curr_user?.coins || 0
    store.user.crit_chance = curr_user?.crit_chance || 25
    store.user.crit_bonus = curr_user?.crit_bonus || 10
}
