export const route = {
	name: 'Test',
	path: '/test',
	component: () => import('@/pages/test'),
	meta: {
		title: {
			ru: 'Тест'
		},
		hiddenFromMenu: false
	}
}
