import { Mail } from "lucide-react";
import {
  BinaryHoldingsMark,
  Link,
  iconStyle,
} from "@/components/BrandMarks";
import { PeekLink } from "@/components/motion/hover-preview";
import { GsapPage } from "@/components/GsapPage";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/HomeHero";
import { Reveal } from "@/components/motion/reveal";
import { MonoActivityHeatmap } from "@/components/ui/mono-activity-heatmap";
import { getSiteUpdatedLabel } from "@/lib/site-updated";

export default function Home() {
  const updated = getSiteUpdatedLabel();

  return (
    <GsapPage className="page">
      <div className="homepage">
        <HomeHero updated={updated} />
        <article className="article reveal-flow">
          <h2 className="about-heading">About me</h2>
          <p>
            I was born in Cuddalore and raised in Chennai, India, where I
            currently live.
          </p>
          <p>
            I founded{" "}
            <PeekLink href="https://www.quarix.one" kind="quarix">
              Quarix
            </PeekLink>, a freelance agency where we build AI agents, websites,
            and mobile apps. We&apos;re a team helping businesses turn ideas
            into polished digital products.
          </p>
          <p>
            I currently work at <BinaryHoldingsMark />
            The Binary Holdings as an AI Engineer for Bnry Labs. Previously,
            I was a student and studied Computer Science Engineering,
            specialising in Artificial Intelligence and Data Science, at
            Hindustan Institute of Technology and Science.
          </p>
          <p>
            I consider myself an Engineer at heart and enjoy building highly
            polished products.
          </p>
          <p>
            You can find me on{" "}
            <PeekLink href="https://x.com/Gokulakrishnxn" kind="x">
              X
            </PeekLink>
            , or reach me via{" "}
            <Link href="mailto:Gokulakrishnxn@gmail.com">
              <Mail size={15} style={iconStyle} />
              email
            </Link>
            .
          </p>
        </article>

        <Reveal className="github-activity">
          <MonoActivityHeatmap username="Gokulakrishnxn" />
        </Reveal>

        <article className="article home-stack reveal-flow">
          <h2 className="about-heading">Technologies I&apos;ve worked with</h2>
          <p>
            Rust · Python · React · TypeScript · React Native · Swift · SwiftUI
            · Postgres · and whatever else each project required
          </p>
          <p>
            I don&apos;t care too much about the stack. I like understanding how
            things work and shipping them.
          </p>
        </article>

        <Footer />
      </div>
    </GsapPage>
  );
}
