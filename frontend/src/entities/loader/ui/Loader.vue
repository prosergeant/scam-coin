<template>
    <teleport
        to="body"
        v-if="condition"
    >
        <div
            class="loader-wrapper"
            :class="{ 'loader-wrapper-blur': blurBackground }"
        >
            <progress
                :max="maxProgress"
                :value="currProgress"
            >
                {{ currProgress }}
            </progress>
        </div>
    </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
    condition: boolean
    currProgress: number
    maxProgress: number
    blurBackground?: boolean
}>()
</script>

<style scoped lang="scss">
.loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, rgba(62, 60, 85, 1) 0%, rgba(120, 120, 124, 1) 100%);
    //backdrop-filter: blur(50px);
    color: white;
    font-size: 24px;
    font-weight: 600;
    font-style: italic;

    &-blur {
        background: none;
        backdrop-filter: blur(5px);
    }
}

progress[value] {
    display: block;
    width: 80%;
    min-height: 4rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 8px;
    box-shadow: inset 4px 4px 4px rgba(84, 30, 8, 0.2);
    background-color: rgba(149, 250, 61, 0.1);
    border: 1px solid #ccc;
    animation: colorrush 4s infinite linear;
}
progress[value]::-webkit-progress-inner-element {
    border-radius: 8px;
    overflow: hidden;
    background-position: inherit;
}
progress[value]::-webkit-progress-bar {
    border-radius: 8px;
    background-color: transparent;
    background-position: inherit;
}
progress[value]::-webkit-progress-value {
    border-radius: 10px 0 0 10px / 10px 0 0 10px;
    box-shadow: inset 2px 2px 2px rgba(90, 90, 92, 0.2);
    background: repeating-linear-gradient(45deg, transparent 0 6px, rgba(0, 0, 0, 0.1) 6px 12px), linear-gradient(#4a54ba, #888ccf, #b8b9cc);
    background-size:
        calc(12px / 0.707) 100%,
        /* 0.707 = cos(45deg)*/ 100% 800%;
    background-position: inherit;
}
progress[value]::-moz-progress-bar {
    border-radius: 10px 0 0 10px / 10px 0 0 10px;
    box-shadow: inset 2px 2px 2px rgba(90, 90, 92, 0.2);
    background: repeating-linear-gradient(45deg, transparent 0 6px, rgba(0, 0, 0, 0.1) 6px 12px), linear-gradient(#4a54ba, #888ccf, #b8b9cc);
    background-size:
        calc(12px / 0.707) 100%,
        /* 0.707 = cos(45deg)*/ 100% 800%;
    background-position: inherit;
}
@keyframes colorrush {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: calc(10 * (12px / 0.707)) 100%;
    }
}
</style>
