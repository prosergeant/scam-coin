import {useLoadedImages} from '../model';

export const setImageIsLoad = (src: string) => {
	const imageStore = useLoadedImages()
	const image = imageStore.loadedImages.find(el => el.src === src)
	if(!image) return
	image.loaded = true
}

export const setImageForLoad = (src: string) => {
	const imageStore = useLoadedImages()
	imageStore.loadedImages.push({src: src, loaded: false})
}
