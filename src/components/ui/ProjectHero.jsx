import { memo } from "react";

function ProjectHero({ project }) {
  const combinedTags = [...project.tags, ...project.stack];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        controls={true}
        src={project.video}
        className="absolute w-full h-full object-cover brightness-70"
      />
      {/* TOP LEFT - Tags */}
      <div className="absolute bottom-30 md:bottom-10 md:left-1/2 md:transform md:-translate-x-1/2 place-self-center grid grid-cols-2 md:grid-cols-4 gap-4">
        {combinedTags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 border border-white/40 backdrop-blur-md bg-white/10 rounded-md text-sm text-center"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* TOP RIGHT - Title & Description */}
      <div className="absolute top-10 left-10 max-w-md space-y-3">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <p className="text-white/80 text-sm">{project.description}</p>
      </div>

      {/* BOTTOM LEFT - Team */}
      <div className="absolute bottom-20 left-10">
        <p className="text-sm text-white/80">Team: {project.teamType}</p>
      </div>

      {/* BOTTOM RIGHT - Start Date */}
      <div className="absolute bottom-20 right-10 text-right">
        <p className="text-sm text-white/80">Start Date: {project.startDate}</p>
      </div>
    </section>
  );
}

export default memo(ProjectHero);
