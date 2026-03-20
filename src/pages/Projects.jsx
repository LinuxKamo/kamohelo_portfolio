import { memo, useEffect } from "react";
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
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function Projects() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectId = Number(id);
  const project = projectsData.projects.find((proj) => proj.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#12100d]">
        <p className="text-[#b08d3a] text-lg">Project not found</p>
      </div>
    );
  }

  // Image fallbacks (desktop, tablet, mobile)
  const desktopImg = project.thumbnails?.[2];
  const tabletImg = project.thumbnails?.[1] ?? desktopImg;
  const mobileImg = project.thumbnails?.[0] ?? desktopImg;

  const onNext = () => {
    const nextId =
      projectId + 1 > projectsData.projects.length ? 1 : projectId + 1;
    navigate(TO_PROJECT(nextId));
  };

  const onBack = () => {
    navigate(HOME);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#12100d] text-[#b08d3a] min-h-screen"
    >
      {/* Header */}
      <div className="sticky top-0 backdrop-blur-xl bg-[#12100d]/60 border-b border-[#b08d3a]/20 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-[#d6ad4d] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium tracking-wide">Back to Projects</span>
          </button>
        </div>
      </div>

      <ProjectHero project={project} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col space-y-32">
        {/* Project Essentials Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div
            variants={fadeIn}
            className="col-span-1 md:col-span-2 space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Project Essentials
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
              {project.overview}
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="col-span-1 space-y-8 bg-white/5 border border-[#b08d3a]/10 p-8 rounded-4xl backdrop-blur-sm"
          >
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-[#b08d3a] font-bold mb-3 opacity-60">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#b08d3a]/10 border border-[#b08d3a]/20 rounded-full text-xs text-[#b08d3a] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Device Mockups */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-16 flex flex-col items-center justify-center"
        >
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Multi-Platform Experience
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Responsive design ensuring a seamless experience across all
              devices and screen sizes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end justify-center w-full max-w-5xl">
            {/* Mobile */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center group perspective-1000"
            >
              <div className="relative bg-[#1a1815] rounded-[2.5rem] p-3 w-56 h-[480px] border border-white/10 ring-1 ring-white/5 transform transition-transform duration-500 group-hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-5 left-1/2 -translate-x-1/2 h-4 w-16 z-30 bg-[#100f0c] rounded-full border border-white/5"></div>
                <div className="w-full h-full rounded-4xl overflow-hidden relative bg-black">
                  <img
                    src={mobileImg}
                    alt="Mobile view"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
              <p className="mt-8 text-sm text-[#b08d3a]/70 uppercase tracking-widest font-semibold">
                Mobile
              </p>
            </motion.div>

            {/* Tablet */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center group perspective-1000 order-last md:order-0"
            >
              <div className="bg-[#1a1815] rounded-2xl p-4 w-full max-w-sm aspect-3/4 border border-white/10 ring-1 ring-white/5 transform transition-transform duration-500 group-hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="w-full h-full rounded-xl overflow-hidden bg-black">
                  <img
                    src={tabletImg}
                    alt="Tablet view"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
              <p className="mt-8 text-sm text-[#b08d3a]/70 uppercase tracking-widest font-semibold">
                Tablet
              </p>
            </motion.div>

            {/* Desktop */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center group perspective-1000 md:col-span-1"
            >
              <div className="bg-[#1a1815] rounded-t-2xl p-3 w-full border border-white/10 border-b-0 transform transition-transform duration-500 group-hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="rounded-lg overflow-hidden aspect-video bg-black relative">
                  <div className="absolute top-0 w-full h-6 bg-[#2a2622] flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <img
                    src={desktopImg}
                    alt="Desktop view"
                    className="w-full h-full object-cover mt-6 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
              <div className="h-4 bg-linear-to-b from-[#3a352d] to-[#1a1815] rounded-b-xl w-full border border-white/10 border-t-0 shadow-lg"></div>
              <div className="h-1.5 bg-[#100f0c] w-32 rounded-b-md mx-auto"></div>
              <p className="mt-8 text-sm text-[#b08d3a]/70 uppercase tracking-widest font-semibold">
                Desktop
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div variants={fadeIn} className="flex justify-center pt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-10 py-4 bg-linear-to-r from-[#b08d3a] to-[#d6ad4d] text-[#12100d] font-bold text-sm uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(176,141,58,0.4)] hover:scale-105 transition-all duration-300"
            >
              View Live Demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Problem / Solution / Lessons (Bento Grid) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Problem */}
          <motion.div
            variants={fadeIn}
            className="md:col-span-5 group relative p-8 md:p-10 rounded-4xl bg-linear-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-[#b08d3a]/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-4xl transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3.5 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-xl font-bold tracking-wide text-white">
                The Problem
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed text-lg">
              {project.problem}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            variants={fadeIn}
            className="md:col-span-7 group relative p-8 md:p-10 rounded-4xl bg-linear-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-[#b08d3a]/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#b08d3a]/10 to-transparent opacity-0 group-hover:opacity-100 rounded-4xl transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3.5 rounded-2xl bg-[#b08d3a]/10 text-[#b08d3a] border border-[#b08d3a]/20 shadow-[0_0_15px_rgba(176,141,58,0.15)]">
                <Wrench size={24} />
              </div>
              <h2 className="text-xl font-bold tracking-wide text-white">
                The Solution
              </h2>
            </div>
            <p className="text-white/70 leading-relaxed text-lg">
              {project.solution}
            </p>
          </motion.div>

          {/* Lessons */}
          <motion.div
            variants={fadeIn}
            className="md:col-span-12 group relative p-8 md:p-10 rounded-4xl bg-linear-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-[#b08d3a]/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-4xl transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <div className="flex items-center gap-4 md:w-1/3">
                <div className="p-3.5 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  Lessons Learned
                </h2>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.lessonsLearned.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 items-center hover:bg-white/10 transition-colors"
                  >
                    <span className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-[#b08d3a]/20 text-[#b08d3a] text-xs font-bold border border-[#b08d3a]/30">
                      {index + 1}
                    </span>
                    <span className="text-white/80">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-between items-center pt-10 border-t border-white/10"
        >
          <div className="text-white/40 text-sm tracking-widest uppercase">
            Project {projectId < 10 ? `0${projectId}` : projectId} /{" "}
            {projectsData.projects.length < 10
              ? `0${projectsData.projects.length}`
              : projectsData.projects.length}
          </div>
          <button
            onClick={onNext}
            className="flex items-center gap-3 text-white font-bold uppercase tracking-widest group hover:text-[#d6ad4d] transition-colors"
          >
            Next Project
            <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#b08d3a]/20 group-hover:border-[#b08d3a]/40 transition-all">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default memo(Projects);
