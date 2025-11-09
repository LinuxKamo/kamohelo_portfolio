import { memo } from "react";
import cineby from "../assets/Cineby.png";
import BookStrore from "../assets/bookStore.png";
import BookStroreBeta from "../assets/bookStore(beta).png"
import Melula from "../assets/Melula.png"
import TaskMananger from "../assets/TaskMananger.png"
import ReciepFinder from "../assets/ReciepFinder.png"
import ReciepFinderBeta from "../assets/ReciepFinder(beta).png"

function Projects() {
  const projects = [
    {
      title: "Melula Website Recreate",
      description: "Recreated the Melula homepage with modern UI/UX.",
      image: Melula,
      betaImage: "",
      link: "https://melula.onrender.com/",
      beta: "#"
    },
    {
      title: "Recipe Finder",
      description: "Find and save your favorite recipes in one place.",
      image: ReciepFinder,
      betaImage:ReciepFinderBeta,
      link: "https://recipe-finder-cruj.vercel.app/",
      beta: "https://recipe-finder-b2ik.onrender.com/"
    },
    {
      title: "Cineby",
      description: "A movie streaming website to watch your favorite films.",
      image: cineby,
      betaImage: "",
      link: "https://cineby-eb29.vercel.app/",
      beta: "#"
    },
    {
      title: "Book Store",
      description: "E-commerce platform to buy and sell books easily.",
      image: BookStrore,
      betaImage: BookStroreBeta,
      link: "https://bookstore-11-mth5.onrender.com/",
      beta: "https://bookstore-frontend-test-3imh.onrender.com/"
    },
    {
      title: "Task Management App",
      description: "Add, edit, and delete tasks with a simple interface.",
      image: TaskMananger,
      betaImage: "",
      link: "https://task-managment-pi-nine.vercel.app/",
      beta: "#"
    },
  ];

  return (
    <div id="projects" className="max-w-7xl mx-auto px-6 py-20 relative">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white even:bg-amber-50 rounded-3xl shadow-xl overflow-hidden hover:-translate-y-3 hover:shadow-2xl transition-transform duration-300 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 md:h-48 object-cover"
              />
              {project.betaImage && (
                <img
                  src={project.betaImage}
                  alt={`${project.title} Beta`}
                  className="absolute top-0 left-0 w-full h-56 md:h-48 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
              <p className="text-gray-700 text-sm md:text-base">{project.description}</p>
              <div className="flex gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.link}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition transform hover:-translate-y-1 hover:scale-105"
                >
                  View Project
                </a>
                {project.beta !== "#" && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.beta}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition transform hover:-translate-y-1 hover:scale-105"
                  >
                    Beta
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Projects);