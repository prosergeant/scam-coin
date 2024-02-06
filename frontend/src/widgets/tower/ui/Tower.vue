<template>
    <div class="d-column j-center a-center w-100 g-20">
        <h3 style="color: white">Coins: {{ coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}</h3>
        <div class="tower2 flex">
            <table>
                <tr v-for="(y, i) in matrix">
                    <td
                        v-for="(x, j) in y"
                        class="block"
                        :class="{ green: x === 0 }"
                        @click="handler(j, i, x)"
                    >
                        <template v-if="typeof x === 'number'">
                            {{ x }}
                        </template>
                        <template v-else>
                            <img
                                :src="x.img"
                                alt=""
                                :style="`filter: hue-rotate(${x.hue}deg)`"
                            />
                        </template>
                    </td>
                </tr>
            </table>
        </div>
        <div
            class="menu w-100 d-column g-8"
            v-if="state === 'pick'"
        >
            <div class="flex w-100 g-8">
                <div
                    class="tower-item d-column a-center py-12"
                    v-for="tower in towers"
                    :key="tower.id"
                    @click="purchase(tower)"
                >
                    <img
                        :src="tower.img"
                        alt=""
                    />
                    <span>{{ tower.name }}</span>
                    <p>damage: {{ tower.damage }}</p>
                    <p>speed: {{ tower.speed }}</p>
                    <p>coast: {{ tower.coast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}</p>
                </div>
            </div>
        </div>
        <div
            class="menu w-100 d-column g-8"
            v-if="state === 'upgrade'"
        >
            <div class="flex w-100 g-8">
                <div
                    class="d-column a-center py-12"
                    @click="purchaseUpgrade"
                >
                    <img
                        :src="selectedTower?.img"
                        alt=""
                        :style="`filter: hue-rotate(${selectedTower?.hue}deg)`"
                    />
                    <span>{{ selectedTower.name }} lvl: {{ selectedTower?.nextUpgrade.lvl }}</span>
                    <p>damage: {{ selectedTower?.nextUpgrade.damage }}</p>
                    <p>speed: {{ selectedTower?.nextUpgrade.speed }}</p>
                    <p>coast: {{ selectedTower?.nextUpgrade.coast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}</p>
                </div>
                <!--				<div class='tower-item d-column a-center py-12' v-for='upgrade in (selectedCell.val as TTower).upgrades.filter(el => el.lvl > (selectedCell.val as TTower).lvl)' :key='upgrade' @click='purchaseUpgrade(upgrade)'>-->
                <!--					<img :src='(selectedCell.val as TTower).img' alt='' :style='`filter: hue-rotate(${upgrade.hue}deg)`' />-->
                <!--					<span>{{(selectedCell.val as TTower).name}} lvl: {{upgrade.lvl}}</span>-->
                <!--					<p>coast: {{upgrade.coast}}</p>-->
                <!--				</div>-->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { setCount, useCoin } from '@/entities/coin'
import { editUser, updateOrCreateUser, useUser } from '@/entities/user'

const { coins, num } = storeToRefs(useCoin())
const { user } = storeToRefs(useUser())
const local_username = ref({ username: localStorage.getItem('local_username') })

type TTowerUpgrade = { lvl: number; damage: number; speed: number; coast: number; hue: number }
type TTower = {
    id: number
    name: string
    img: string
    identifier?: number
    nextUpgrade: TTowerUpgrade
} & TTowerUpgrade
type TState = 'upgrade' | 'pick' | 'default'

onMounted(async () => {
    if (!user.value.id && local_username.value) await updateOrCreateUser(local_username)
})

const matrix = ref<(number | TTower)[][]>([
    [1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1]
])

const towers = ref<TTower[]>([
    {
        id: 1,
        name: 'pupa tower',
        img: '/towers/test-tower.png',
        coast: 10,
        lvl: 1,
        damage: 1,
        speed: 1,
        hue: 0,
        nextUpgrade: {
            coast: 0,
            lvl: 0,
            damage: 0,
            speed: 0,
            hue: 0
        }
    }
])

const state = ref<TState>('default')
const selectedCell = ref<{ x: number; y: number; val: number | TTower }>({
    x: 0,
    y: 0,
    val: 1
})
const selectedTower = computed(() => (typeof selectedCell.value.val === 'object' ? selectedCell.value.val : null))

const handler = (x: number, y: number, val: number | TTower) => {
    selectedCell.value = { x, y, val }
    if (typeof val === 'object') {
        state.value = 'upgrade'
        const tempTower = selectedCell.value.val as TTower
        if (tempTower.nextUpgrade.lvl !== tempTower.lvl + 1) {
            tempTower.nextUpgrade = {
                coast: tempTower.coast * 2,
                lvl: tempTower.lvl + 1,
                damage: tempTower.damage * 1.5,
                speed: tempTower.speed * 1.2,
                hue: 0
            }
        }
    } else
        switch (val) {
            case 0:
                state.value = 'pick'
                break
            default:
                state.value = 'default'
                break
        }

    console.log(`x: ${x}, y: ${y}, val: ${val}`)
}

const purchase = (tower: TTower) => {
    if (coins.value < tower.coast) return

    num.value -= tower.coast
    matrix.value[selectedCell.value.y][selectedCell.value.x] = JSON.parse(JSON.stringify(tower))
    selectedCell.value.val = 1
    state.value = 'default'
}

const purchaseUpgrade = () => {
    if (!selectedTower.value || coins.value < selectedTower.value.nextUpgrade.coast) return

    const cellInMatrix = matrix.value[selectedCell.value.y][selectedCell.value.x]
    if (typeof cellInMatrix !== 'object') return

    num.value -= selectedTower.value.nextUpgrade.coast

    cellInMatrix.coast = selectedTower.value.nextUpgrade.coast
    cellInMatrix.lvl = selectedTower.value.nextUpgrade.lvl
    cellInMatrix.damage = selectedTower.value.nextUpgrade.damage
    cellInMatrix.speed = selectedTower.value.nextUpgrade.speed
    cellInMatrix.hue = selectedTower.value.nextUpgrade.hue

    selectedCell.value.val = 1
    state.value = 'default'
}

const way = ref([
    [6, 6],
    [6, 5],
    [5, 5],
    [4, 5],
    [3, 5],
    [2, 5],
    [1, 5],
    [0, 5],
    [0, 4],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [6, 2],
    [6, 1],
    [5, 1],
    [4, 1],
    [3, 1],
    [2, 1],
    [1, 1],
    [0, 1],
    [0, 0]
])
const matrixTestUser = [
    [1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [
        1,
        0,
        0,
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 80,
            lvl: 4,
            damage: 3.375,
            speed: 1.728,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 160, lvl: 5, damage: 5.0625, speed: 2.0736, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 320,
            lvl: 6,
            damage: 7.59375,
            speed: 2.48832,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 640, lvl: 7, damage: 11.390625, speed: 2.9859839999999997, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 640,
            lvl: 7,
            damage: 11.390625,
            speed: 2.9859839999999997,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 1280, lvl: 8, damage: 17.0859375, speed: 3.5831807999999996, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 163840,
            lvl: 15,
            damage: 291.92926025390625,
            speed: 12.839184645488634,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 327680, lvl: 16, damage: 437.8938903808594, speed: 15.407021574586361, hue: 0 }
        }
    ],
    [1, 1, 1, 1, 1, 1, 1],
    [
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 655360,
            lvl: 17,
            damage: 656.8408355712891,
            speed: 18.48842588950363,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 1310720, lvl: 18, damage: 985.2612533569336, speed: 22.186111067404358, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 1310720,
            lvl: 18,
            damage: 985.2612533569336,
            speed: 22.186111067404358,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 2621440, lvl: 19, damage: 1477.8918800354004, speed: 26.62333328088523, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 2621440,
            lvl: 19,
            damage: 1477.8918800354004,
            speed: 26.62333328088523,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 5242880, lvl: 20, damage: 2216.8378200531006, speed: 31.947999937062274, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 10485760,
            lvl: 21,
            damage: 3325.256730079651,
            speed: 38.33759992447473,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 20971520, lvl: 22, damage: 4987.885095119476, speed: 46.005119909369675, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 20971520,
            lvl: 22,
            damage: 4987.885095119476,
            speed: 46.005119909369675,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 41943040, lvl: 23, damage: 7481.8276426792145, speed: 55.206143891243606, hue: 0 }
        },
        {
            id: 1,
            name: 'pupa tower',
            img: '/towers/test-tower.png',
            coast: 335544320,
            lvl: 26,
            damage: 25251.16829404235,
            speed: 95.39621664406894,
            hue: 0,
            upgrades: [
                { coast: 20, lvl: 2, damage: 5, speed: 2, hue: 89 },
                { coast: 50, lvl: 3, damage: 15, speed: 3, hue: 125 }
            ],
            nextUpgrade: { coast: 671088640, lvl: 27, damage: 37876.75244106352, speed: 114.47545997288273, hue: 0 }
        },
        1
    ]
]

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
.tower2 {
    min-width: 350px;
    width: fit-content;
    //height: 200px;
    background: white;

    .block {
        width: 50px;
        height: 50px;
        border: 1px solid;

        img {
            width: 50px;
            height: 50px;
        }

        &.green {
            background: green;
        }
    }
}

.menu {
    border-radius: 6px;
    background: white;

    img {
        width: 50px;
        height: 50px;
    }
}
</style>
