import React, { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

function ContactMe() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",  // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // replace with your EmailJS template ID
        formRef.current,
        "YOUR_PUBLIC_KEY"   // replace with your EmailJS public key
      )
      .then(
        () => setStatus("Message sent! I will get back to you soon."),
        () => setStatus("Failed to send message. Please try again later.")
      );

    formRef.current.reset();
  };

  return (
    <motion.div
      className="overflow-y-auto text-[#b08d3a] flex flex-col justify-center py-2 min-h-screen lg:mx-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-serif text-[#e0c068] mb-4">
          Contact Me
        </h1>
        <p className="text-[#b08d3a] text-lg md:text-xl max-w-2xl mx-auto">
          Got a project, question, or just want to say hi? Send me a message
          and I’ll get back to you as soon as possible.
        </p>
      </section>

      {/* Form */}
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full p-4 rounded-2xl shadow-xl space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-[#e0c068] font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            required
            className="bg-[#12100d] border border-[#b08d3a] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e0c068]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-[#e0c068] font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            required
            className="bg-[#12100d] border border-[#b08d3a] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e0c068]"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 text-[#e0c068] font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="bg-[#12100d] border border-[#b08d3a] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e0c068]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#6aa84f]/20 hover:bg-[#6aa84f]/40 text-[#e0c068] font-semibold px-6 py-3 rounded-xl transition-all w-full"
        >
          Send Message
        </button>

        {/* Status Message */}
        {status && (
          <p className="text-center mt-4 text-[#f2d376] font-semibold">{status}</p>
        )}
      </motion.form>
    </motion.div>
  );
}

export default memo(ContactMe);
