"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

const filters = ["All", "Student Portfolio", "Restaurant", "AI Tool"] as const;

const projects = [
  {
    genre: "Restaurant",
    name: "Solo Pocha",
    url: "https://www.solo-pocha.ca/",
    thumbnail: "/work/solo-pocha.jpg",
  },
  {
    genre: "AI Tool",
    name: "OsanoAI",
    url: "https://osanoai.vercel.app/",
    thumbnail: "/work/osanoai.jpg",
  },
  {
    genre: "Student Portfolio",
    name: "Kasper Leng",
    url: "https://kasperleng.vercel.app/",
    thumbnail: "/work/kasper-leng.jpg",
  },
  {
    genre: "Student Portfolio",
    name: "Eddie Han",
    url: "https://eddiehan.vercel.app/",
    thumbnail: "/work/eddie-han.jpg",
  },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.genre === activeFilter);

  return (
    <section
      id="work"
      data-nav-section="work"
      className="box-border flex h-dvh snap-start snap-always flex-col pt-[calc(var(--nav-offset)+2rem)]"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1120px] flex-1 flex-col px-10 pb-6">
        <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[32px] font-display font-medium leading-[1.2] tracking-[-0.01em] text-black">
              featured projects
            </h2>
          </div>
          <div
            className="flex flex-wrap gap-2 rounded-full p-1 backdrop-blur-md"
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
                  onClick={() => {
                    setShouldAnimate(true);
                    setActiveFilter(filter);
                  }}
                  className={`rounded-full px-[14px] py-[6px] text-[13px] font-medium transition-colors
                    ${isActive
                      ? "bg-black text-white"
                      : "bg-white/40 hover:bg-midnight hover:text-white"
                    }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="work-cards-scroll min-h-0 flex-1">
          <motion.div
            key={activeFilter}
            className="grid w-full grid-cols-2 gap-4 pb-2"
            initial={shouldAnimate ? "hidden" : false}
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
          >
            {visibleProjects.map((project) => (
              <motion.div
                key={project.name}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
                      y: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                    },
                  },
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
