<template>
    <component :is="layout"> <router-view /> </component>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/widgets/default-layout/'
import { computed, onMounted } from 'vue';

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)

// useHead({
// 	meta: [
// 		{
// 			name: 'viewport',
// 			content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover'
// 		},
// 		{
// 			name: 'theme-color',
// 			content: '010101'
// 		}
// 	]
// })

onMounted(async () => {
	if(window) {
		document.addEventListener('gesturestart', function(e) {
			e.preventDefault();
			//@ts-ignore
			document.body.style.zoom = 1;
		});

		document.addEventListener('gesturechange', function(e) {
			e.preventDefault();
			//@ts-ignore
			document.body.style.zoom = 1;
		});

		document.addEventListener('gestureend', function(e) {
			e.preventDefault();
			//@ts-ignore
			document.body.style.zoom = 1;
		});

		document.ondblclick = function(e) {
			e.preventDefault();
		}
	}
})
</script>

<style lang="scss">
//@import 'index.css';
</style>
