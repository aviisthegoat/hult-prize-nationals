"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  urls: string[];
};

export default function EventPhotoGallery({ urls }: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const goPrev = useCallback(() => {
    setActive((i) => {
      if (i === null || urls.length === 0) return null;
      return (i - 1 + urls.length) % urls.length;
    });
  }, [urls.length]);
  const goNext = useCallback(() => {
    setActive((i) => {
      if (i === null || urls.length === 0) return null;
      return (i + 1) % urls.length;
    });
  }, [urls.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, goPrev, goNext]);

  if (urls.length === 0) {
    return (
      <p className="text-center text-hp-gray text-sm py-16">
        Event photos will appear here once images are added to{" "}
        <code className="text-xs bg-hp-off-white px-1.5 py-0.5 rounded">public/photos</code>.
      </p>
    );
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
        {urls.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative mb-3 sm:mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-hp-border bg-hp-off-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-heritage/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <span className="sr-only">Open image {i + 1} of {urls.length}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Previous image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Next image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative flex max-h-[85vh] w-full max-w-5xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[min(85vh,90vw)] w-full">
              <Image
                src={urls[active]}
                alt=""
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/70">
              {active + 1} / {urls.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
