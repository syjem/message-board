import Link from "next/link";

export function ChangelogHeader() {
  return (
    <header className="text-center my-10">
      <h1 className="text-3xl md:text-5xl font-serif font-light mb-6 text-balance text-white">
        Changelogs
      </h1>
      <p className="mb-8 font-normal">
        This app is my take on{" "}
        <Link
          href="https://www.theodinproject.com/lessons/node-path-nodejs-mini-message-board"
          target="__blank"
          className="italic font-medium underline text-white/80 hover:text-white transition-colors"
        >
          The Odin Project’s Node.js Mini Message Board
        </Link>{" "}
        — but it didn’t stop at the first build. Over time, I rebuilt it in
        different stacks to solve real deployment and performance issues.
      </p>
    </header>
  );
}
