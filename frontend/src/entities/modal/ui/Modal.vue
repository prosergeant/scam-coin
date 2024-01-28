<template>
	<teleport to='body'>
		<div v-if='isShow' class='modal-wrapper w-100' @click.self="emit('close', true)">
			<div class='modal w-100 h-100'>
				<div class='modal-inner w-100 h-100'>
					<div class='header flex s-between'>
						<div class='left'>
							{{ title }}
						</div>
						<div class='right' @click="emit('close', true)">
							X
						</div>
					</div>
					<div class='body flex'>
						<slot />
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup lang='ts'>

const props = defineProps<{
	title: string
	isShow: boolean
}>()

const emit = defineEmits<{
	(e: 'close', value: boolean): void
}>()
</script>

<style scoped lang='scss'>
.modal-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	height: 100dvh;
	padding: 48px;
	backdrop-filter: blur(5px);

	.modal {
		//border: 1px solid rgba(0, 183, 255, 0.6);
		border-radius: 4px;
		padding: 10px;

		.modal-inner {
			background: white;
			border-radius: 4px;
			overflow: hidden;

			.header {
				padding: 4px 10px;
				height: 40px;
				font-size: 24px;
				font-weight: 700;
				user-select: none;

				//background: #6422EB;
				//background: rgb(62,60,85);
				background: linear-gradient(90deg, rgba(62,60,85,1) 0%, rgba(120,120,124,1) 100%);

				.left {
					color: white;
				}
			}

			.body {
				padding: 12px;
				//background: #BA87F9;
				//background: rgb(62,60,85);
				background: linear-gradient(90deg, rgba(62,60,85,1) 0%, rgba(120,120,124,1) 100%);
				height: calc(100% - 40px);
				color: white;
			}
		}
	}
}

//.test {
//	background: #6422EB;
//	background: #BA87F9;
//	background: #CB9AFB;
//}
</style>
