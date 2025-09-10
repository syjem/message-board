import { ChangelogHeader } from "@/app/changelogs/components/changelog-header";
import { ChangelogTimeline } from "@/app/changelogs/components/changelog-timeline";
import { ChangelogSummary } from "@/app/changelogs/components/changelog-summary";
import BackButton from "@/app/changelogs/components/back-button";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <BackButton />
      <div className="container mx-auto px-4 max-w-2xl">
        <ChangelogHeader />
        <ChangelogTimeline />
        <ChangelogSummary />
      </div>
    </div>
  );
}
