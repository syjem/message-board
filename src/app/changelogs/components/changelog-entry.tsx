import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ChangelogEntryProps } from "@/types/changelogs";
import React from "react";

export function ChangelogEntry({
  date,
  title,
  description,
  repo,
  preview,
  tech,
  isLatest,
}: ChangelogEntryProps) {
  return (
    <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8">
      {/* Timeline dot */}
      <div className="relative z-50 flex items-center">
        <div
          className={`w-4 h-4 rounded-full border-2 hidden md:block ${
            isLatest
              ? "bg-purple-600 border-border"
              : "bg-gray-700 border-border"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="text-sm mb-4 text-white font-mono">{date}</div>

        <Card className="bg-gray-700/10 border-gray-700">
          {/* Card content */}
          <div className="px-6">
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
          </div>

          <div className="px-6 flex flex-wrap items-center gap-2 text-white/80">
            Tech: [
            {tech.map((item, index) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {index !== tech.length - 1 && <span>-</span>}
              </React.Fragment>
            ))}
            ]
          </div>

          <div className="px-6 text-white/80 text-sm flex flex-wrap items-center gap-4">
            <Link
              target="__blank"
              href={repo}
              className="underline hover:no-underline hover:text-purple-500"
            >
              View GitHub
            </Link>
            {preview && (
              <Link
                target="__blank"
                href={preview}
                className="underline hover:no-underline hover:text-purple-500"
              >
                Preview
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
