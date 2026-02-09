import { memo } from "react";
import { motion } from "framer-motion";
import technologies from "../data/technologies.json";

function Technologies() {
  const technology = technologies.technologies;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="text-[#b08d3a]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <section className="mb-16 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-serif text-[#e0c068] mb-4"
          variants={cardVariants}
        >
          Technologies I Use
        </motion.h1>
        <motion.p
          className="text-[#b08d3a] text-lg md:text-xl max-w-2xl mx-auto"
          variants={cardVariants}
        >
          These are the programming languages, frameworks, and styling tools I
          work with. Each plays a key role in my projects depending on the
          application and purpose.
        </motion.p>
      </section>

      {/* Technology Cards */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5"
        variants={containerVariants}
      >
        {technology.map((tech) => (
          <motion.div
            key={tech.name}
            className="bg-[#1f1b14] rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300 flex flex-col"
            variants={cardVariants}
          >
            <h2
              className="text-2xl font-semibold mb-2"
              style={{ color: tech.color }}
            >
              {tech.name}
            </h2>
            <span className="uppercase text-xs tracking-wider mb-2 block">
              {tech.type} • {tech.importance} importance
            </span>
            <p className="text-[#b08d3a] mb-2">{tech.description}</p>
            <p className="text-[#6aa84f] font-semibold text-sm mt-auto">
              Most used in: {tech.usage}
            </p>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
}

export default memo(Technologies);
