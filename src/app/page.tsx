import { Mail } from "lucide-react";
import {
  BinaryHoldingsMark,
  Link,
  iconStyle,
} from "@/components/BrandMarks";
import { GsapPage } from "@/components/GsapPage";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/HomeHero";
import { MonoActivityHeatmap } from "@/components/ui/mono-activity-heatmap";
import { getSiteUpdatedLabel } from "@/lib/site-updated";

export default function Home() {
  const updated = getSiteUpdatedLabel();

  return (
    <GsapPage className="page">
      <div className="homepage">
        <HomeHero updated={updated} />
        <article className="article">
          <h2 className="about-heading">About me</h2>
          <p>
            I was born in Cuddalore and raised in Chennai, India, where I
            currently live.
          </p>
          <p>
            I founded{" "}
            <Link href="https://www.quarix.one">Quarix</Link>, a freelance
            agency where we build AI agents, websites, and mobile apps.
            We&apos;re a team helping businesses turn ideas into polished
            digital products.
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
            <Link href="https://x.com/Gokulakrishnxn">X</Link>, or reach me via{" "}
            <Link href="mailto:Gokulakrishnxn@gmail.com">
              <Mail size={15} style={iconStyle} />
              email
            </Link>
            .
          </p>
        </article>

        <section className="github-activity">
          <MonoActivityHeatmap username="Gokulakrishnxn" />
        </section>

        <Footer />
      </div>
    </GsapPage>
  );
}
