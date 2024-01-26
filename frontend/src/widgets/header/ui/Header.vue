<template>
    <div class="header">
        <InfoBtn :text='text' left />
    </div>
</template>

<script setup lang="ts">
import { InfoBtn } from '@/features'
import { storeToRefs } from 'pinia';
import { useUser } from '@/entities/user/model';
import { computed } from 'vue';

const {user} = storeToRefs(useUser())
const text = computed(() =>
	`crit chance: ${user.value.crit_chance/10}%\n` +
	`crit bonus: ${user.value.crit_bonus}`
)
</script>

<style scoped lang="scss">
.header {
    p {
        color: white;
    }

	padding: 10px 0 0 20px;
}
</style>
