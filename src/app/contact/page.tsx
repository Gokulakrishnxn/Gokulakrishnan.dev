import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { CONTACT_EMAIL } from "@/lib/contact-options";

export const metadata: Metadata = {
  title: "Contact — Gokulakrishnan",
  description:
    "Occasionally available for freelance work — websites, AI agents, mobile apps, and SaaS. Tell me what you have in mind.",
};

const links = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "X", value: "@Gokulakrishnxn", href: "https://x.com/Gokulakrishnxn" },
  {
    label: "LinkedIn",
    value: "in/gokulakrishnxn",
    href: "https://linkedin.com/in/gokulakrishnxn/",
  },
  { label: "Quarix", value: "quarix.one", href: "https://www.quarix.one" },
];

export default function ContactPage() {
  return (
    <GsapPage className="page page--contact">
      <div className="homepage">
        <article className="article reveal-flow">
          <header className="blogs-header">
            <h1>Contact</h1>
            <p className="blogs-count">Occasionally available for freelance</p>
          </header>
          <p>
            I take on a small number of freelance projects — websites, AI
            agents, mobile apps, and SaaS, usually through Quarix. If you have
            something interesting in mind, I’d love to hear about it.
          </p>
        </article>

        <section className="contact-shell reveal-flow" aria-label="Freelance inquiry form">
          <ContactForm />
        </section>

        <article className="article home-stack reveal-flow">
          <h2 className="about-heading">Other ways to reach me</h2>
          <ul className="contact-links">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                >
                  <span className="contact-links-label">{link.label}</span>
                  <span className="contact-links-value">
                    {link.value}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </article>

        <Footer />
      </div>
    </GsapPage>
  );
}
