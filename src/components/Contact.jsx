import React, { memo } from "react";
import { FaEnvelope, FaPhoneAlt, FaGithub, FaLinkedin } from "react-icons/fa";

function Contact() {
  return (
    <div
      id="contact"
      className="max-w-4xl mx-auto px-6 py-20 text-center"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10">Contact Me</h2>

      <p className="text-gray-600 mb-10 max-w-lg mx-auto">
        Have a project or just want to say hello? Feel free to reach out!
      </p>

      {/* Contact Form */}
      <form className="grid grid-cols-1 gap-6 bg-white p-8 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          className="p-3 border rounded-lg focus:outline-none focus:ring focus:ring-amber-500"
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold"
        >
          Send Message
        </button>
      </form>

      {/* Other Contact Options */}
      <div className="mt-10 space-y-3 text-gray-700">
        <p className="flex items-center justify-center gap-2">
          <FaEnvelope /> kamohelomotaung889@gmail.com
        </p>
        <p className="flex items-center justify-center gap-2">
          <FaPhoneAlt /> +27 73 920 2336
        </p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center gap-6 mt-6 text-2xl">
        <a href="https://github.com/" className="hover:text-amber-600 transition">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/" className="hover:text-amber-600 transition">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default memo(Contact);
