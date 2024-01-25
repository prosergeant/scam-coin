<template>
    <div class="main">
        <div class="space" />
        <h3>Coins: {{ coins }}</h3>
        <img
            src="/coin.png"
            alt=""
            @click="clickCoin"
            :class="{ clicked: rotation }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rotation = ref(false)
const clickCoin = () => {
    rotation.value = true
    setTimeout(() => {
        rotation.value = false
        coins.value++
    }, 100)
}

const coins = ref(0)
</script>

<style scoped lang="scss">
h3 {
    font-size: 30px;
    font-weight: 700;
    color: white;
}

.main {
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;

    background: currentColor url('/background.png') no-repeat top;
    background-size: contain;
}

img {
    width: 240px;
    height: 240px;
    position: absolute;
    left: 43.2%;
    top: 42.2%;
    transition: all ease 200ms;
    filter: drop-shadow(2px 4px 6px black);
    border-radius: 50%;

    &.clicked {
        transform: rotate3d(1, 1, 0, 30deg);
    }
}

.space {
    height: 15dvh;
}
</style>
