import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { MonoActivityHeatmap } from "@/components/ui/mono-activity-heatmap";
import { WritingList } from "@/components/WritingList";

function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <a
      className="basic-link"
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="page">
      <div className="homepage">
        <article className="article">
          <header>
            <h1>Benji Taylor</h1>
            <time>Updated Jul 29, 2026</time>
          </header>
          <p>I was born in London, UK, and now live in Los Angeles, CA.</p>
          <p>
            I founded <Link href="https://lfe.org">Los Feliz Engineering</Link>,
            a consumer software company named after the first neighbourhood I
            moved to in the U.S. We created <Link href="https://honk.me">Honk</Link>,
            a real-time messaging app, and{" "}
            <Link href="https://family.co">Family</Link>, a self-custody crypto
            wallet. In September 2023, LFE was acquired by{" "}
            <Link href="https://aave.com">Aave Labs</Link>, where I served as
            CPO until October 2025.
          </p>
          <p>
            I currently work at <Link href="https://spacex.com">SpaceX</Link>,
            where I lead design for <Link href="https://x.com">X</Link> and{" "}
            <Link href="https://x.ai">SpaceXAI</Link>. Previously, I was Head of
            Design at <Link href="https://base.org">Base</Link>, a division of
            Coinbase.
          </p>
          <p>
            I’m also a co-founder at <Link href="https://dip.org">Dip</Link>,
            which creates and publishes tools for achieving interface
            excellence, such as{" "}
            <Link href="https://www.npmjs.com/package/cmdk">cmdk</Link> and{" "}
            <Link href="https://agentation.com">Agentation</Link>.
          </p>
          <p>
            I consider myself a designer at heart and enjoy building highly
            polished products.
          </p>
          <p>
            You can find me on{" "}
            <Link href="https://x.com/benjitaylor">X</Link>,{" "}
            <Link href="https://instagram.com/benjitaylor">Instagram</Link>, or
            reach me via <Link href="mailto:benji@benji.org">email</Link>.
          </p>
        </article>

        <section className="github-activity">
          <MonoActivityHeatmap
            username="Gokulakrishnxn"
            accentColor="blue"
            theme="light"
          />
        </section>

        <section>
          <WritingList />
        </section>

        <Footer />
      </div>
    </div>
  );
}
