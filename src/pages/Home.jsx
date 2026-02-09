import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "../components/ui/ProjectCard";
import me from "../assets/me.jpg";
import projectsData from "../data/projects.json";
import { Link, useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/Page";
import { ArrowRight } from "lucide-react";

function Home() {
  const projects = projectsData.projects.slice(0, 3);
  const [activeProject, setActiveProject] = useState(projects[0]);
  const navigate = useNavigate();

  // Variants for fade-in
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="flex flex-col space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero / Introduction */}
      <motion.section
        className="mb-16 flex flex-col md:flex-row items-center md:items-start gap-10"
        variants={fadeUp}
      >
        {/* Image */}
        <motion.div className="shrink-0" variants={fadeUp}>
          <img
            src={me}
            alt="Kamohelo Motaung"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[#e0c068] shadow-xl object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div className="max-w-xl" variants={fadeUp}>
          <h1 className="text-5xl md:text-6xl font-serif text-[#e0c068] mb-4 leading-tight">
            Hi, I'm <span className="text-[#f2d376]">Kamohelo</span>
          </h1>
          <p className="text-[#b08d3a] text-lg md:text-xl">
            I build beautiful websites and digital experiences for brands and
            individuals. Welcome to my portfolio. I specialize in clean, modern,
            and functional design that stands out.
          </p>

          {/* Optional CTA */}
          <motion.button
            className="mt-6 bg-[#6aa84f]/20 hover:bg-[#6aa84f]/40 text-[#e0c068] font-semibold px-6 py-3 rounded-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeUp}
            onClick={() => navigate(PROJECTS)}
          >
            See All My Work
          </motion.button>
        </motion.div>
      </motion.section>

      <motion.section className="flex flex-col min-w-full">
        <motion.div className="flex flex-col md:flex-row justify-between items-center md:items-start sm:items-center w-full mb-6 text-[#e0c068]">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold font-serif tracking-tight ">
              Featured Projects
            </h1>
            <h4 className="text-sm sm:text-lg text-[#b08d3a] font-semibold">
              My most recent and top work
            </h4>
          </div>

          <Link
            to={PROJECTS}
            className=" ml-auto md:ml-0 flex flex-row space-x-2 sm:space-x-3 items-center mt-3 sm:mt-0 font-semibold text-[#6aa84f] hover:text-[#557248] text-sm sm:text-base"
          >
            <span className="line-clamp-1 ">View all</span>
            <ArrowRight className="size-4 sm:size-5" />
          </Link>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-[60%_38%] gap-10">
          <div className="flex flex-col justify-between space-y-5">
            {projects.map((project, _i) => (
              <motion.div
                key={_i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveProject(project)}
                className="rounded-xl border-l-4 border-[#6aa84f] bg-[#1f1b14]/90 p-4 shadow-lg cursor-pointer"
              >
                <h4 className="text-lg mb-1 text-[#e0c068]">{project.title}</h4>
                <p className="text-xs text-[#b08d3a] line-clamp-2 font-sans">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
          {/* CENTER: Active project card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title} // triggers AnimatePresence on project change
              initial={{ rotateY: 180, opacity: 0 }} // start flipped
              animate={{ rotateY: 0, opacity: 1 }} // flip into view
              exit={{ rotateY: -180, opacity: 0 }} // flip out
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="perspective-1000" // required for 3D flip effect
            >
              <ProjectCard
                title={activeProject.title}
                image={activeProject.image}
                description={activeProject.description}
                tag={activeProject.tag}
                link={activeProject.link}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Contact / Call to Action */}
      <motion.section className="mb-16" variants={fadeUp}>
        <h2 className="text-3xl font-serif text-[#e0c068] mb-4">
          Get In Touch
        </h2>
        <p className="text-[#b08d3a] mb-6 max-w-lg">
          Whether you want to collaborate, hire me, or just say hi, feel free to
          reach out.
        </p>
        <motion.button
          className="bg-[#6aa84f]/20 hover:bg-[#6aa84f]/40 text-[#e0c068] font-semibold px-6 py-3 rounded-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.button>
      </motion.section>
    </motion.div>
  );
}

export default memo(Home);
