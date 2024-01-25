<template>
    <div class="main">
        <h3>Coins: {{ coins }}</h3>
        <img
            src="/coin.png"
            alt=""
						@click='coins++'
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const coins = ref(0)
</script>

<style scoped lang="scss">
.main {
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
    width: 240px;
    height: 240px;
}
</style>
