"use client";

import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
};

type Props = {
  photos: Photo[];
};

export default function PhotoStack({ photos }: Props) {
  const safe = photos.filter((p) => p?.src);

  if (safe.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-white/40 bg-white/40 p-8 text-center text-sm text-zinc-700">
        Add your photos to <span className="mx-1 font-semibold">public/assets/</span>
        and update the list in <span className="mx-1 font-semibold">app/page.tsx</span>.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {safe.map((p, i) => (
        <figure
          key={p.src}
          className="group overflow-hidden rounded-3xl border border-white/50 bg-white/55 p-3 shadow-[0_18px_60px_rgba(43,33,29,0.10)] backdrop-blur-md"
        >
          <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-white/35 sm:h-[420px]">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 92vw, 720px"
              className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.01]"
              priority={i === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
          </div>

          <figcaption className="mt-3 flex items-center justify-between px-1 text-xs text-zinc-700/80">
            <span className="font-medium">Photo {i + 1}</span>
            <span className="inline-flex h-6 items-center rounded-full bg-white/70 px-2 font-semibold text-[#2b211d]">
              {i + 1}/{safe.length}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}


