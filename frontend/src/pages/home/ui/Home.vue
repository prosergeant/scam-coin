<template>
    <div>
        <Coin />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { Coin } from '@/widgets/coin'
import { Footer } from '@/widgets/footer'
import { useWebsocket } from '@/shared/lib'
import { useUser } from '@/entities/user'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useCoin } from '@/entities/coin';

const { user } = storeToRefs(useUser())
const {num} = storeToRefs(useCoin())
const { createWebsocket } = useWebsocket()
const {coinsToDelete} = storeToRefs(useWebsocket())

watch(
    () => user.value,
    (v) => {
        if (v) createWebsocket(v)
    },
    { deep: true }
)

watch(() => coinsToDelete.value, (v) => {
	if(v) {
		num.value -= v
		coinsToDelete.value = 0
	}
})

</script>

<style scoped lang="scss"></style>
