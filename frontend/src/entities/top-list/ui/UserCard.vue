<template>
    <div class="user-card">
        <p>{{ first_name }}</p>
        <p>{{ coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    username?: string
    first_name: string
    coins: number
}>()
</script>

<style scoped lang="scss">
p {
    color: white;
    background: transparent;
}

.user-card {
    padding: 4px 8px;
    display: flex;
    justify-content: space-between;
    border: 1px solid white;
    border-radius: 4px;
}
</style>
