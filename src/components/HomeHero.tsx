import { FileText } from "lucide-react";

function VerifiedMark() {
  return (
    <svg
      className="home-hero-verified"
      width="18"
      height="18"
      viewBox="0 0 22 22"
      aria-label="Verified"
    >
      <circle cx="11" cy="11" r="11" fill="#1d9bf0" />
      <path
        d="M6.4 11.2 9.3 14.1 15.6 7.8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeHero({
  updated,
}: {
  updated: { label: string; datetime: string };
}) {
  return (
    <section className="home-hero" aria-label="Profile">
      <div className="home-hero-banner">
        <img
          className="home-hero-scribble"
          src="/hero-banner.png"
          alt=""
          width={1024}
          height={341}
        />
      </div>

      <div className="home-hero-body">
        <div className="home-hero-top">
          <img
            className="home-hero-photo"
            src="/gokul.jpg"
            alt="Gokulakrishnan"
            width={160}
            height={160}
          />
          <a className="home-hero-resume" href="/resume">
            <FileText size={14} />
            Resume
          </a>
        </div>

        <div className="home-hero-identity">
          <div className="home-hero-name">
            <h1 className="gsap-name">Gokulakrishnan</h1>
            <VerifiedMark />
          </div>
          <a
            className="home-hero-handle"
            href="https://x.com/Gokulakrishnxn"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Gokulakrishnxn
          </a>
          <p className="home-hero-bio">
            AI Enthusiast 🚀 · Exploring AI safety, trends &amp; tools ·
            Building in public
          </p>
          <time dateTime={updated.datetime}>{updated.label}</time>
        </div>
      </div>
    </section>
  );
}
