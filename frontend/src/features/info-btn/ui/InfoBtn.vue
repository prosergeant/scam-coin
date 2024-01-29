<template>
    <div class="info-wrapper">
        <div
            class="info"
            @click="popover = !popover"
        >
            <p>i</p>
            <div
                class="popover"
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
            top: calc(100% + 8px);
            left: -6px;
            width: 200px;
            border: 1px solid white;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            gap: 0;
            background: black;
            padding: 0 4px;

            white-space: pre;

            p {
                font-size: 16px;
            }

            &::after {
                position: absolute;
                content: '';

                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid white;

                top: -6px;
                left: 10px;
            }
        }
    }
}
</style>
