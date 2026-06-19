import { memo, useEffect, useState, useCallback } from "react";
import projectsData from "../data/projects.json";
import { ProjectShowcase } from "../components/ui/ProjectShowCase";
import { Sidebar } from "../components/ui/Sidebar";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { AnimatePresence } from "motion/react";
import { ParticlesBackground } from "../components/ui/ParticlesBackground";

const ambientColors = [
  { primary: "rgba(176, 141, 58, 0.15)", secondary: "rgba(250, 204, 21, 0.08)" }, // Gold
  { primary: "rgba(59, 130, 246, 0.15)", secondary: "rgba(96, 165, 250, 0.08)" }, // Blue
  { primary: "rgba(16, 185, 129, 0.15)", secondary: "rgba(52, 211, 153, 0.08)" }, // Green
  { primary: "rgba(244, 63, 94, 0.15)", secondary: "rgba(251, 113, 133, 0.08)" }, // Rose
  { primary: "rgba(168, 85, 247, 0.15)", secondary: "rgba(192, 132, 252, 0.08)" }, // Purple
];

function Home() {
  const projects = projectsData.projects;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem("currentProjectIndex");
    const parsed = savedIndex !== null ? parseInt(savedIndex, 10) : 0;
    return parsed >= 0 && parsed < projects.length ? parsed : 0;
  });
  const [direction, setDirection] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(() => {
    return sessionStorage.getItem("hasVisited") !== "true";
  });

  useEffect(() => {
    sessionStorage.setItem("currentProjectIndex", currentProjectIndex);
  }, [currentProjectIndex]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    // Optional: Auto-hide after a short delay if video is loaded
    // setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleSkip = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasVisited", "true");
  };

  useEffect(() => {
    if (showDetails || isLoading) return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();

      if (e.deltaY > 0) {
        if (currentProjectIndex < projects.length - 1) {
          setDirection(1);
          setCurrentProjectIndex((prev) => prev + 1);
        }
      } else {
        if (currentProjectIndex > 0) {
          setDirection(-1);
          setCurrentProjectIndex((prev) => prev - 1);
        }
      }

      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling, showDetails, projects.length, isLoading]);

  const onNext = () => {
    if (currentProjectIndex < projects.length - 1) {
      setDirection(1);
      setCurrentProjectIndex((prev) => prev + 1);
    }
  };
  const onPrev = () => {
    if (currentProjectIndex > 0) {
      setDirection(-1);
      setCurrentProjectIndex((prev) => prev - 1);
    }
  };

  const currentProject = projects[currentProjectIndex] || projects[0];

  useEffect(() => {
    if (!projects[currentProjectIndex]) {
      setCurrentProjectIndex(0);
    }
  }, [currentProjectIndex, projects]);

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

      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {ambientColors.map((colors, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentProjectIndex % ambientColors.length ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full mix-blend-screen filter blur-[120px]"
              style={{ backgroundColor: colors.primary }}
            />
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[100px]"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
        ))}
      </div>

      <ParticlesBackground projectIndex={currentProjectIndex} />


      {/* Sidebar - Fixed on Right */}
      <Sidebar project={currentProject} />

      {/* Projects Container - Centered */}
      <div className="relative z-10 w-full mx-auto px-6 md:px-12 xl:pr-96 flex flex-col justify-center">
        <ProjectShowcase
          project={currentProject}
          projects={projects}
          currentIndex={currentProjectIndex}
          direction={direction}
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
