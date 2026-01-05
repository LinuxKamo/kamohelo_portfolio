import { memo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ui/ProjectCard";
import me from "../assets/me.jpg";
import projectsData from "../data/projects.json";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/Page";

function Home() {
  const projects = projectsData.projects.slice(0, 3);
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
      className="overflow-y-auto"
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
            individuals. Welcome to my portfolio. I specialize in clean,
            modern, and functional design that stands out.
          </p>

          {/* Optional CTA */}
          <motion.button
            className="mt-6 bg-[#6aa84f]/20 hover:bg-[#6aa84f]/40 text-[#e0c068] font-semibold px-6 py-3 rounded-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeUp}
            onClick={()=>navigate(PROJECTS)}
          >
            See All My Work
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Projects / Highlights */}
      <motion.section
        className="mb-16 flex flex-col space-y-5 w-full"
        variants={fadeUp}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeUp}>
              <ProjectCard
                description={project.description}
                image={project.image}
                tag={project.tag}
                title={project.title}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="text-2xl font-serif text-[#e0c068] font-bold bg-amber-500/10 tracking-wider rounded-lg px-4 py-2 mt-8 hover:bg-amber-500/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={fadeUp}
          onClick={()=>navigate(PROJECTS)}
        >
          More of my work
        </motion.button>
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
