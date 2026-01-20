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
  const hasPreloadedRef = useRef(false);
  const preloadPromiseBySrcRef = useRef<Map<string, Promise<void>>>(new Map());
  const transitionTokenRef = useRef(0);

  // Preload all images once on first mount so that sliding later is instant and smooth.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasPreloadedRef.current) return;
    if (!safeImages.length) return;

    hasPreloadedRef.current = true;
    safeImages.forEach((img) => {
      if (!img?.src) return;
      // Warm cache + decode once so we don't flash during transitions.
      void preloadAndDecode(img.src);
    });
  }, [safeImages]);

  const preloadAndDecode = useCallback((src: string) => {
    const existing = preloadPromiseBySrcRef.current.get(src);
    if (existing) return existing;

    const p = new Promise<void>((resolve) => {
      if (typeof window === "undefined") return resolve();
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;

      const finish = async () => {
        try {
          // decode() prevents the "blank frame" when swapping images.
          // It can throw in some browsers, so we guard it.
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (typeof img.decode === "function") {
            await img.decode();
          }
        } catch {
          // ignore decode errors; cache is still warmed
        } finally {
          resolve();
        }
      };

      if (img.complete) {
        void finish();
      } else {
        img.onload = () => void finish();
        img.onerror = () => resolve();
      }
    });

    preloadPromiseBySrcRef.current.set(src, p);
    return p;
  }, []);

  const goTo = useCallback(
    (next: number, manualDir?: 1 | -1) => {
      const len = safeImages.length;
      if (len === 0) return;
      const target = ((next % len) + len) % len; // safe modulo
      const targetSrc = safeImages[target]?.src;
      if (!targetSrc) return;

      const token = ++transitionTokenRef.current;
      void preloadAndDecode(targetSrc).then(() => {
        if (token !== transitionTokenRef.current) return;
        // trigger fade only when next image is decoded, preventing flashes
        setIsFadingIn(true);
        setIdx((current) => {
          if (target === current) return current;
          const computedDir =
            manualDir ??
            (target > current || (current === len - 1 && target === 0) ? 1 : -1);
          setDirection(computedDir);
          setPrevIdx(current);
          lastIdxRef.current = target;
          return target;
        });
      });
    },
    [preloadAndDecode, safeImages],
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
    "transition-transform transition-opacity duration-800 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform will-change-opacity";

  useEffect(() => {
    setIsFadingIn(true);
    // Use double-rAF to ensure the "from" state is painted before transitioning to "to".
    // This prevents cases where React batching causes no visible transition on subsequent slides.
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => setIsFadingIn(false));
      return () => cancelAnimationFrame(frame2);
    });
    return () => cancelAnimationFrame(frame1);
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
              // Old image slides out to the left
              isFadingIn
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0",
            ].join(" ")}
          />
        ) : null}

        <Image
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
                  // New image slides in from the right
                  "translate-x-10 opacity-0",
                ]
              : "translate-x-0 opacity-100",
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


