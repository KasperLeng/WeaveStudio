import type { ReactNode } from "react";

type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  body: string;
  tags: string[];
};

export default function ServiceCard({ icon, title, body, tags }: ServiceCardProps) {
  return (
    <article className="rounded-[12px] border border-mist bg-white p-6">
      <div className="mb-3 text-anchor" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mb-2 text-[17px] font-medium text-midnight">{title}</h3>
      <p className="mb-3 text-[14px] leading-[1.6] text-slate">{body}</p>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="m-0.5 rounded-full bg-frost px-[10px] py-[4px] text-[11px] text-anchor"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
