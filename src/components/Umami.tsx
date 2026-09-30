import Script from "next/script";

/** Public website ID from Umami Cloud. This is not an API key. */
const UMAMI_WEBSITE_ID = "ca7e61b1-8b57-484a-b743-8c50ce1aa611";

export function Umami() {
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains="www.gokulakrishnan.dev,gokulakrishnan.dev"
      data-do-not-track="true"
      data-exclude-search="true"
      data-exclude-hash="true"
      strategy="afterInteractive"
    />
  );
}
