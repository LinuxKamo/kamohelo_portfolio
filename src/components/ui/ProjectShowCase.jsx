import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { TO_PROJECT } from "../../data/Page";
import { motion, AnimatePresence } from "motion/react";


export function ProjectShowcase({
  project,
  projects = [],
  currentIndex,
  totalProjects,
  onNext,
  onPrev,
  onVideoLoad,
}) {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [project.id]);



  return (
    <div className="w-full text-[#b08d3a]">
      {/* Header */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`header-${project.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center sm:justify-between w-full gap-4 sm:gap-6 mb-8 md:mb-16 relative z-20"
        >
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-bold">
              Project
            </span>
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-xl sm:text-2xl font-light text-[#b08d3a]">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="text-sm text-white/30 ml-1">/ {String(totalProjects).padStart(2, "0")}</span>
            </span>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-[#b08d3a]/0 via-[#b08d3a]/10 to-[#b08d3a]/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold tracking-tighter text-white px-4 drop-shadow-2xl">
              {project.name}
            </h3>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-bold">
              Timeline
            </span>
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-sm font-medium text-white">
              {project.startDate}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Showcase */}
      <div className="relative mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Left thumbnail (hide on mobile) */}
          <button
            onClick={onPrev}
            className="hidden lg:block w-72 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] opacity-40 hover:opacity-100 transition-all duration-700 hover:-translate-x-2 active:scale-95 group relative ring-1 ring-white/5"
          >
            <motion.div
              key={`project-${projects[(currentIndex - 1 + totalProjects) % totalProjects]?.id}`}
              layoutId={`project-${projects[(currentIndex - 1 + totalProjects) % totalProjects]?.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full bg-black/50"
            >
              <img
                src={
                  projects[(currentIndex - 1 + totalProjects) % totalProjects]
                    ?.background
                }
                alt="Previous project"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 text-left transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span className="text-[10px] uppercase tracking-widest text-[#b08d3a] font-bold block mb-1">Previous</span>
                <span className="text-white font-medium truncate w-48 block drop-shadow-md">
                  {projects[(currentIndex - 1 + totalProjects) % totalProjects]?.name || "Project"}
                </span>
              </div>
            </motion.div>
          </button>

          {/* Center video */}
          <div className="relative w-full sm:w-[85vw] md:w-[650px] lg:w-[700px] h-[45vh] sm:h-[50vh] md:h-[60vh] max-h-[600px] shrink-0 group">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[#b08d3a]/20 blur-[80px] rounded-full opacity-50 mix-blend-screen pointer-events-none group-hover:opacity-80 transition-opacity duration-700" />
            
            <motion.div
              key={`project-${project.id}`}
              layoutId={`project-${project.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full rounded-4xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 bg-black/50 backdrop-blur-sm ring-1 ring-white/5"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <video
                ref={videoRef}
                className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-700 ease-out"
                loop
                muted
                playsInline
                onCanPlayThrough={onVideoLoad}
              >
                <source src={project.video} type="video/mp4" />
              </video>

              {/* Overlay */}
              <button
                onClick={() => navigate(TO_PROJECT(currentIndex + 1))}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-500 z-20"
              >
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:scale-105">
                  <Play className="w-5 h-5 fill-white" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    View Case Study
                  </span>
                </div>
              </button>

              <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-[#b08d3a] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                  Live Preview
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right thumbnail (hide on mobile) */}
          <button
            onClick={onNext}
            className="hidden lg:block w-72 h-80 rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] opacity-40 hover:opacity-100 transition-all duration-700 hover:translate-x-2 active:scale-95 group relative ring-1 ring-white/5"
          >
            <motion.div
              key={`project-${projects[(currentIndex + 1) % totalProjects]?.id}`}
              layoutId={`project-${projects[(currentIndex + 1) % totalProjects]?.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 w-full h-full bg-black/50"
            >
              <img
                src={projects[(currentIndex + 1) % totalProjects]?.thumbnails[0]}
                alt="Next project"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-l from-black/80 to-transparent group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
              
              <div className="absolute bottom-6 right-6 text-right transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span className="text-[10px] uppercase tracking-widest text-[#b08d3a] font-bold block mb-1">Next</span>
                <span className="text-white font-medium truncate w-48 block drop-shadow-md">
                  {projects[(currentIndex + 1) % totalProjects]?.name || "Project"}
                </span>
              </div>
            </motion.div>
          </button>
        </div>

        {/* Mobile thumbnails */}
        <div className="flex lg:hidden justify-center gap-4 sm:gap-6 mt-8">
          <button
            onClick={onPrev}
            className="w-32 h-20 sm:w-40 sm:h-24 rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] opacity-70 active:scale-95 transition-all relative ring-1 ring-white/5"
          >
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
            <AnimatePresence>
              <motion.img
                key={`prev-mob-${project.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={
                  projects[(currentIndex - 1 + totalProjects) % totalProjects]
                    ?.thumbnails[0]
                }
                alt="Prev Project"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-2 left-2 z-20">
              <ChevronLeft className="w-4 h-4 text-white drop-shadow-md" />
            </div>
          </button>
          <button
            onClick={onNext}
            className="w-32 h-20 sm:w-40 sm:h-24 rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] opacity-70 active:scale-95 transition-all relative ring-1 ring-white/5"
          >
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
            <AnimatePresence>
              <motion.img
                key={`next-mob-${project.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={projects[(currentIndex + 1) % totalProjects]?.thumbnails[0]}
                alt="Next Project"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-2 right-2 z-20">
              <ChevronRight className="w-4 h-4 text-white drop-shadow-md" />
            </div>
          </button>
        </div>
      </div>

      {/* Navigation + Progress */}
      <div className="flex items-center justify-between mt-12 lg:mt-24 relative z-20 px-2 sm:px-6">
        <button
          onClick={onPrev}
          className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group"
        >
          <div className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </div>
          <span className="hidden sm:inline uppercase text-xs font-bold tracking-widest transition-colors duration-300">
            Previous
          </span>
        </button>

        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 shadow-lg">
          {Array.from({ length: totalProjects }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                index === currentIndex
                  ? "w-12 sm:w-16 bg-[#b08d3a] shadow-[0_0_10px_rgba(176,141,58,0.5)]"
                  : "w-4 sm:w-6 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-4 text-white/50 hover:text-white transition-colors group"
        >
          <span className="hidden sm:inline uppercase text-xs font-bold tracking-widest transition-colors duration-300">
            Next Project
          </span>
          <div className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </div>
  );
}
