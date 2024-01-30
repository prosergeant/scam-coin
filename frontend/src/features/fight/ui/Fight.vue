<template>
    <div @click="startLoad()">
        <Loader
            :condition="isLoading"
            :max-progress="100"
            :curr-progress="currProgress"
            blur-background
        />
        <img
            :src="fightImage"
            alt="my-coins"
            class="img-btn invert p-12"
            @load="setImageIsLoad(fightImage)"
        />
    </div>
</template>

<script setup lang="ts">
import { setImageIsLoad, setImageForLoad } from '@/entities/loaded-images'
import { Loader } from '@/entities/loader'
import { onMounted, ref } from 'vue'
import { getOnlineUsers } from '@/entities/fight'
import { storeToRefs } from 'pinia'
import { useUser } from '@/entities/user'

const { user } = storeToRefs(useUser())

onMounted(async () => {
    setImageForLoad(fightImage)
})

const fightImage = '/fight.png'

const isLoading = ref(false)
const currProgress = ref(0)

const startLoad = async () => {
    try {
        isLoading.value = true
        await getOnlineUsers(user.value.id, currProgress)
        currProgress.value = 0
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped lang="scss"></style>
