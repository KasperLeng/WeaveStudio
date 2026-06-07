import Image from "next/image";

type ProjectCardProps = {
  genre: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
  dimmed?: boolean;
};

const ProjectCard = ({
  genre,
  name,
  description,
  url,
  thumbnail,
  dimmed = false,
}: ProjectCardProps) => {
  return (
    <article
      className={`overflow-hidden rounded-[12px] border border-mist bg-white shadow-[0_2px_12px_rgba(24,95,165,0.07)] transition-opacity duration-200 ${dimmed ? "pointer-events-none opacity-20" : ""
        }`}
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-[12px]">
        <Image src={thumbnail} alt={name} fill className="object-cover object-top"
        />
      </div>
      <div className="p-5">
        <span className="mb-2.5 inline-block rounded-full bg-frost px-[10px] py-[4px] text-[11px] font-medium uppercase tracking-[0.08em] text-anchor">
          {genre}
        </span>
        <h3 className="mb-1.5 text-[18px] font-medium text-midnight">{name}</h3>
        <p className="mb-4 text-[13px] leading-[1.6] text-slate">
          {description}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium text-anchor no-underline hover:text-clarity hover:underline"
        >
          View Site →
        </a>
      </div>
    </article>
  );
};
export default ProjectCard;
