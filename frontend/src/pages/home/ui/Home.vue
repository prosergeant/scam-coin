<template>
    <div class="main">
        <h3>Coins: {{ coins }}</h3>
<!--        <p>userid: {{ tg_userData?.id }}</p>-->
<!--        <p>username: {{ tg_userData?.username }}</p>-->
        <div style="height: 50px" />
        <div class="background-container">
            <img
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
import { onMounted, ref } from 'vue'
import { http } from '@/shared/api'

onMounted( () => {
    const telegramApi = document.createElement('script')
    telegramApi.setAttribute('src', 'https://telegram.org/js/telegram-web-app.js')
    telegramApi.defer = true
    telegramApi.onload = async () => {
        const tg = window.Telegram.WebApp
        tg?.expand()

        tg_userData.value = tg?.initDataUnsafe?.user

		const user_data: typeof user.value[] = (await http.get('/users/')).data
		const curr_user = user_data.find(el => el.username === tg_userData.value.username)
		let new_user_id = 0
		console.log(curr_user);
		if(!curr_user) {
			const res_new_user: typeof user.value = (await http.post('/users/', {
				username: tg_userData.value.username,
				userid: tg_userData.value.id,
				coins: 0
			})).data

			new_user_id = res_new_user?.id
		}

		user.value.id = curr_user?.id || new_user_id || 0
		user.value.coins = coins.value = curr_user?.coins
    }
    document.head.appendChild(telegramApi)
})

const coins = ref(0)
const user = ref({
    username: '',
    userid: '',
    coins: 0,
	id: 0
})
const clicked = ref(false)
const tg_userData = ref({
    id: 0,
    isBot: false,
    first_name: '',
    last_name: '',
    username: 'test_user',
    language_code: ''
})
const clickCoin = () => {
    clicked.value = true

    setTimeout(() => {
        clicked.value = false
        coins.value++
    }, 100)
}

setInterval(() => {
	if(coins.value !== user.value.coins) {
		http.patch(`/users/${user.value.id}/`, {
			coins: coins.value
		})
			.then(() => {
				user.value.coins = coins.value
			})
	}
}, 5000)

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
