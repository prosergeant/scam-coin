<template>
    <teleport
        to="body"
        v-if="isBlock"
    >
        <div class="block-content">
            <div class="disclaimer">
                <p>Log in with phone & telegram</p>
            </div>
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/app/stores'

const { screenWidth } = storeToRefs(useAppStore())

const isBlock = computed(() => screenWidth.value > 580)
</script>

<style scoped lang="scss">
.block-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;

    .disclaimer {
        p {
            color: white;
            font-style: italic;
            font-size: 24px;
            font-weight: 600;
        }
    }
}
</style>
