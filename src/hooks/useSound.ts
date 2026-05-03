import { Howl } from 'howler'
import { useCallback } from 'react'

const BASE = import.meta.env.BASE_URL

const sounds = {
  open:  new Howl({ src: [`${BASE}sounds/open.mp3`],  volume: 0.4 }),
  close: new Howl({ src: [`${BASE}sounds/close.mp3`], volume: 0.4 }),
  click: new Howl({ src: [`${BASE}sounds/click.mp3`], volume: 0.3 }),
}

export function useSound() {
  const play = useCallback((name: keyof typeof sounds) => {
    sounds[name].play()
  }, [])
  return { play }
}