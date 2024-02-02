<template>
    <div class="wrapper d-column j-center a-center">
        <!--		<p>neededNumber: {{neededNumber}}</p>-->
        <div class="fight-widget flex j-center a-center f-wrap g-8">
            <div
                class="fight-item flex j-center a-center"
                v-for="i in pool"
                @click="choseNumber(i)"
            >
                <template v-if="i === 69">
                    <img
                        alt=""
                        src="/qr_code.png"
                        style="width: 32px; height: 32px"
                    />
                </template>
                <template v-else-if="i > 1 && i < 5">😎</template>
                <template v-else-if="i > 10 && i < 15">🥺</template>
                <template v-else-if="i > 22 && i < 28">$</template>
                <template v-else>
                    {{ i }}
                </template>
            </div>
            <div class="flex a-center w-100 s-between">
                <p>{{ sum }}</p>
                <div class="d-column g-8">
                    <span
                        class="set-money"
                        @click="setSum('plus')"
                        >+</span
                    >
                    <span
                        class="set-money"
                        @click="setSum('minus')"
                        >-</span
                    >
                </div>
            </div>
        </div>
        <Modal
            title=""
            :is-show="isWin === true || isWin === false || preloadImages"
        >
            <div class="d-column w-100 h-100">
                <div class="flex-1-1-auto">
                    <p v-if="isWin">Успешно украдено {{ grabbedMoney }} монет</p>
                    <p v-else>Неудача</p>

                    <div class="flex j-center a-center w-100 h-100">
                        <img
                            alt=""
                            @load="setImageIsLoad(i)"
                            class="chest-anim"
                            :class="{ active: j === currFrame }"
                            v-for="(i, j) in chestAnimUrls"
                            :key="i"
                            :src="i"
                        />
                    </div>
                </div>
                <DefaultButton @click="endFight">ok</DefaultButton>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { randomInteger, delay } from '@/shared/lib'
import { Modal } from '@/entities/modal'
import { DefaultButton } from '@/features'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUser } from '@/entities/user'
import { grabMoney, useFight } from '@/entities/fight'
import { setImageForLoad, setImageIsLoad } from '@/entities/loaded-images'
import { useCoin } from '@/entities/coin'

const router = useRouter()
const { num } = storeToRefs(useCoin())
const { user } = storeToRefs(useUser())
const { setEnemyDefault } = useFight()
const { enemy } = storeToRefs(useFight())

onMounted(async () => {
    if (!enemy.value.id) router.push('/')
    createPool()
    for (const i of chestAnimUrls) setImageForLoad(i)
    preloadImages.value = true
    await delay(0)
    preloadImages.value = false

    if (num.value >= 1000) sum.value = 1000
    else sum.value = num.value
})

const preloadImages = ref(false)
const chestAnimUrls = [
    '/chest_frames/1.png',
    '/chest_frames/2.png',
    '/chest_frames/3.png',
    '/chest_frames/4.png',
    '/chest_frames/5.png',
    '/chest_frames/6.png'
]
const currFrame = ref(0)
const grabbedMoney = ref(0)
const sum = ref(0)

const setSum = (type: string) => {
    if (type === 'plus') {
        if (sum.value + 1000 > num.value) sum.value = num.value
        else sum.value += 1000
    } else {
        if (sum.value <= 1000) sum.value = 0
        else sum.value -= 1000
    }
}

const startAnim = async (speed: number) => {
    for (let i = 0; i < chestAnimUrls.length - 1; i++) {
        await delay(speed)
        currFrame.value++
    }
    // currFrame.value = 0
}

const pool = ref([])
const neededNumber = ref(randomInteger(1, 100))
const closestRight = ref(0)
const closestLeft = ref(0)
const isWin = ref<null | boolean>(null)

const createPool = () => {
    let i = 0
    while (i < 9) {
        const num_to_push = randomInteger(1, 100)
        if (num_to_push === neededNumber.value) continue
        pool.value.push(num_to_push)
        i++
    }

    closestRight.value = Math.min(...pool.value.filter((v) => v > neededNumber.value))
    if (closestRight.value === Infinity) closestRight.value = Math.max(...pool.value)

    closestLeft.value = Math.max(...pool.value.filter((v) => v < neededNumber.value))
    if (closestLeft.value === Infinity) closestLeft.value = Math.min(...pool.value)
}

const choseNumber = async (n: number) => {
    const temp = n === closestLeft.value || n === closestRight.value
    if (temp) {
        startAnim(111)
        const res = await grabMoney(enemy.value.id, user.value.id, sum.value)
        if (res?.status === 'ok') grabbedMoney.value = res.coins
    } else {
        await grabMoney(user.value.id, enemy.value.id, sum.value)
    }
    isWin.value = temp
}

const endFight = async () => {
    isWin.value = null
    setEnemyDefault()
    router.push('/')
}
</script>

<style scoped lang="scss">
p {
    color: white;
}

.set-money {
    background: gray;
    border-radius: 6px;
    width: 24px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.wrapper {
    width: 100%;
    height: calc(100dvh - 35px);

    .fight-widget {
        width: 216px;
        height: 216px;

        .fight-item {
            width: 64px;
            height: 64px;
            border: 1px solid white;
            border-radius: 6px;
            flex-wrap: wrap;
            color: white;
            user-select: none;

            &:active {
                background: linear-gradient(90deg, rgb(202, 210, 21) 0%, rgb(222, 180, 6) 100%);
                color: black;
            }
        }
    }
}

.chest-anim {
    position: absolute;
    visibility: hidden;

    &.active {
        visibility: unset;
    }
}
</style>
