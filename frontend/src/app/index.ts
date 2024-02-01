import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './providers'
import {initSentry} from './sentry';

initSentry()

export const app = createApp(App).use(createPinia()).use(router) //.use(i18n)
