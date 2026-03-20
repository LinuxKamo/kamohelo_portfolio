import { memo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

function ProjectHero({ project }) {
  const combinedTags = [...project.tags, ...project.stack];
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden text-white flex items-end pb-20">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src={project.video}
          className="absolute w-full h-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 z-30 flex space-x-3">
        <button
          onClick={togglePlay}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          onClick={toggleMute}
          className="bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full mx-auto px-8 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-10">
        {/* Left */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-5xl font-bold tracking-tight"
          >
            {project.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-xl"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-4"
          >
            {combinedTags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1.5 border border-white/20 backdrop-blur-md bg-white/5 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-row md:flex-col gap-8 md:gap-6 text-sm uppercase"
        >
          <div>
            <p className="text-[#b08d3a] text-xs font-bold">Team</p>
            <p>{project.teamType}</p>
          </div>
          <div>
            <p className="text-[#b08d3a] text-xs font-bold">Date</p>
            <p>{project.startDate}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ProjectHero);
