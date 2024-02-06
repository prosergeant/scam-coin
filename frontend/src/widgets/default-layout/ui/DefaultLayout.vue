<template>
    <div>
        <BlockContent />
        <Loader
            :max-progress="loadedImages.length"
            :curr-progress="curr_progress"
            :condition="!allImagesLoad"
        />
        <Header />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Header } from '@/widgets/header'
import { Loader } from '@/entities/loader'
import { BlockContent } from '@/entities/block-content'
import { storeToRefs } from 'pinia'
import { useLoadedImages } from '@/entities/loaded-images'
import { computed, watch } from 'vue'
import { useCoin } from '@/entities/coin'
import { useUser } from '@/entities/user'
import { useWebsocket } from '@/shared/lib'

const { user } = storeToRefs(useUser())
const { coinsToDelete } = storeToRefs(useWebsocket())
const { createWebsocket } = useWebsocket()
const { num } = storeToRefs(useCoin())
const { allImagesLoad, loadedImages } = storeToRefs(useLoadedImages())
const curr_progress = computed(() => loadedImages.value.filter((el) => el.loaded).length)

watch(
    () => user.value,
    (v) => {
        if (v) createWebsocket(v)
    },
    { deep: true }
)

watch(
    () => coinsToDelete.value,
    (v) => {
        if (v) {
            num.value -= v
            coinsToDelete.value = 0
        }
    }
)
</script>
