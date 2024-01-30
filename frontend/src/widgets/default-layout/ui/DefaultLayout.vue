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
import { computed } from 'vue'

const { allImagesLoad, loadedImages } = storeToRefs(useLoadedImages())
const curr_progress = computed(() => loadedImages.value.filter((el) => el.loaded).length)
</script>
