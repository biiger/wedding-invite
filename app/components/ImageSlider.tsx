"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  images: Array<{ src: string; alt: string }>;
  intervalMs?: number;
};

export default function ImageSlider({ images, intervalMs = 4500 }: Props) {
  const safeImages = useMemo(() => images.filter((x) => x?.src), [images]);
  const [idx, setIdx] = useState(0);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lastIdxRef = useRef(0);

  const goTo = useCallback(
    (next: number, manualDir?: 1 | -1) => {
      const len = safeImages.length;
      if (len === 0) return;
      // trigger fade immediately so every change animates
      setIsFadingIn(true);
      setIdx((current) => {
        const target = ((next % len) + len) % len; // safe modulo
        if (target === current) return current;

        const computedDir =
          manualDir ??
          (target > current || (current === len - 1 && target === 0) ? 1 : -1);

        setDirection(computedDir);
        setPrevIdx(current);
        lastIdxRef.current = target;
        return target;
      });
    },
    [safeImages.length],
  );

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const t = setInterval(() => {
      goTo(lastIdxRef.current + 1, 1);
    }, intervalMs);
    return () => clearInterval(t);
  }, [goTo, intervalMs, safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <div className="ring-soft flex aspect-[4/5] w-full items-center justify-center p-4 text-center text-sm text-zinc-600">
        Add your photos to <span className="mx-1 font-semibold">public/assets/</span>
        and update the list in <span className="mx-1 font-semibold">app/page.tsx</span>.
      </div>
    );
  }

  const active = safeImages[Math.min(idx, safeImages.length - 1)];
  const mobileAspectClass =
    isLandscape === true ? "aspect-[16/11]" : "aspect-[4/5]";
  const imageFitClass =
    isLandscape === true ? "object-contain p-2" : "object-cover";
  const baseAnimClass =
    "transition-transform transition-opacity duration-1100 ease-[cubic-bezier(0.19,0.64,0.31,1)] will-change-transform will-change-opacity";

  useEffect(() => {
    setIsFadingIn(true);
    const frame = requestAnimationFrame(() => setIsFadingIn(false));
    return () => cancelAnimationFrame(frame);
  }, [active.src]);

  useEffect(() => {
    // Track the previous index so we can crossfade gracefully.
    const prev = lastIdxRef.current;
    if (prev !== idx) {
      setPrevIdx(prev);
    }
    lastIdxRef.current = idx;
  }, [idx]);

  useEffect(() => {
    if (prevIdx === null) return;
    const timeout = setTimeout(() => setPrevIdx(null), 700);
    return () => clearTimeout(timeout);
  }, [prevIdx]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={[
          "relative w-full",
          mobileAspectClass,
          "sm:aspect-[16/10]",
          isLandscape === true ? "bg-white/35" : "",
        ].join(" ")}
      >
        {prevIdx !== null && safeImages[prevIdx] ? (
          <Image
            key={`${safeImages[prevIdx].src}-prev`}
            src={safeImages[prevIdx].src}
            alt={safeImages[prevIdx].alt}
            fill
            sizes="(max-width: 640px) 92vw, 720px"
            className={[
              "absolute inset-0",
              imageFitClass,
              baseAnimClass,
                direction === 1
                  ? "-translate-x-6 opacity-0 scale-[1.02] blur-[0.65px]"
                  : "translate-x-6 opacity-0 scale-[1.02] blur-[0.65px]",
            ].join(" ")}
          />
        ) : null}

        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(max-width: 640px) 92vw, 720px"
          onLoadingComplete={(img) => {
            setIsLandscape(img.naturalWidth >= img.naturalHeight);
          }}
          className={[
            imageFitClass,
            baseAnimClass,
            isFadingIn
              ? [
                  direction === 1
                    ? "translate-x-5 opacity-0 scale-[0.985] blur-[0.45px]"
                    : "-translate-x-5 opacity-0 scale-[0.985] blur-[0.45px]",
                ]
              : "translate-x-0 opacity-100 scale-100 blur-0",
          ].join(" ")}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
      </div>

      {safeImages.length > 1 ? (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={[
                "h-1.5 rounded-full transition-all",
                i === idx ? "w-6 bg-white/90" : "w-2.5 bg-white/55",
              ].join(" ")}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}


