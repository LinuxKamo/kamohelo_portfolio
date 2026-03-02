import { memo } from "react";
import projectsData from "../data/projects.json";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { HOME, TO_PROJECT } from "../data/Page";
import ProjectHero from "../components/ui/ProjectHero";

function Projects() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = Number(id);
  const project = projectsData.projects.find((proj) => proj.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Project not found</p>
      </div>
    );
  }

  // Image fallbacks (desktop, tablet, mobile)
  const desktopImg = project.thumbnails?.[0];
  const tabletImg = project.thumbnails?.[1] ?? desktopImg;
  const mobileImg = project.thumbnails?.[2] ?? desktopImg;

  const onNext = () => {
    const nextId =
      projectId + 1 > projectsData.projects.length ? 1 : projectId + 1;
    navigate(TO_PROJECT(nextId));
  };

  const onBack = () => {
    navigate(HOME);
  };

  return (
    <div className="w-full bg-[#12100d] text-[#b08d3a]">
      {/* Header */}
      <div className="sticky top-0 backdrop-blur-md border-b border-[#b08d3a]/40 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-[#d6ad4d] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Projects</span>
          </button>
        </div>
      </div>
      <ProjectHero project={project} />

      <div className="mx-auto px-10 py-10 flex flex-col space-y-10">
        {/* Device Mockups */}
        <div className="min-h-screen space-y-5 flex flex-col items-center justify-center">
          <h2 className="text-3xl text-center mb-12 tracking-tight">
            Multi-Platform Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            {/* Mobile */}
            <div className="flex flex-col items-center">
              <div className="relative bg-[#5f4b1e] rounded-[2.5rem] p-3 shadow-xl w-48 h-110 md:h-100 lg:w-70 lg:h-170 border-2 border-[#645020]">
                <div className="absolute top-5 left-[45%] h-4 w-4 z-30 bg-[#100f0c] rounded-full"></div>
                <div className="w-full h-full rounded-4xl overflow-hidden relative">
                  <img
                    src={mobileImg}
                    alt="Mobile view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-[#b08d3a]/70 uppercase tracking-widest">
                Mobile
              </p>
            </div>
            {/* Tablet */}
            <div className="flex flex-col items-center">
              <div className="bg-linear-to-br bg-[#5f4b1e] rounded-2xl p-3 shadow-lg lg:w-100 lg:h-150 aspect-3/4 border-4 border-[#b08d3a]/70">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={tabletImg}
                    alt="Tablet view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-[#b08d3a]/70 uppercase tracking-widest">
                Tablet
              </p>
            </div>

            {/* Desktop */}
            <div className="flex flex-col items-center">
              <div className="bg-[#5f4b1e] rounded-t-xl p-2 shadow-2xl w-full">
                <div className="rounded-lg overflow-hidden aspect-video">
                  <img
                    src={desktopImg}
                    alt="Desktop view"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="h-3 bg-linear-to-b bg-[#745d28] rounded-b-lg w-full"></div>
              <div className="h-1.5 bg-gray-900 w-2/3 rounded-b-md"></div>
              <p className="mt-4 text-sm text-[#b08d3a]/70 uppercase tracking-widest">
                Desktop
              </p>
            </div>
          </div>
          {/* CTA */}
          <div className="flex justify-center">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-12 py-4 bg-[#b08d3a] text-black text-sm uppercase tracking-widest rounded-full hover:bg-[#715a25] hover:scale-105 transition-all"
            >
              View Live Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
        {/* Problem / Solution / Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Problem */}
          <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 ">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-xl font-semibold tracking-wide uppercase">
                Problem
              </h2>
            </div>

            <p className="text-gray-300 leading-relaxed">{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Wrench size={24} />
              </div>
              <h2 className="text-xl font-semibold tracking-wide uppercase">
                Solution
              </h2>
            </div>

            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
          </div>

          {/* Lessons */}
          <div className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                <BookOpen size={24} />
              </div>
              <h2 className="text-xl font-semibold tracking-wide uppercase">
                Lessons Learned
              </h2>
            </div>

            <ul className="space-y-3 text-gray-300">
              {project.lessonsLearned.map((lesson, index) => (
                <li key={index} className="flex gap-3 items-center">
                  <span className="h-2 w-2 rounded-full bg-[#e4ba58]" />
                  <span className="">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-8 border-t font-bold">
          <button
            onClick={onNext}
            className="flex items-center gap-3 uppercase tracking-wider hover:gap-5 transition-all"
          >
            Next Project
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);
