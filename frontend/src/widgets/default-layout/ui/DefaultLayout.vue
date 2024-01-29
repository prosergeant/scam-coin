<template>
    <div>
        <BlockContent />
        <Loader />
        <Header />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { Header } from '@/widgets/header'
import { Loader } from '@/entities/loader'
import { BlockContent } from '@/entities/block-content'
</script>
