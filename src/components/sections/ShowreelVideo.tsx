"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** 시안 쇼릴 슬로우모션 */
  playbackRate?: number;
};

export function ShowreelVideo({ src, playbackRate = 0.7 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.playbackRate = playbackRate;
  }, [playbackRate, src]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onLoadedMetadata={(e) => {
        e.currentTarget.playbackRate = playbackRate;
      }}
    />
  );
}
