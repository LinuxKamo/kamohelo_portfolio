import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import meImg from "../../assets/me.jpg";

const slides = [
  {
    title: "Kamohelo",
    subtitle: "Software Engineer",
    description: "Architecting elegant solutions with modern technologies.",
    image: meImg,
  },
  {
    title: "Creative",
    subtitle: "Product Designer",
    description: "Bridging the gap between functionality and visual excellence.",
    image: meImg,
  },
  {
    title: "Developer",
    subtitle: "Problem Solver",
    description: "Turning complex challenges into seamless user experiences.",
    image: meImg,
  },
];

export function LoadingScreen({ onSkip, isVideoLoaded }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] bg-[#0c0a09] flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 0.4, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Background"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a09] via-transparent to-[#0c0a09]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-transparent to-[#0c0a09]" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#b08d3a] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#b08d3a] to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        <div className="mb-12">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-[#b08d3a] mx-auto"
            />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6"
          >
            <motion.span 
              className="block text-[#b08d3a] text-xs font-bold uppercase tracking-[0.5em] mb-4"
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {slides[currentSlide].subtitle}
            </motion.span>
            
            <motion.h1 
              className="text-7xl md:text-9xl font-extralight text-white tracking-tighter leading-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p 
              className="text-white/40 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed tracking-wide italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              "{slides[currentSlide].description}"
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar Container */}
        <div className="mt-24 w-full max-w-xs space-y-6">
          <div className="flex justify-between items-end text-[10px] uppercase tracking-[0.2em] font-bold">
            <span className="text-white/40">Status</span>
            <span className="text-[#b08d3a]">
                {isVideoLoaded ? "Ready" : "Loading Assets"}
            </span>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#b08d3a]"
              initial={{ width: "0%" }}
              animate={{ width: isVideoLoaded ? "100%" : "70%" }}
              transition={{ duration: isVideoLoaded ? 0.5 : 10, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-center gap-4">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ 
                  width: i === currentSlide ? 32 : 8,
                  backgroundColor: i === currentSlide ? "#b08d3a" : "rgba(255,255,255,0.1)"
                }}
                className="h-1 rounded-full transition-colors duration-500"
              />
            ))}
          </div>
        </div>

        {/* Interactive Skip Button */}
        <motion.button
          onClick={onSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 group relative py-4 px-10 flex items-center gap-4"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10 group-hover:border-[#b08d3a]/50 transition-all duration-300" />
          <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white group-hover:text-[#b08d3a] transition-colors">
            Enter Portfolio
          </span>
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative z-10 w-4 h-px bg-[#b08d3a]"
          />
        </motion.button>
      </div>

      {/* Screen Corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/10" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/10" />
    </motion.div>
  );
}

