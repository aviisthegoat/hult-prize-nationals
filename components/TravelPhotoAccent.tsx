import Image from "next/image";
import Link from "next/link";

type Props = {
  urls: string[];
};

export default function TravelPhotoAccent({ urls }: Props) {
  if (urls.length === 0) return null;

  return (
    <div className="mb-10 -mt-2">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {urls.map((src) => (
          <div
            key={src}
            className="relative aspect-[5/4] overflow-hidden rounded-xl border border-hp-border shadow-sm"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 240px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-hp-gray mt-3">
        <Link href="/photos" className="text-heritage font-semibold hover:underline">
          Browse the event gallery
        </Link>
      </p>
    </div>
  );
}
