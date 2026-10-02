import type { Metadata } from "next";
import { AlbumGrid } from "@/components/AlbumGrid";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { albumShots } from "@/data/album";

export const metadata: Metadata = {
  title: "Album — Gokulakrishnan",
  description: "Photos from the road and from home.",
};

export default function PhotosPage() {
  const count = albumShots.length;
  const label = count === 1 ? "1 photo" : `${count} photos`;

  return (
    <GsapPage className="page page--album">
      <div className="homepage">
        <article className="article reveal-flow">
          <header className="blogs-header">
            <h1>Album</h1>
            <p className="blogs-count">{label}</p>
          </header>
        </article>
        <AlbumGrid />
        <Footer />
      </div>
    </GsapPage>
  );
}
