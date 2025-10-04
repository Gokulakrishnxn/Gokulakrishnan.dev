import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLinkIcon, EyeIcon } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 relative transition-all duration-300 ease-in-out">
      <section id="hero" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="mx-auto w-full max-w-2xl space-y-8 relative z-10">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hi, I&apos;m {DATA.name.split(" ")[0]} 👋
              </h1>
              <p className="max-w-[600px] md:text-xl">
                {DATA.description}
              </p>
            </div>
            <Avatar className="size-28 border">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>
      <section id="about" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="relative z-10">
          <h2 className="text-xl font-bold">About</h2>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </div>
      </section>
      <section id="work" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Experience</h2>
          {DATA.work.map((work, id) => (
            <ResumeCard
              key={work.company}
              logoUrl={work.logoUrl}
              altText={work.company}
              title={work.title}
              subtitle={work.company}
              href={work.href}
              badges={work.badges}
              period={`${work.start} - ${work.end ?? "Present"}`}
              type={work.type}
              description={work.description}
            />
          ))}
        </div>
      </section>
      <section id="education" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Education</h2>
          {DATA.education.map((education, id) => (
            <ResumeCard
              key={education.school}
              href={education.href}
              logoUrl={education.logoUrl}
              altText={education.school}
              title={education.school}
              subtitle={education.degree}
              period={`${education.start} - ${education.end}`}
              description={education.description}
            />
          ))}
        </div>
      </section>
      <section id="certifications" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Certifications</h2>
          {DATA.certifications.map((cert, id) => (
            <ResumeCard
              key={cert.name}
              href={cert.url}
              logoUrl=""
              altText={cert.issuer}
              title={cert.name}
              subtitle={cert.issuer}
              period={cert.date}
              type="Certification"
              description={`${cert.description}\n\nCredential ID: ${cert.credentialId}`}
            />
          ))}
        </div>
      </section>
      <section id="skills" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="flex min-h-0 flex-col gap-y-3">
          <h2 className="text-xl font-bold">Stack</h2>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </section>
      <section id="projects" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="space-y-12 w-full py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                My Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;ve worked on a variety of projects, from simple
                websites to complex web applications. Here are a few of my
                favorites.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <ProjectCard
                href={project.href}
                key={project.title}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Want to chat? Just shoot me a dm{" "}
              <Link
                href={DATA.contact.social.X.url}
                className="text-blue-500 hover:underline"
              >
                with a direct question on twitter
              </Link>{" "}
              and I&apos;ll respond whenever I can. I will ignore all
              soliciting.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
