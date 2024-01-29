<template>
    <div class="menu">
        <p
            class="dots"
            @click="popover = !popover"
        >
            ...
        </p>
        <div
            class="menu-popover"
            v-if="popover"
        >
            <router-link
                v-for="route in routes"
                :key="route.name"
                :to="route.path"
            >
                {{ route.meta.title.ru }}
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { routes } from '@/app/providers/router/routes'

const popover = ref(false)
</script>

<style scoped lang="scss">
.menu {
    p,
    a {
        color: white;
        border-radius: 4px;
        text-decoration: none;
        background: transparent;
    }
    //a {
    //    background: transparent;
    //}

    .dots {
        height: 32px;
        user-select: none;
    }

    border: 1px solid white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .menu-popover {
        position: absolute;
        border: 1px solid white;
        border-radius: 4px;
        top: 30px;
        right: -6px;
        width: 120px;
        padding: 6px 8px;

        display: flex;
        flex-direction: column;
        gap: 4px;
        background: black;

        &::after {
            position: absolute;
            content: '';

            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid white;

            top: -6px;
            right: 12px;
        }
    }
}
</style>
