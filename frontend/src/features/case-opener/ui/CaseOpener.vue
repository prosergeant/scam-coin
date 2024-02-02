<template>
    <div>
        <div class="case-wrapper w-100 d-column g-8">
            <div
                class="flex g-8"
                ref="caseRollRef"
            >
                <img
                    v-for="i in pool"
                    :key="i.skin"
                    :src="i.img"
                    alt=""
                />
            </div>
            <DefaultButton @click="anim">go</DefaultButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DefaultButton } from '@/features'
import { delay } from '@/shared/lib'

const caseRollRef = ref()
const offset = ref(0)
const items = ref([
    {
        skin: 'M4A1-S | Cyrex',
        img: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_cyrex_light_large.144b4053eb73b4a47f8128ebb0e808d8e28f5b9c.png'
    },
    {
        skin: "M4A1-S | Chantico's Fire",
        img: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygED6_UZrMTzwJYSdJlU8N1zY81TrxO_v0MW9uJnBm3Rk7nEk5XfUmEeyhQYMMLIUhCYx0A'
    },
    {
        skin: 'M4A4 | Asiimov',
        img: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4_asimov_light_large.af03179f3d43ff55b0c3d114c537eac77abdb6cf.png'
    }
])

const pool = ref([])

for (let i = 0; i < 30; i++) {
    pool.value.push(items.value[i % items.value.length])
}

const anim = async () => {
    while (offset.value > -1600) {
        await delay(10)
        caseRollRef.value.style.transform = `${offset.value}px`
        offset.value--
    }
}
</script>

<style scoped lang="scss">
.case-wrapper {
    img {
        width: 64px;
        height: 64px;
    }

    border: 1px solid red;
    overflow: hidden;
}
</style>
