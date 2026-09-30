import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { LibraryCatalog } from "@/components/LibraryCatalog";
import { libraryItems } from "@/data/library";

export const metadata: Metadata = {
  title: "Library — Gokulakrishnan",
  description: "A shelf for things Gokulakrishnan is saving.",
};

export default function LibraryPage() {
  const count = libraryItems.length;
  const label = count === 0 ? "Empty" : count === 1 ? "1 item" : `${count} items`;

  return (
    <GsapPage className="page page--library">
      <div className="homepage">
        <article className="article reveal-flow">
          <header className="blogs-header">
            <h1>Library</h1>
            <p className="blogs-count">{label}</p>
          </header>
        </article>
        <LibraryCatalog />
        <Footer />
      </div>
    </GsapPage>
  );
}
