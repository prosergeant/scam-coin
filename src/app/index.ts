import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { createVuetify } from 'vuetify'
// import { createHead } from '@unhead/vue'
import App from './App.vue'

// import { THEME } from '@/shared/config'

import { router } from './providers'

export const app = createApp(App).use(createPinia()).use(router) //.use(i18n)
