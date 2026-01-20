"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  images: Array<{ src: string; alt: string }>;
  intervalMs?: number;
};

export default function ImageSlider({ images, intervalMs = 4500 }: Props) {
  const safeImages = useMemo(() => images.filter((x) => x?.src), [images]);
  const [idx, setIdx] = useState(0);
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % safeImages.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs, safeImages.length]);

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
          className={imageFitClass}
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
              onClick={() => setIdx(i)}
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


