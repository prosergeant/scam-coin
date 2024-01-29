import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type TImage = {
    src: string
    loaded: boolean
}

export const useLoadedImages = defineStore('images', () => {
    const loadedImages = ref<TImage[]>([])
    const allImagesLoad = computed(() => loadedImages.value.every((image) => image.loaded))

    return {
        loadedImages,
        allImagesLoad
    }
})
