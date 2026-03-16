import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function ProjectHero({ project }) {
  const combinedTags = [...project.tags, ...project.stack];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden text-white flex items-end pb-20">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-linear-to-t from-[#12100d] via-[#12100d]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          src={project.video}
          className="absolute w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-10">
        {/* Left Side - Title & Description */}
        <div className="max-w-2xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-4"
          >
            {combinedTags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 border border-white/20 backdrop-blur-md bg-white/5 rounded-full text-sm font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Side - Meta Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex flex-row md:flex-col gap-8 md:gap-6 text-sm tracking-wider uppercase"
        >
          <div>
            <p className="text-[#b08d3a] mb-1 text-xs font-bold">Team</p>
            <p className="font-medium text-white/90">{project.teamType}</p>
          </div>
          <div>
            <p className="text-[#b08d3a] mb-1 text-xs font-bold">Date</p>
            <p className="font-medium text-white/90">{project.startDate}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ProjectHero);
