<template>
    <component :is="layout"> <router-view /> </component>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/widgets/default-layout/'
import { computed } from 'vue'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<style lang="scss">
//@import 'index.css';
</style>
