import { memo, useEffect, useState, useCallback } from "react";
import projectsData from "../data/projects.json";
import bgImage from "/backgroud_image.png";
import { ProjectShowcase } from "../components/ui/ProjectShowCase";
import { Sidebar } from "../components/ui/Sidebar";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { AnimatePresence } from "motion/react";

function Home() {
  const projects = projectsData.projects;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    // Optional: Auto-hide after a short delay if video is loaded
    // setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleSkip = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (showDetails || isLoading) return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();

      if (e.deltaY > 0) {
        setCurrentProjectIndex((prev) =>
          prev < projects.length - 1 ? prev + 1 : prev,
        );
      } else {
        setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }

      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling, showDetails, projects.length, isLoading]);

  const onNext = () =>
    setCurrentProjectIndex((prev) =>
      prev < projects.length - 1 ? prev + 1 : prev,
    );
  const onPrev = () =>
    setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : prev));

  const currentProject = projects[currentProjectIndex];

  return (
    <div className="relative min-h-screen w-full bg-[#12100d] text-[#b08d3a] overflow-hidden flex flex-col items-center justify-center">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            onSkip={handleSkip} 
            isVideoLoaded={isVideoLoaded} 
          />
        )}
      </AnimatePresence>

      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 w-full h-full opacity-70 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `url(${currentProject.background || bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Sidebar - Fixed on Right */}
      <Sidebar project={currentProject} />

      {/* Projects Container - Centered */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-12 xl:pr-96 flex flex-col justify-center">
        <ProjectShowcase
          project={currentProject}
          projects={projects}
          currentIndex={currentProjectIndex}
          totalProjects={projects.length}
          onNext={onNext}
          onPrev={onPrev}
          onSelect={(index) => setCurrentProjectIndex(index)}
          onVideoLoad={handleVideoLoad}
        />
      </div>

      {/* Scroll indicator */}
      {/* <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 text-white/50 text-sm tracking-widest uppercase">
        Scroll to navigate
      </div> */}
    </div>
  );
}

export default memo(Home);
