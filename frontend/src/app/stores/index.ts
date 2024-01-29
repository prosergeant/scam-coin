import { defineStore } from 'pinia'
import { useResizeObserver } from '@/shared/lib'

export const useAppStore = defineStore('app', () => {
    const { screenWidth } = useResizeObserver(document.body)

    return {
        screenWidth
    }
})
