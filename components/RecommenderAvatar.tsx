"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  initials: string;
  size?: number;
  className?: string;
};

export default function RecommenderAvatar({
  src,
  alt,
  initials,
  size = 72,
  className = "",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-heritage/12 text-heritage font-black tracking-tight border border-heritage/25 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.32 }}
        aria-hidden
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover border border-hp-border bg-hp-off-white ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
