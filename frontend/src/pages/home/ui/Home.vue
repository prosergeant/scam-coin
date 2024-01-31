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

const { user } = storeToRefs(useUser())
const { createWebsocket } = useWebsocket()

watch(
    () => user.value,
    (v) => {
        if (v) createWebsocket(v)
    }, {deep: true}
)
</script>

<style scoped lang="scss"></style>
