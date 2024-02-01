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
        <Modal
            title=""
            :is-show="enemyModal"
            @close="enemyModal = false"
        >
            <div class="flex d-column j-center g-12 w-100">
                <p>Твой противник: {{ enemy.username }}</p>
                <DefaultButton @click="router.push('/fight-room/')">Attack</DefaultButton>
                <DefaultButton @click="enemyModal = false">Cancel</DefaultButton>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { setImageIsLoad, setImageForLoad } from '@/entities/loaded-images'
import { Loader } from '@/entities/loader'
import { onMounted, ref } from 'vue'
import { getUsersForFight, useFight } from '@/entities/fight'
import { storeToRefs } from 'pinia'
import { useUser } from '@/entities/user'
import { Modal } from '@/entities/modal'
import { DefaultButton } from '@/features'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = storeToRefs(useUser())
const { enemy } = storeToRefs(useFight())

onMounted(async () => {
    setImageForLoad(fightImage)
})

const fightImage = '/fight.png'

const isLoading = ref(false)
const currProgress = ref(0)
const enemyModal = ref(false)

const startLoad = async () => {
    try {
        isLoading.value = true
        enemy.value = await getUsersForFight(user.value.id, currProgress)
        currProgress.value = 0
        enemyModal.value = true
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped lang="scss"></style>
