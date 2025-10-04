import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 relative transition-all duration-300 ease-in-out">
      <section className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="mx-auto w-full max-w-2xl space-y-8 relative z-10">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                My Projects
              </h1>
              <p className="max-w-[600px] md:text-xl">
                A collection of my recent work and side projects
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative transition-all duration-500 ease-in-out hover:transform hover:scale-[1.01]">
        <div className="space-y-12 w-full py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Featured Projects
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
    </main>
  );
}
