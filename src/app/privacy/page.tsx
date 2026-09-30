import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GsapPage } from "@/components/GsapPage";
import { Link } from "@/components/BrandMarks";

export const metadata: Metadata = {
  title: "Privacy — Gokulakrishnan",
  description:
    "How this site uses analytics, what stays on your device, and how to reach me.",
};

export default function PrivacyPage() {
  return (
    <GsapPage className="page page--privacy">
      <div className="homepage">
        <article className="article privacy reveal-flow">
          <header className="blogs-header">
            <h1>Privacy</h1>
            <p className="blogs-count">Updated 30 Sep 2026</p>
          </header>
          <p>
            This is a personal site. I want a sense of what people read, not a
            file on who you are. This page is what I actually run here, not a
            generic legal template.
          </p>

          <h2 className="about-heading">What this site collects</h2>
          <p>
            Most visits only send a page view. I do not ask for an account, and
            I do not run ads, remarketing, or social pixels.
          </p>
          <ul className="privacy-list">
            <li>Anonymous usage stats through Umami Analytics.</li>
            <li>
              A running total of page views, stored as one number, not as a
              profile of you.
            </li>
            <li>
              Whatever you type into Peter, the chat in the corner, if you
              choose to use it.
            </li>
          </ul>

          <h2 className="about-heading">Umami Analytics</h2>
          <p>
            I use{" "}
            <Link href="https://umami.is">Umami Cloud</Link> to see which pages
            are read, roughly where visits come from, and which browsers show
            up. That helps me notice broken pages and what to write next.
          </p>
          <p>A visit can include:</p>
          <ul className="privacy-list">
            <li>The page path and title.</li>
            <li>The referring site, if the browser sends one.</li>
            <li>Browser, operating system, and device type.</li>
            <li>Screen size and language.</li>
            <li>A coarse country, derived from IP and then anonymised.</li>
          </ul>
          <p>
            Umami does not set cookies in the tracking script. It does not
            collect names, emails, or account IDs. Search queries and URL hashes
            are stripped before a page view is sent, and the tracker respects
            Do Not Track. The website ID in the script is a public site
            identifier, not an API key.
          </p>
          <p>
            I do not use this data to identify you, sell it, or run ads. Umami
            Cloud stores analytics on their servers (US and EU). Retention
            follows their plan limits. I do not keep a separate visitor
            database.
          </p>

          <h2 className="about-heading">Cookies</h2>
          <p>
            This site does not set tracking cookies, and there is no cookie
            banner because nothing here needs that kind of consent.
          </p>
          <p>Your browser may keep a few first-party values that are not ads:</p>
          <ul className="privacy-list">
            <li>
              <strong>Theme</strong> in localStorage, so light or dark mode
              survives a refresh.
            </li>
            <li>
              <strong>Session flags</strong> in sessionStorage so the view
              counter is not hit twice in the same tab, and so the GitHub
              activity graph can reuse a fetch.
            </li>
          </ul>
          <p>
            Those stay on your device. Clearing site data removes them. They are
            not used to track you across other websites.
          </p>

          <h2 className="about-heading">Other services</h2>
          <ul className="privacy-list">
            <li>
              <strong>Page views.</strong> The number in the footer comes from
              this site&apos;s own API. The server talks to a counter service.
              Your browser does not call that service directly, and the counter
              is a total, not a visitor list.
            </li>
            <li>
              <strong>Peter.</strong> If you send a message, it goes to this
              site&apos;s server so an AI model can reply. Do not paste
              passwords, private keys, or other people&apos;s data. Chat is not
              used for advertising.
            </li>
            <li>
              <strong>GitHub activity.</strong> The heatmap loads public
              contribution stats for my GitHub username.
            </li>
            <li>
              <strong>Hosting.</strong> The site is served over HTTPS. The host
              may keep ordinary server logs (IP, time, user agent) for
              security and uptime. I do not use those logs as a marketing
              database.
            </li>
          </ul>

          <h2 className="about-heading">Contact</h2>
          <p>
            Questions about this page:{" "}
            <Link href="mailto:Gokulakrishnxn@gmail.com">
              Gokulakrishnxn@gmail.com
            </Link>
            .
          </p>
        </article>
        <Footer />
      </div>
    </GsapPage>
  );
}
