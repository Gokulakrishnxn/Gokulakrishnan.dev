import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

const allPosts = getAllPosts();

function getIndianTime() {
  const indianTime = TZDate.tz("Asia/Kolkata");
  return format(indianTime, "EEEE, MMMM d, yyyy 'at' h:mm:ss a") + " IST";
}

export const dynamic = "force-dynamic";

export async function GET() {
  const indianTime = getIndianTime();

  const content = `# gokulakrishnan.dev

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as an AI Engineer and Researcher.

- [About](${SITE_INFO.url}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects that show my skills and creativity.
- [Awards](${SITE_INFO.url}/awards.md): My key awards and honors.
- [Certifications](${SITE_INFO.url}/certifications.md): Certifications and credentials I've earned.

## Blog

${allPosts.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/blog/${item.slug}.mdx): ${item.metadata.description}`).join("\n")}

---

**Current Indian Standard Time (IST):** ${indianTime}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
