<template>
    <div class="main">
        <h3>Coins: {{ coins }}</h3>
        <p>userid: {{ userData?.id }}</p>
        <p>username: {{ userData?.username }}</p>
        <div style="height: 50px" />
        <div class="background-container">
            <img
                src='/coin.png'
                class="coin"
                :class="{ clicked: clicked }"
                alt="coin"
                @click="clickCoin"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(async () => {
    const telegramApi = document.createElement('script')
    telegramApi.setAttribute('src', 'https://telegram.org/js/telegram-web-app.js')
    telegramApi.defer = true
    telegramApi.onload = () => {
        const tg = window.Telegram.WebApp
        tg?.expand()
        console.log('tg', tg)

        userData.value = tg?.initDataUnsafe?.user
    }
    document.head.appendChild(telegramApi)
})

const clicked = ref(false)
const userData = ref({
    id: 0,
    isBot: false,
    first_name: '',
    last_name: '',
    username: '',
    language_code: ''
})
const clickCoin = () => {
    clicked.value = true

    setTimeout(() => {
        clicked.value = false
        coins.value++
    }, 100)
}

const coins = ref(0)
</script>

<style scoped lang="scss">
.main {
    user-select: none;
    background-color: black;

    width: 100%;
    max-width: 640px;
    height: 100dvh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
    }

    p,
    h3 {
        color: white;
    }
}

.background-container {
    position: relative;
    width: 100%; /* Ширина 100% от родительского контейнера (viewport) */
    height: 0;
    padding-bottom: 100%; /* Высота равна ширине, чтобы создать квадратный контейнер */
    background-image: url('/background.png'); /* Укажите путь к вашему изображению */
    background-repeat: no-repeat;
    background-position: top;
    background-position-y: center;
    background-color: currentColor;
    background-size: cover;
}

.coin {
    position: absolute;
    top: 52.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24%; /* Ширина монеты относительно родительского контейнера */
    border-radius: 50%; /* Для создания круглой формы */
    transition: ease all 100ms;
    filter: drop-shadow(2px 4px 6px black);

    &.clicked {
        transform: translate(-50%, -50%) scale(1.2);
    }
}
</style>
