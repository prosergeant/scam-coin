<template>
    <div class="header">
        <InfoBtn
            :text="text"
            left
        />
        <Menu />
    </div>
</template>

<script setup lang="ts">
import { InfoBtn, Menu } from '@/features'
import { storeToRefs } from 'pinia'
import { useUser } from '@/entities/user'
import { computed } from 'vue'

const { user } = storeToRefs(useUser())
const text = computed(() => `crit chance: ${user.value.crit_chance / 10}%\n` + `crit bonus: ${user.value.crit_bonus}`)
</script>

<style scoped lang="scss">
.header {
    p {
        color: white;
    }

    padding: 10px 20px 0 20px;
    height: 35px;
    display: flex;
    justify-content: space-between;
}
</style>
