import { memo } from "react";
import picture from "../assets/me.jpg";

function Hero() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-300 font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-amber-500 backdrop-blur-lg z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">MyPortfolio</h1>
          <ul className="hidden md:flex gap-8 font-medium text-white">
            <li><a href="#home" className="hover:text-gray-200 transition">Home</a></li>
            <li><a href="#projects" className="hover:text-gray-200 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-gray-200 transition">Contact Me</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 max-w-7xl mx-auto pt-32 pb-10 relative z-0">
        <div className="max-w-lg space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">Hi, I'm <span className="text-amber-500">Kamohelo</span> 👋</h2>
          <p className="text-lg md:text-xl text-gray-700">Frontend & Backend Developer | Creator | Problem Solver</p>
          <a href="#projects" className="inline-block px-8 py-4 bg-amber-500 text-white rounded-full shadow-xl hover:bg-amber-600 transition transform hover:-translate-y-1 hover:scale-105">Explore My Work</a>
        </div>

        {/* Profile Image */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-amber-500 shadow-2xl transform hover:scale-110 transition duration-500">
          <img
            src={picture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Tech Stats Section */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <h3 className="text-3xl font-bold mb-8 text-gray-900">Tech Stack</h3>
        <div className="flex flex-wrap gap-6 text-lg font-medium text-gray-700">
          {['React','C#','MongoDB','SQL','TypeScript','Python'].map((tech, i) => (
            <span key={i} className="px-6 py-3 bg-white rounded-3xl shadow-2xl border hover:scale-110 transition transform cursor-pointer hover:bg-amber-100 hover:shadow-xl">{tech}</span>
          ))}
        </div>
      </section>

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-40 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300 rounded-full blur-3xl opacity-30 animate-pulse -z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse -z-10"></div>
    </div>
  );
}

export default memo(Hero);