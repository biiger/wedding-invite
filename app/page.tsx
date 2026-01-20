'use client';

import ImageSlider from "./components/ImageSlider";

export default function Home() {
  const brideGroom1 = "Khuanpawee Thuma";
  const brideGroom2 = "Chukiat Jadeestan";
  const title = `${brideGroom1}\r\n${brideGroom2}`;
  const saveTheDate = "10.03.2026";
  const venueName = "Cresco Hotel Buriram";
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Cresco%20Buriram%20Hotel";
  const timeline = [
    { time: "10.00 น.", title: "พิธีแห่ขันหมาก" },
    { time: "11.15 น.", title: "พิธีสวมแหวนหมั้น" },
    { time: "13.00 น.", title: "ฉลองมงคลสมรส" },
  ];

  return (
    <div className="bg-dreamy min-h-screen font-[var(--font-kodchasan)]">
      <main className="mx-auto w-full max-w-4xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <header className="card-glass ring-soft relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-rose-200/35 blur-2xl" />
          <div className="absolute -right-16 -top-10 h-56 w-56 rounded-full bg-amber-100/55 blur-2xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-stone-200/30 blur-2xl" />

          <div className="relative text-center">
            <p className="text-xs font-semibold tracking-[0.28em] text-zinc-700/80">
              WEDDING INVITATION
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-[#2b211d] sm:text-5xl">
              {title}
            </h1>
            <div className="mx-auto mt-6 h-px w-24 bg-zinc-900/10" />
            <p className="mt-6 text-sm leading-7 text-zinc-700 sm:text-base">
              Save the date
              <span className="mx-2 inline-block rounded-full bg-white/70 px-3 py-1 font-semibold text-[#2b211d]">
                {saveTheDate}
              </span>
            </p>
          </div>
        </header>

        <section className="mt-6 sm:mt-8">
          <div className="card-glass ring-soft rounded-3xl p-6 sm:p-8">
            <div className="mt-5 space-y-4 sm:space-y-5">
              {timeline.map((item, idx) => (
                <div key={item.time} className="relative flex gap-4 sm:gap-5">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 inline-flex min-w-[88px] items-center justify-center rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#2b211d] shadow-sm ring-1 ring-[#7a5a48]/20">
                      {item.time}
                    </span>
                    {idx < timeline.length - 1 ? (
                      <span className="mt-1 h-8 w-px bg-gradient-to-b from-[#7a5a48]/25 via-[#f3b6c8]/35 to-transparent" />
                    ) : null}
                  </div>
                  <div className="flex-1 rounded-2xl bg-white/55 px-4 py-3 shadow-[0_12px_38px_rgba(43,33,29,0.08)] ring-1 ring-white/50">
                    <p className="text-base font-semibold text-[#2b211d]">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2">
          <div className="rounded-3xl">
            {/* Slider full-bleed */}
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            <Slider />
          </div>

          <div className="card-glass ring-soft rounded-3xl p-6 sm:p-8">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-900">
              สถานที่จัดงาน
            </h2>
            <p className="mt-3 text-xl font-semibold text-zinc-950">
              {venueName}
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-700">
              โรงแรม Cresco Buriram
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#7a5a48] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6a4e3f]"
            >
              เปิด Google Maps
            </a>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-zinc-700/75">
          With love, {brideGroom1} & {brideGroom2}
        </footer>
      </main>
    </div>
  );
}

function Slider() {
  const images = [
    // Replace with your real files, e.g. "/assets/01.jpg"
    { src: "/images/01.jpg", alt: "Wedding photo 1" },
    { src: "/images/02.jpg", alt: "Wedding photo 2" },
    { src: "/images/03.jpg", alt: "Wedding photo 3" },
  ];

  return <ImageSlider images={images} />;
}
