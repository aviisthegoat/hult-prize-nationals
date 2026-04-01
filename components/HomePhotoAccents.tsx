import Image from "next/image";
import Link from "next/link";

export function HomePhotoStrip({ urls }: { urls: string[] }) {
  if (urls.length === 0) return null;

  return (
    <section className="relative border-y border-hp-border/30 bg-gradient-to-b from-hp-off-white to-white py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <p className="section-label">Moments</p>
            <p className="text-hp-black font-black text-lg sm:text-xl mt-1">
              Hult Prize in action
            </p>
          </div>
          <Link
            href="/photos"
            className="text-sm font-bold text-heritage hover:text-purple transition-colors"
          >
            View full gallery →
          </Link>
        </div>
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          {urls.map((src) => (
            <div
              key={src}
              className="relative h-28 sm:h-36 md:h-40 w-[42%] min-w-[42%] shrink-0 snap-start sm:w-1/5 sm:min-w-0 sm:flex-1 overflow-hidden rounded-2xl border border-hp-border shadow-sm"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 42vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePhotoFeatureRow({ urls }: { urls: string[] }) {
  if (urls.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {urls.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hp-border shadow-md"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
