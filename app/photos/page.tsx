import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import EventPhotoGallery from "@/components/EventPhotoGallery";
import { getGalleryUrls } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Hult Prize Nationals and the Hult Prize community at Hult Boston.",
};

export default function PhotosPage() {
  const urls = getGalleryUrls();

  return (
    <>
      <PageHero
        accent="Community"
        title="Gallery"
        subtitle="A look at the Hult Prize community—competition, collaboration, and campus life."
      />

      <SectionWrapper>
        <div className="max-w-6xl mx-auto">
          <p className="text-hp-gray text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
            Browse highlights from past events. Select any image to view it larger.
            Use arrow keys or on-screen controls to move between photos while viewing.
          </p>
          <EventPhotoGallery urls={urls} />
        </div>
      </SectionWrapper>
    </>
  );
}
