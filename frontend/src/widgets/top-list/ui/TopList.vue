<template>
    <div class="top-list-wrapper">
        <div class="top-list">
            <p style="text-align: center">Top 100:</p>
            <div style="padding: 10px">
                <UserCard
                    v-for="user in users"
                    :key="user.id"
                    :username="user.username"
                    :first_name="user.first_name"
                    :coins="user.coins"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserCard } from '@/entities/top-list'
import { fetchUsers, type IUser } from '@/entities/user'
import { onMounted, ref } from 'vue'

const users = ref<IUser[]>([])

onMounted(async () => {
    users.value = await fetchUsers({ limit: 100 })
})
</script>

<style scoped lang="scss">
p {
    color: white;
}
.top-list-wrapper {
    width: 100%;
    padding: 10px;

    .top-list {
        padding-top: 4px;
        border: 1px solid white;
        border-radius: 4px;

        & > div {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
}
</style>
