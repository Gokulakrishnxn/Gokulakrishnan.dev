import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { writingItems } from "@/data/writing";

export const metadata: Metadata = {
  title: "Blogs — Gokulakrishnan",
  description: "Notes on products, research, and the work underneath.",
};

export default function BlogsPage() {
  const count = writingItems.length;
  const label = count === 1 ? "1 note" : `${count} notes`;

  return (
    <GsapPage className="page page--blogs">
      <div className="homepage">
        <article className="article reveal-flow">
          <header className="blogs-header">
            <h1>Blogs</h1>
            <p className="blogs-count">{label}</p>
          </header>
          <p>Notes on products I am building, and the work that sits under them.</p>
        </article>
        <BlogIndex />
        <Footer />
      </div>
    </GsapPage>
  );
}
