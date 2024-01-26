export const route = {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/home'),
    meta: {
        title: {
            ru: 'Домой'
        }
    }
}
