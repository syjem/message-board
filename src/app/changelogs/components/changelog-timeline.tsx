import { ChangelogEntry } from "@/app/changelogs/components/changelog-entry";

const changelogData = [
  {
    date: "Jul 23, 2025",
    title: "First iteration (Express + MongoDB on Render)",
    description:
      "The project started with Express as required by the course. I deployed it on Render’s free tier, which worked well at first. However, once the free trial ended, hosting limitations became a blocker.",
    repo: "https://github.com/Jem201800538/mini-message-board/tree/main",
    preview: "",
    tech: ["Express.js", "Mongoose", "EJS", "Tailwind CSS"],
    isLatest: false,
  },
  {
    date: "Aug 24, 2025",
    title: "Second iteration (Flask + PyMongo on Vercel)",
    description:
      "To keep the project alive, I migrated to Flask. Flask paired with MongoDB was lightweight and easier to run on Vercel’s serverless platform. This made deployment simple, but the app still relied on traditional form submissions that refreshed the page.",
    repo: "https://github.com/Jem201800538/mini-message-board",
    preview: "https://mini-message-board-indol-ten.vercel.app/",
    tech: ["Flask", "PyMongo", "Jinja2", "Tailwind CSS"],
    isLatest: false,
  },
  {
    date: "Sep 03, 2025",
    title: "Final iteration (Next.js + Supabase)",
    description:
      "As the database grew, page reloads slowed things down. Rebuilding with Next.js and Supabase gave the app a modern stack: client-side rendering, real-time updates, and a more scalable backend. Now messages load smoothly without the lag from full page reloads.",
    repo: "",
    preview: "",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    isLatest: true,
  },
];

export function ChangelogTimeline() {
  return (
    <article>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute hidden md:block left-2 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {changelogData.map((entry) => (
            <ChangelogEntry key={entry.title} {...entry} />
          ))}
        </div>
      </div>
    </article>
  );
}
