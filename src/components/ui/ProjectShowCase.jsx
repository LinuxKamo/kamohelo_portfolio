import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { TO_PROJECT } from "../../data/Page";

export function ProjectShowcase({
  project,
  currentIndex,
  totalProjects,
  onNext,onPrev
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
    <div className="w-full mx-auto px-4 sm:px-6 text-[#b08d3a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
        <div className="flex items-baseline gap-3">
          <span className="text-xs uppercase tracking-wider opacity-70">
            Project
          </span>
          <span className="text-5xl sm:text-7xl font-light">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-xl md:text-3xl text-center font-light">
          {project.name}
        </h3>

        <div className="hidden sm:flex items-baseline gap-3">
          <span className="text-xs uppercase tracking-wider opacity-70">
            Start
          </span>
          <span className="text-lg">{project.startDate}</span>
        </div>
      </div>

      {/* Showcase */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          {/* Left thumbnail (hide on mobile) */}
          <div className="hidden lg:block w-74 h-78 rounded-lg overflow-hidden border border-[#b08d3a]/20">
            <img
              src={project.thumbnails[0]}
              alt="Thumbnail left"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center video */}
          <div className="relative w-full sm:w-[80vw] md:w-[600px] h-72 sm:h-80 md:h-106 rounded-xl overflow-hidden border-4 border-[#b08d3a]/40 shadow-2xl group">
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
              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all"
            >
              <div className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition">
                <Play className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest">
                  View Details
                </span>
              </div>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1.5 rounded-full">
              <span className="text-xs uppercase tracking-widest text-[#b08d3a]">
                Video Demo
              </span>
            </div>
          </div>

          {/* Right thumbnail (hide on mobile) */}
          <div className="hidden lg:block w-74 h-78 rounded-lg overflow-hidden border border-white/20">
            <img
              src={project.thumbnails[1]}
              alt="Thumbnail right"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile thumbnails */}
        <div className="flex lg:hidden justify-center gap-4 mt-6">
          {project.thumbnails.slice(0, 2).map((img, i) => (
            <div
              key={i}
              className="w-32 h-20 rounded-md overflow-hidden border border-white/20"
            >
              <img
                src={img}
                alt={`Thumbnail ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation + Progress */}
      <div className="flex items-center justify-between mt-12">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 hover:text-white transition"
        >
          <ChevronLeft />
          <span className="hidden sm:inline uppercase text-xs tracking-wider">
            Prev
          </span>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalProjects }).map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all ${
                index === currentIndex ? "w-12 bg-[#6aa84f]" : "w-6 bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 hover:text-white transition"
        >
          <span className="hidden sm:inline uppercase text-xs tracking-wider">
            Next
          </span>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
