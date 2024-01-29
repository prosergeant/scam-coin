import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TMoney } from './types'

export * from './types'

export const useMyCoins = defineStore('coins', () => {
    const myCoins = ref<TMoney>({
        plastic: {
            title: 'Пластмассовые',
            count: 1
        },
        wood: {
            title: 'Деревянные',
            count: 2
        },
        tin: {
            title: 'Оловянные',
            count: 0
        },
        cooper: {
            title: 'Медные',
            count: 0
        },
        bronze: {
            title: 'Бронзовые',
            count: 0
        },
        silver: {
            title: 'Серебряные',
            count: 0
        },
        gold: {
            title: 'Золотые',
            count: 0
        },
        platinum: {
            title: 'Платиновые',
            count: 0
        },
        diamond: {
            title: 'Алмазные',
            count: 0
        },
        giga: {
            title: 'Гигачадные',
            count: 0
        }
    })

    return {
        myCoins
    }
})
