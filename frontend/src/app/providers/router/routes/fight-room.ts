export const route = {
	name: 'FightRoom',
	path: '/fight-room',
	component: () => import('@/pages/fight-room'),
	meta: {
		title: {
			ru: 'Битва'
		},
		hiddenFromMenu: true
	}
}
