import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCoin = defineStore('coin', () => {
    const clicked = ref(false)
    const coins = ref(0)
    const num = ref(0)

    return {
        clicked,
        coins,
        num
    }
})
