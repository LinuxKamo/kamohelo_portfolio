import { memo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import cineby from "../assets/Cineby.png";
import BookStore from "../assets/bookStore.png";
import BookStoreBeta from "../assets/BookStore_beta.png";
import Melula from "../assets/Melula.png";
import TaskManager from "../assets/TaskMananger.png";
import RecipeFinder from "../assets/ReciepFinder.png";
import RecipeFinderBeta from "../assets/ReciepFinder_beta.png";

function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Melula Website Recreate",
      description: "Recreated the Melula homepage with modern UI/UX.",
      image: Melula,
      betaImage: "",
      link: "https://melula.onrender.com/",
      beta: "#",
      stack: "React",
    },
    {
      title: "Recipe Finder",
      description: "Find and save your favorite recipes in one place.",
      image: RecipeFinder,
      betaImage: RecipeFinderBeta,
      link: "https://recipe-finder-cruj.vercel.app/",
      beta: "https://recipe-finder-b2ik.onrender.com/",
      stack: "React",
    },
    {
      title: "Cineby",
      description: "A movie streaming website to watch your favorite films.",
      image: cineby,
      betaImage: "",
      link: "https://cineby-eb29.vercel.app/",
      beta: "#",
      stack: "React",
    },
    {
      title: "Book Store",
      description: "E-commerce platform to buy and sell books easily.",
      image: BookStore,
      betaImage: BookStoreBeta,
      link: "https://bookstore-11-mth5.onrender.com/",
      beta: "https://bookstore-frontend-test-3imh.onrender.com/",
      stack: "React",
    },
    {
      title: "Task Management App",
      description: "Add, edit, and delete tasks with a simple interface.",
      image: TaskManager,
      betaImage: "",
      link: "https://task-managment-pi-nine.vercel.app/",
      beta: "#",
      stack: "C#",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.stack === filter);

  return (
    <div
      id="projects"
      className="max-w-7xl mx-auto px-6 py-24 relative font-sans"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center text-gray-900">
        My <span className="text-amber-600">Projects</span>
      </h2>

      {/* Filter Bar */}
      <div className="flex justify-center mb-10 space-x-4">
        {["All", "React", "C#"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold text-sm md:text-base transition ${
              filter === cat
                ? "bg-amber-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              y: -8,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-white/70 backdrop-blur-sm border border-gray-200 hover:border-amber-300 rounded-3xl shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
              />
              {project.betaImage && (
                <img
                  src={project.betaImage}
                  alt={`${project.title} Beta`}
                  className="absolute top-0 left-0 w-full h-56 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
                {project.stack}
              </span>
            </div>

            {/* Project Info */}
            <div className="flex flex-col h-30 pt-6 px-6 space-y-3">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-700">
                {project.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-2xl w-[90%] relative shadow-2xl"
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-4 font-extrabold text-red-500 hover:text-red-300 text-2xl text-shadow-red-40"
              >
                ✕
              </button>

              {/* Popup Content */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl mb-5"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-gray-700 mb-5 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="flex space-x-3">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                >
                  View Project
                </a>
                {selectedProject.beta !== "#" && (
                  <a
                    href={selectedProject.beta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Beta
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Projects);
