<template>
	<teleport to='body' v-if='!allImagesLoad'>
		<div class='loader-wrapper'>
			<div>Loading ...</div>
		</div>
	</teleport>
</template>

<script setup lang='ts'>

import { storeToRefs } from 'pinia';
import { useLoadedImages } from '@/entities/loaded-images';

const {allImagesLoad} = storeToRefs(useLoadedImages())
</script>

<style scoped lang='scss'>
.loader-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(90deg, rgba(62,60,85,1) 0%, rgba(120,120,124,1) 100%);
	//backdrop-filter: blur(50px);
	color: white;
	font-size: 24px;
	font-weight: 600;
	font-style: italic;
}
</style>
