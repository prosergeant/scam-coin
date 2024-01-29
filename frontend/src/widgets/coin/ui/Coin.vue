<template>
    <div class="main">
        <h3 class="coins-count">Coins: {{ coins }}</h3>
        <div style="height: 50px" />
        <div class="background-container">
            <img
                @load="setImageIsLoad('/coin.png')"
                src="/coin.png"
                class="coin"
                :class="{ clicked: clicked }"
                alt="coin"
                @click="clickCoin"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUser } from '@/entities/user'
import { useCoin } from '@/entities/coin'
import { updateOrCreateUser } from '@/entities/user'
import { clickCoin, setCount } from '@/entities/coin'
import { editUser } from '@/entities/user'
import { setImageIsLoad, setImageForLoad } from '@/entities/loaded-images'

onMounted(() => {
    setImageForLoad('/coin.png')

    const telegramApi = document.createElement('script')
    telegramApi.setAttribute('src', 'https://telegram.org/js/telegram-web-app.js')
    telegramApi.defer = true
    telegramApi.onload = async () => {
        const tg = window.Telegram.WebApp
        tg?.expand()

        tg_userData.value = tg?.initDataUnsafe?.user
        await updateOrCreateUser(tg_userData)
    }
    document.head.appendChild(telegramApi)
})

const { user } = storeToRefs(useUser())
const { coins, clicked, num } = storeToRefs(useCoin())

const tg_userData = ref({
    id: 0,
    isBot: false,
    first_name: '',
    last_name: '',
    username: 'test_user',
    language_code: ''
})

setInterval(() => {
    if (coins.value !== user.value.coins) {
        editUser(user.value.id, coins.value).then(() => {
            user.value.coins = coins.value
        })
    }
}, 5000)

watch(() => num.value, setCount)
</script>

<style scoped lang="scss">
.main {
    user-select: none;
    background-color: black;

    width: 100%;
    max-width: 580px;
    height: calc(95dvh - 100px);

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
    width: 50%; /* Ширина монеты относительно родительского контейнера */
    border-radius: 50%; /* Для создания круглой формы */
    transition: ease all 100ms;
    filter: drop-shadow(2px 4px 6px black);

    &.clicked {
        transform: translate(-50%, -50%) scale(1.2);
    }
}
</style>
