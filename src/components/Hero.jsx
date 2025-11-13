import { memo } from "react";
import { motion } from "motion/react";
import picture from "../assets/me.jpg";
import { Github, Linkedin, Mail, Globe, Menu } from "lucide-react";

function Hero() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-amber-50 via-white to-gray-100 font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90vw] md:w-[80vw] bg-white/70 backdrop-blur-md border border-white/30 rounded-full shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-widest text-amber-600">
            KBM
          </h1>
          <ul className="hidden md:flex gap-8 font-semibold text-gray-800">
            <motion.li whileTap={{ scale: 1.3,transition:{duration:5} }}>
              <a href="#projects" className="hover:text-amber-600 transition">
                Projects
              </a>
            </motion.li>
            <motion.li whileTap={{ scale: 1.3 }}>
              <a href="#home" className="hover:text-amber-600 transition">
                Home
              </a>
            </motion.li>
            <motion.li whileTap={{ scale: 1.3 }}>
              <a
                href="#contact"
                className="text-white hover:text-amber-900 hover:bg-amber-400 py-2 px-5 rounded-lg bg-amber-600 transition"
              >
                Contact me
              </a>
            </motion.li>
          </ul>
          <button className="md:hidden lg:hidden"><Menu/></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 max-w-7xl mx-auto pt-32 pb-16"
      >
        {/* Text Content */}
        <motion.div
          initial={{ x: "-100vh" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8,type:"spring",stiffness:50,mass:2 }}
          className="max-w-lg space-y-6 relative z-10"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Hi, I’m{" "}
            <span className="text-amber-600 drop-shadow-sm">Kamohelo</span> 👋
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            I’m a passionate{" "}
            <span className="font-semibold text-amber-600">developer</span> who
            loves building clean, efficient, and creative web solutions using
            modern technologies.
          </p>

          <div className="flex gap-4 pt-2">
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-amber-600 text-center text-white rounded-full shadow-md hover:bg-amber-700 transition"
            >
              View My Work
            </motion.a>
            <a
              href="#contact"
              className="px-6 py-3 text-center border border-amber-600 text-amber-600 rounded-full hover:bg-amber-50 transition"
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 pt-6 text-gray-600">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-600 transition"
            >
              <Github size={26} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-600 transition"
            >
              <Linkedin size={26} />
            </a>
            <a
              href="mailto:kamohelo@example.com"
              className="hover:text-amber-600 transition"
            >
              <Mail size={26} />
            </a>
            <a href="#" className="hover:text-amber-600 transition">
              <Globe size={26} />
            </a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <div className="relative group">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-amber-500 shadow-xl transform group-hover:scale-105 transition duration-500">
            <img
              src={picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(Hero);
