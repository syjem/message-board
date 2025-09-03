import { ChangelogHeader } from "@/app/changelogs/components/changelog-header";
import { ChangelogTimeline } from "@/app/changelogs/components/changelog-timeline";
import { ChangelogSummary } from "@/app/changelogs/components/changelog-summary";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ChangelogHeader />
        <ChangelogTimeline />
        <ChangelogSummary />
      </div>
    </div>
  );
}
