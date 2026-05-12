import { motion, AnimatePresence } from "motion/react";
import meImage from "../../assets/me.jpg";

export function Sidebar({ project }) {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-[#12100d]/40 backdrop-blur-2xl border-l border-[#b08d3a]/20 z-40 hidden xl:flex flex-col p-8 overflow-y-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-full h-40 overflow-hidden border-2 border-[#b08d3a]/50 mb-4 shadow-[0_0_20px_rgba(176,141,58,0.2)]">
          <img
            src={project.background}
            alt="Kamohelo Motaung"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-[#b08d3a]/70 font-semibold uppercase tracking-widest">
          Full Stack Developer
        </p>
      </div>

      {/* Project Overview */}
      <div className="flex-1 space-y-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#b08d3a] font-bold mb-4 opacity-50">
                Project Overview
              </h3>
              <p className="text-white/80 leading-relaxed text-sm font-medium">
                {project.overview}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#b08d3a]/10">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#b08d3a] font-bold mb-2 opacity-50">
                  Client
                </h4>
                <p className="text-white text-xs font-semibold">
                  {project.client}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#b08d3a] font-bold mb-2 opacity-50">
                  Role
                </h4>
                <p className="text-white text-xs font-semibold">
                  {project.role}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#b08d3a]/10">
              <h4 className="text-[10px] uppercase tracking-widest text-[#b08d3a] font-bold mb-3 opacity-50">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-[#b08d3a]/10 border border-[#b08d3a]/20 rounded text-[10px] text-[#b08d3a] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quote/Footer */}
      <div className="mt-12 pt-8 border-t border-[#b08d3a]/10">
        <p className="text-[10px] italic text-white/40 leading-relaxed">
          "Passionate about creating digital experiences that bridge the gap
          between complexity and simplicity."
        </p>
      </div>
    </div>
  );
}
