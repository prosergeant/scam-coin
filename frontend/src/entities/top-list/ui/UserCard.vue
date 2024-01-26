<template>
    <div class="user-card">
        <p>{{ username }}</p>
        <p>{{ coins }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    username: string
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
