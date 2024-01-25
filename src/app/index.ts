import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueTelegram from 'vue-tg'
import { router } from './providers'

export const app = createApp(App).use(createPinia()).use(router).use(VueTelegram) //.use(i18n)
