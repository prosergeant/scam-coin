import { randomInteger } from '@/shared/lib'
import { useCoin } from '../model'
import { useUser } from '../../user'
import anime from 'animejs'

export const clickCoin = () => {
    const coinStore = useCoin()
    const userStore = useUser()
    coinStore.clicked = true

    if (randomInteger(0, 1000) < userStore.user.crit_chance) {
        coinStore.num += userStore.user.crit_bonus * userStore.user.damage
    } else {
        coinStore.num += userStore.user.damage
    }

    setTimeout(() => {
        coinStore.clicked = false
    }, 100)
}

export const setCount = (val: number) => {
    const coinStore = useCoin()
    const obj = { n: coinStore.coins }
    anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 400,
        easing: 'linear',
        update: () => {
            coinStore.coins = obj.n
        }
    })
}
