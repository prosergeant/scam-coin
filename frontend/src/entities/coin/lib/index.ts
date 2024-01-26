import { randomInteger } from '@/shared/lib'
import { useCoin } from '../model'
import { useUser } from '../../user/model'

export const clickCoin = () => {
    const coinStore = useCoin()
    const userStore = useUser()
    coinStore.clicked = true

    setTimeout(() => {
        coinStore.clicked = false
        if (randomInteger(0, 1000) < userStore.user.crit_chance) {
            coinStore.coins += userStore.user.crit_bonus
        } else {
            coinStore.coins++
        }
    }, 100)
}
