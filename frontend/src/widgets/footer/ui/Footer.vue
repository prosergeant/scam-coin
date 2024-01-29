<template>
    <div class="footer">
        <MoneyBoost />
    </div>
</template>

<script setup lang="ts">
import { MoneyBoost } from '@/features'
</script>

<style scoped lang="scss">
.footer {
    width: 100%;
    height: 100px;
    padding: 0 20px;

    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
