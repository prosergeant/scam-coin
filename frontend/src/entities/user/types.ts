export interface IUser {
    first_name: string
    username: string
    userid: string
    coins: number
    id: number
    crit_chance: number
    crit_bonus: number
    damage: number
}

export interface ITGUser {
    id: number
    isBot: boolean
    first_name: string
    last_name: string
    username: string
    language_code: string
}
