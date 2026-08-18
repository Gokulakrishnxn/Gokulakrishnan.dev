import { FileText, Mail } from "lucide-react";
import {
  ArrowRightMark,
  BinaryHoldingsMark,
  Link,
  iconStyle,
} from "@/components/BrandMarks";
import { Footer } from "@/components/Footer";
import { MonoActivityHeatmap } from "@/components/ui/mono-activity-heatmap";
import { ProjectsFolderLink } from "@/components/ProjectsFolderLink";
import { WritingList } from "@/components/WritingList";

export default function Home() {
  return (
    <div className="page">
      <div className="homepage">
        <article className="article">
          <header>
            <div className="name-row">
              <h1>Gokulakrishnan</h1>
              <a className="resume-link" href="/resume" aria-label="Resume">
                <FileText size={15} />
              </a>
            </div>
            <time>Updated Jul 29, 2026</time>
          </header>
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
            You can see my works and projects here
            <ArrowRightMark />
            <ProjectsFolderLink />
          </p>
          <p>
            You can find me on{" "}
            <Link href="https://x.com/benjitaylor">X</Link>, or reach me via{" "}
            <Link href="mailto:benji@benji.org">
              <Mail size={15} style={iconStyle} />
              email
            </Link>
            .
          </p>
        </article>

        <section className="github-activity">
          <MonoActivityHeatmap username="Gokulakrishnxn" />
        </section>

        <section>
          <WritingList />
        </section>

        <Footer />
      </div>
    </div>
  );
}
