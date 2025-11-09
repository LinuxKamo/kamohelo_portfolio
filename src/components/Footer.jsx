import React, { memo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Branding */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">Kamohelo Motaung</h2>
          <p className="text-sm text-gray-400">
            Frontend Developer | Creating modern digital experiences
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-amber-500 transition">Home</a></li>
            <li><a href="#projects" className="hover:text-amber-500 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-amber-500 transition">Contact Me</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Connect</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://github.com/LinuxKamo" target="_blank" rel="noreferrer" className="hover:text-amber-500">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/kamohelo-motaung-3a104725b/" target="_blank" rel="noreferrer" className="hover:text-amber-500">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Kamohelo Motaung. All Rights Reserved.
      </div>
    </footer>
  );
}

export default memo(Footer);
