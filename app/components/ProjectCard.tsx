import Image from "next/image";

type ProjectCardProps = {
  genre: string;
  name: string;
  url: string;
  thumbnail: string;
};

const ProjectCard = ({
  genre,
  name,
  url,
  thumbnail,
}: ProjectCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[12px] shadow-[0_2px_12px_rgba(24,95,165,0.07)] transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(24,95,165,0.12)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/20">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 1024px) 50vw, 512px"
        />
      </div>
      <div className="flex items-center justify-between gap-3 bg-white/40 px-3.5 py-2.5">
        <h3 className="text-[14px] font-medium text-black">{name}</h3>
        <span className="shrink-0 rounded-full bg-frost px-[10px] py-[4px] text-[11px] font-medium uppercase tracking-[0.08em] text-anchor">
          {genre}
        </span>
      </div>
    </a>
  );
};
export default ProjectCard;
