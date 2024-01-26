<template>
    <div class="info-wrapper">
        <div
            class="info"
            @click="popover = !popover"
        >
            <p>i</p>
            <div
                class="popover"
                :class="{ left: left }"
                v-if="popover"
            >
                <p>{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    text: string
    left?: boolean
}>()

const popover = ref(false)
</script>

<style scoped lang="scss">
p {
    color: white;
    user-select: none;
    border-radius: 4px;
}

.info-wrapper {
    width: fit-content;
    .info {
        border: 1px solid white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .popover {
            position: absolute;
            top: calc(100% + 12px + 2px);
            width: 200px;
            border: 1px solid white;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            gap: 0;
            background: black;
            z-index: 1;
            padding: 0 4px;

            white-space: pre;

            &.left {
                left: -4px;
                &::after {
                    left: 8px;
                }
            }

            p {
                font-size: 16px;
            }

            &::after {
                position: absolute;
                top: -6px;
                left: calc(50% - 6px);
                z-index: -1;
                content: '';
                width: 12px;
                height: 12px;
                color: white;
                background: white;
                transform: rotate(45deg);
            }
        }
    }
}
</style>
