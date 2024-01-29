import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IUser } from '../types'

export const useUser = defineStore('user', () => {
    const user = ref<IUser>({
        crit_bonus: 10,
        crit_chance: 25,
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
