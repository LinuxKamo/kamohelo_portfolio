import { memo } from "react";
import { Link } from "react-router-dom";

function ProjectCard({ title, image, description, tag, link }) {
  return (
    <Link
      to={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
    >
      <div
        className="
          bg-[#1f1b14]
          rounded-2xl
          shadow-xl
          overflow-hidden
          hover:scale-105
          transition-all
          duration-300
          cursor-pointer
        "
      >
        <img src={image} alt={title} className="w-full h-40 object-cover" />

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-[#e0c068] mb-2">
            {title}
          </h2>

          <p className="text-[#b08d3a] mb-3">{description}</p>

          <span className="text-[#6aa84f] font-semibold uppercase text-xs tracking-wider">
            {tag}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProjectCard);
