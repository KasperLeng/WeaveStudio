"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

const filters = ["All", "Student Portfolio", "Restaurant", "AI Tool"] as const;

const projects = [
  {
    genre: "Student Portfolio",
    name: "Kasper Leng",
    description:
      "Personal portfolio for a design student — clean layout with project showcases.",
    url: "https://kasperleng.vercel.app/",
    thumbnail: "/work/kasper-leng.jpg",
  },
  {
    genre: "Student Portfolio",
    name: "Eddie Han",
    description:
      "CS student portfolio for Eddie Han at UBC — blends logic with creative design.",
    url: "https://eddiehan.vercel.app/",
    thumbnail: "/work/eddie-han.jpg",
  },
  {
    genre: "Restaurant",
    name: "Solo Pocha",
    description:
      "Restaurant site for a Korean street food & late-night drinks bar in Vancouver.",
    url: "https://www.solo-pocha.ca/",
    thumbnail: "/work/solo-pocha.jpg",
  },
  {
    genre: "AI Tool",
    name: "OsanoAI",
    description:
      "Marketing site for a multi-agent AI runtime dashboard platform.",
    url: "https://osanoai.vercel.app/",
    thumbnail: "/work/osanoai.jpg",
  },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <section id="work" data-nav-section="work" className="scroll-mt-20">
      <div className="mx-auto max-w-[1120px] px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-clarity">
              Featured Work
            </p>
            <h2 className="text-[32px] font-medium leading-[1.2] tracking-[-0.01em] text-black">
              Our Projects
            </h2>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects"
          >
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-[14px] py-[6px] text-[13px] font-medium transition-colors ${isActive
                    ? "border-none bg-anchor text-white"
                    : "border border-mist text-midnight hover:border-clarity hover:text-anchor"
                    }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              {...project}
              dimmed={activeFilter !== "All" && activeFilter !== project.genre}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
