import { randomInteger } from '@/shared/lib'
import { useCoin } from '../model'
import { useUser } from '../../user/model'
import anime from 'animejs'

export const clickCoin = () => {
    const coinStore = useCoin()
    const userStore = useUser()
    coinStore.clicked = true

    setTimeout(() => {
        coinStore.clicked = false
        let temp = coinStore.coins
        if (randomInteger(0, 1000) < userStore.user.crit_chance) {
            temp += userStore.user.crit_bonus
        } else {
            temp++
        }
        setCount(temp)
    }, 100)
}

const setCount = (val: number) => {
    const coinStore = useCoin()
    const obj = { n: coinStore.coins }
    anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 100,
        easing: 'linear',
        update: () => {
            coinStore.coins = obj.n
        }
    })
}
