import { throttle } from '@/shared/lib/composables/trottle'
import { ref } from 'vue'

export function useResizeObserver(el: HTMLElement, ms: number = 1000) {
    const screenWidth = ref(0)

    const throttled = throttle(setScreenWidth, ms)
    const observer = new ResizeObserver(throttled)
    observer.observe(el)

    function setScreenWidth(entries: ResizeObserverEntry[]) {
        screenWidth.value = entries[0].contentRect.width
    }

    return {
        screenWidth
    }
}
