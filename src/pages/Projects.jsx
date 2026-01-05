import { memo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ui/ProjectCard";
import projectsData from "../data/projects.json";

function Projects() {
  const projects = projectsData.projects;

  // Animation variants for fade-in
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // each card fades in with delay
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="overflow-y-auto text-[#b08d3a] py-2">
      {/* Page Title */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-serif text-[#e0c068] mb-4">
          My Projects
        </h1>
        <p className="text-[#b08d3a] text-lg md:text-xl max-w-2xl mx-auto">
          Here is a collection of projects I’ve worked on. Each one reflects
          my skills in web design, UI/UX, and modern front-end development.
        </p>
      </section>

      {/* Projects Grid */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-3 px-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={cardVariants}>
            <ProjectCard
              title={project.title}
              description={project.description}
              tag={project.tag}
              image={project.image}
              link={project.link}
            />
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

export default memo(Projects);
