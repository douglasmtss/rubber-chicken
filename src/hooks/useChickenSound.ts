'use client';

import { useRef, useCallback } from 'react';
import { Howl } from 'howler';

const SOUND_PATHS = [
  '/sounds/chicken-1.mp3',
  '/sounds/chicken-2.mp3',
  '/sounds/chicken-3.mp3',
];

export function useChickenSound() {
  const soundsRef = useRef<Howl[]>([]);
  const initializedRef = useRef(false);

  const initSounds = useCallback(() => {
    if (initializedRef.current) return;
    soundsRef.current = SOUND_PATHS.map(
      (src) =>
        new Howl({
          src: [src],
          preload: true,
          volume: 0.8,
        })
    );
    initializedRef.current = true;
  }, []);

  const playSound = useCallback(() => {
    initSounds();
    const sounds = soundsRef.current;
    if (sounds.length === 0) return;
    const randomIndex = Math.floor(Math.random() * sounds.length);
    sounds[randomIndex].play();
  }, [initSounds]);

  return { playSound };
}
