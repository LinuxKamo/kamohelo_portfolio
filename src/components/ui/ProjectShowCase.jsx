import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { TO_PROJECT } from "../../data/Page";

export function ProjectShowcase({
  project,
  projects = [],
  currentIndex,
  totalProjects,
  onNext,
  onPrev,
  onSelect,
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-8 md:mb-12">
        <div className="flex items-baseline gap-3">
          <span className="text-xs uppercase tracking-wider opacity-70 font-semibold">
            Project
          </span>
          <span className="text-5xl sm:text-7xl font-light tracking-tight">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold tracking-tight text-white">
          {project.name}
        </h3>

        <div className="hidden sm:flex items-baseline gap-3">
          <span className="text-xs uppercase tracking-wider opacity-70 font-semibold">
            Start
          </span>
          <span className="text-xl font-light text-white">
            {project.startDate}
          </span>
        </div>
      </div>

      {/* Showcase */}
      <div className="relative mt-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Left thumbnail (hide on mobile) */}
          <button
            onClick={onPrev}
            className="hidden lg:block w-72 h-80 rounded-2xl overflow-hidden border border-[#b08d3a]/20 shadow-xl opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-105 active:scale-95 group"
          >
            <div className="relative w-full h-full">
              <img
                src={
                  projects[(currentIndex - 1 + totalProjects) % totalProjects]
                    ?.background
                }
                alt="Previous project"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
            </div>
          </button>

          {/* Center video */}
          <div className="relative w-full sm:w-[85vw] md:w-[650px] lg:w-[700px] h-[40vh] sm:h-[50vh] md:h-[60vh] max-h-[600px] rounded-3xl overflow-hidden border-4 border-[#b08d3a]/30 shadow-2xl group transition-all duration-500 hover:border-[#b08d3a]/60 hover:shadow-[0_0_40px_rgba(176,141,58,0.2)]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            >
              <source src={project.video} type="video/mp4" />
            </video>

            {/* Overlay */}
            <button
              onClick={() => navigate(TO_PROJECT(currentIndex + 1))}
              className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 bg-white/95 text-black px-8 py-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                <Play className="w-5 h-5 fill-black" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  View Case Study
                </span>
              </div>
            </button>

            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#b08d3a]">
                Live Preview
              </span>
            </div>
          </div>

          {/* Right thumbnail (hide on mobile) */}
          <button
            onClick={onNext}
            className="hidden lg:block w-72 h-80 rounded-2xl overflow-hidden border border-[#b08d3a]/20 shadow-xl opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-105 active:scale-95 group"
          >
            <div className="relative w-full h-full">
              <img
                src={
                  projects[(currentIndex + 1) % totalProjects]?.thumbnails[0]
                }
                alt="Next project"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
            </div>
          </button>
        </div>

        {/* Mobile thumbnails */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <button
            onClick={onPrev}
            className="w-32 h-20 rounded-xl overflow-hidden border border-white/10 shadow-lg opacity-80 active:scale-95 transition-all"
          >
            <img
              src={
                projects[(currentIndex - 1 + totalProjects) % totalProjects]
                  ?.thumbnails[0]
              }
              alt="Prev Project"
              className="w-full h-full object-cover"
            />
          </button>
          <button
            onClick={onNext}
            className="w-32 h-20 rounded-xl overflow-hidden border border-white/10 shadow-lg opacity-80 active:scale-95 transition-all"
          >
            <img
              src={projects[(currentIndex + 1) % totalProjects]?.thumbnails[0]}
              alt="Next Project"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Navigation + Progress */}
      <div className="flex items-center justify-between mt-16 lg:mt-20">
        <button
          onClick={onPrev}
          className="flex items-center gap-3 text-white/50 hover:text-[#b08d3a] transition-colors group"
        >
          <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#b08d3a]/10 group-hover:border-[#b08d3a]/30 transition-all">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="hidden sm:inline uppercase text-sm font-bold tracking-widest">
            Prev
          </span>
        </button>

        <div className="flex gap-2.5">
          {Array.from({ length: totalProjects }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-16 bg-linear-to-r from-[#b08d3a] to-[#d6ad4d]"
                  : "w-6 bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-3 text-white/50 hover:text-[#b08d3a] transition-colors group"
        >
          <span className="hidden sm:inline uppercase text-sm font-bold tracking-widest">
            Next
          </span>
          <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#b08d3a]/10 group-hover:border-[#b08d3a]/30 transition-all">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}
