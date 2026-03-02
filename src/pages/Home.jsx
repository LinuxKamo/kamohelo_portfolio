import { memo, useEffect, useState } from "react";
import projectsData from "../data/projects.json";
import bgImage from "/backgroud_image.png";
import { ProjectShowcase } from "../components/ui/ProjectShowCase";

function Home() {
  // const projects = projectsData.projects.slice(0, 3);
  const projects = projectsData.projects;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (showDetails) return;

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

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling, showDetails]);
  const onNext = () =>
    setCurrentProjectIndex((prev) =>
      prev < projects.length - 1 ? prev + 1 : prev,
    );
  const onPrev = () =>
    setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : prev));

  const currentProject = projects[currentProjectIndex];
  return (
    <div className="min-h-screen min-w-full bg-[#12100d] text-[#b08d3a">
      {/* Hearder */}
      <div
        className="min-h-[30vh] min-w-full p-5 bg-cover bg-center flex flex-row justify-between text-5xl font-bold px-10 italic"
        style={{
          backgroundImage: `url(${bgImage})`,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* <div className="min-h-full flex flex-col">
          <span className="text-green-800/90 text-stroke-green text-[5rem] md:text-[10rem]">
            Design &
          </span>
          <span className="text-[3rem] md:text-[5rem] -mt-5 md:-mt-10 text-blue-700/90">Innovate</span>
        </div> */}
        {/* <div className="min-h-full flex flex-col text-end">
          <span className="text-blue-600/90 text-stroke-blue text-[5rem]">Problem Solving</span>
          <span className="text-[3rem] -mt-10 text-blue-700/90">Win</span>
        </div> */}
      </div>
      {/* Projects */}
      <div className="relative w-full h-full flex flex-col items-center justify-end px-8">
        <ProjectShowcase
          project={currentProject}
          currentIndex={currentProjectIndex}
          totalProjects={projects.length}
          onNext={onNext}
          onPrev={onPrev}
        />
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-white text-sm opacity-50">
        Scroll to navigate projects
      </div>
    </div>
  );
}

export default memo(Home);
