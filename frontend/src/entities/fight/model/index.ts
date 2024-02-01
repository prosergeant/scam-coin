import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFight = defineStore('fight', () => {
	const enemy = ref({
		id: 0,
		username: '',
		isOnline: false
	})

	const defaultValues = ref(JSON.parse(JSON.stringify(enemy.value)))

	const setEnemyDefault = () => {
		enemy.value = JSON.parse(JSON.stringify(defaultValues.value))
	}

	return {
		enemy,
		setEnemyDefault
	}
})
