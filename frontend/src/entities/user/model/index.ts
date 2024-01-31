import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IUser } from '../types'

export const useUser = defineStore('user', () => {
    const user = ref<IUser>({
        crit_bonus: 2,
        crit_chance: 50,
        damage: 100,
        id: 0,
        coins: 0,
        userid: '',
        username: '',
        first_name: ''
    })

    return {
        user
    }
})
