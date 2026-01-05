import { memo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Layers,
  Mail
} from "lucide-react";
import { CONTACTME, EXPECTIES, HOME, PROJECTS } from "../data/Page";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const tabs = [
    { title: "Home", subtitle: "About Me", to: HOME, icon: Home },
    { title: "Work", subtitle: "Selected Projects", to: PROJECTS, icon: Briefcase },
    { title: "Expecties", subtitle: "I specialise in", to: EXPECTIES, icon: Layers },
    { title: "Contact", subtitle: "Get In Touch", to: CONTACTME, icon: Mail },
  ];

  return (
    <>
      {/* ================= MOBILE / TABLET TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1f1b14] px-5 py-4 flex items-center justify-between shadow-xl">
        <span className="text-[#e0c068] font-serif tracking-widest uppercase">
          PORTFOLIO of Kamohelo
        </span>

        <button onClick={() => setOpen(true)} className="text-[#e0c068]">
          <Menu size={28} />
        </button>
      </div>

      {/* ================= MOBILE / TABLET SLIDE MENU ================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-linear-to-b from-[#1f1b14] to-[#2a241a] shadow-2xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close */}
          <div className="flex justify-end p-5">
            <button onClick={() => setOpen(false)} className="text-[#e0c068]">
              <X size={26} />
            </button>
          </div>

          {/* Mobile Nav */}
          <div className="flex flex-col gap-8 px-8 mt-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.to;

              return (
                <button
                  key={tab.title}
                  onClick={() => {
                    navigate(tab.to);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-4 transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Icon className="text-[#6aa84f]" size={24} />
                  <div className="text-left">
                    <h3
                      className={`text-xl font-serif ${
                        isActive ? "text-[#f2d376]" : "text-[#e0c068]"
                      }`}
                    >
                      {tab.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#b08d3a]">
                      {tab.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR (UNCHANGED STYLING) ================= */}
      <div className="hidden lg:flex sticky top-0 px-5 flex-col justify-center h-full min-h-screen w-60 rounded-r-full bg-linear-to-b from-[#1f1b14] to-[#2a241a] shadow-2xl">
        {/* Header */}
        <p className="text-sm tracking-widest text-[#c9a24d]/70 mb-16">
          Welcome
          <br />
          <span className="text-xs tracking-[0.35em] text-[#b08d3a]/60">
            PORTFOLIO
          </span>
        </p>

        {/* Styled Nav */}
        <div className="space-y-10 overflow-y-auto overflow-x-hidden pr-6 scroll-smooth">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.to;

            return (
              <button
                key={tab.title}
                onClick={() => navigate(tab.to)}
                className={`
                  block w-full text-left transition-all duration-500 ease-out
                  ${
                    isActive
                      ? "opacity-100 translate-x-6"
                      : "opacity-40 hover:opacity-80"
                  }
                `}
              >
                <h2
                  className={`font-serif text-[2.8rem] leading-none ${
                    isActive ? "text-[#f2d376]" : "text-[#e0c068]"
                  }`}
                >
                  {tab.title}
                </h2>
                <p className="uppercase tracking-[0.35em] text-xs mt-3 text-[#b08d3a]">
                  {tab.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default memo(SideBar);
