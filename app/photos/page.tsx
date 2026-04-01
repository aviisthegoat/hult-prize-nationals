import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import EventPhotoGallery from "@/components/EventPhotoGallery";
import { getGalleryUrlsShuffled } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Official photograph gallery for Hult Prize Nationals and the Hult Prize community at Hult Boston.",
};

export default function PhotosPage() {
  const urls = getGalleryUrlsShuffled();

  return (
    <>
      <PageHero
        accent="Community"
        title="Gallery"
        subtitle="Photographs from the Hult Prize community: competition, collaboration, and campus life."
      />

      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <EventPhotoGallery urls={urls} />
        </div>
      </SectionWrapper>
    </>
  );
}
