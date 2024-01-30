import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { TImage } from '../types'

export const useLoadedImages = defineStore('images', () => {
    const loadedImages = ref<TImage[]>([])
    const allImagesLoad = computed(() => loadedImages.value.every((image) => image.loaded))

    return {
        loadedImages,
        allImagesLoad
    }
})
