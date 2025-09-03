export function ChangelogHeader() {
  return (
    <header className="text-center mb-10 md:mb-16">
      <h1 className="text-3xl md:text-5xl font-serif font-light mb-6 text-balance text-white">
        Changelogs
      </h1>
      <p className="mb-8 text-center font-normal">
        This app is my take on{" "}
        <em className="font-medium">
          The Odin Project’s Node.js Mini Message Board
        </em>{" "}
        — but it didn’t stop at the first build. Over time, I rebuilt it in
        different stacks to solve real deployment and performance issues.
      </p>
    </header>
  );
}
