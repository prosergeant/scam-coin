<template>
    <div @click="isShow = true">
        <img
            :src="myCoinsImage"
            alt="my-coins"
            class="img-btn invert"
            @load="setImageIsLoad(myCoinsImage)"
        />
        <Modal
            title="Мои монеты"
            :is-show="isShow"
            @close="isShow = false"
        >
            <div class="flex d-column g-10">
                <p
                    v-for="(coin, key) in myCoins as Record<string, TMoneyDetails>"
                    :key="coin.title"
                    class="flex a-center g-12"
                    @click="selectCoin(key)"
                >
                    {{ coin.title }}: {{ coin.count }} <span>+</span>
                </p>
            </div>
        </Modal>
        <Modal
            :title="myCoins[selectedCoin].title"
            :is-show="isShow2"
            @close="isShow2 = false"
        >
            <div class="flex d-column g-4">
                <p>У вас сейчас - {{ myCoins[selectedCoin].count }} монет этого типа</p>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { Modal } from '@/entities/modal'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMyCoins, type TMoneyDetails } from '@/entities/my-coins'
import { setImageForLoad, setImageIsLoad } from '@/entities/loaded-images'

const { myCoins } = storeToRefs(useMyCoins())
const myCoinsImage = '/my-coins.png'

onMounted(() => {
    setImageForLoad(myCoinsImage)
})

const isShow = ref(false)
const isShow2 = ref(false)
const selectedCoin = ref('plastic')

const selectCoin = (key: string) => {
    selectedCoin.value = key
    isShow2.value = true
}
</script>

<style scoped lang="scss">
span {
    width: 40px;
    height: 20px;
    border: 1px solid #333;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    &:active {
        background: #444;
    }
}
</style>
