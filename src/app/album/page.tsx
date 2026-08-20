import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AlbumGrid } from "@/components/AlbumGrid";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";

export const metadata: Metadata = {
  title: "Album — Gokulakrishnan",
  description: "Photographs by Gokulakrishnan.",
};

export default function AlbumPage() {
  return (
    <GsapPage className="page page--album">
      <div className="homepage">
        <article className="article">
          <header className="resume-page-header">
            <a className="resume-back" href="/">
              <ArrowLeft size={14} />
              Back
            </a>
            <h1>Album</h1>
          </header>
          <p>Photos. Places, and the in-between.</p>
        </article>
        <AlbumGrid />
        <Footer />
      </div>
    </GsapPage>
  );
}
