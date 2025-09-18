import { ChangelogHeader } from "@/app/changelogs/components/changelog-header";
import { ChangelogTimeline } from "@/app/changelogs/components/changelog-timeline";
import { ChangelogSummary } from "@/app/changelogs/components/changelog-summary";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen container mx-auto px-4 max-w-2xl">
      <ChangelogHeader />
      <ChangelogTimeline />
      <ChangelogSummary />
    </div>
  );
}
