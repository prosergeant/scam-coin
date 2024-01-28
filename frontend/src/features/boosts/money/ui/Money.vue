<template>
	<div :class='{inactive: inactive}'>
		<img @load='setImageIsLoad("/boosts/money.png")' src='/boosts/money.png' alt='money' @click='(!inactive) && (moneyModal = true)'/>
		<Modal :is-show='moneyModal' @close='moneyModal=false' title='Детали буста'>
			<div class='flex f-column w-100'>
				<div style='flex: 1 1 auto;'>
					<p>crit chance: <span>100%</span></p>
<!--					<p>crit_bonus: <span>1000 coins</span></p>-->
					<p>Время действия: <span>1 min</span></p>
					<p>Стоимость: <span>{{ coast }} монет</span></p>
				</div>
				<div class='flex s-between g-4'>
					<DefaultButton class='w-100' @click='moneyModal = false'>ne ok</DefaultButton>
					<DefaultButton class='w-100' @click='setBonus'>ok</DefaultButton>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script setup lang='ts'>
import {Modal} from '@/entities/modal'
import {DefaultButton} from '@/features';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCoin } from '@/entities/coin';
import { useUser } from '@/entities/user';
import { setImageIsLoad, setImageForLoad } from '@/entities/loaded-images';

onMounted(() => {
	setImageForLoad('/boosts/money.png')
})

const {num} = storeToRefs(useCoin())
const {user} = storeToRefs(useUser())

const moneyModal = ref(false)
const inactive = ref(false)
const coast = ref(1000)

const setBonus = () => {
	if(inactive.value) return
	if(num.value < coast.value) {
		 console.log('ne xvataet babla');
		return
	}

	moneyModal.value = false
	inactive.value = true

	const prev_crit_chance = user.value.crit_chance
	user.value.crit_chance = 1000
	num.value -= coast.value

	setTimeout(() => {
		inactive.value = false
		user.value.crit_chance = prev_crit_chance
	}, 1000 * 60)
}
</script>

<style scoped lang='scss'>

p > span {
	font-size: 18px;
	font-style: italic;
}

img {
	width: 74px;
	height: 74px;
	object-fit: contain;
	border: 1px solid rgba(0, 183, 255, 0.6);
	border-radius: 4px;
	user-select: none;
}

.inactive {
	filter: grayscale(1);
}

</style>
