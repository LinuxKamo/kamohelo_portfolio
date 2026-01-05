// pages/NotFound.tsx
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#12100d] text-center p-6">
      <h1 className="text-7xl font-bold text-[#e0c068] mb-6">404</h1>
      <h2 className="text-3xl font-serif text-[#b08d3a] mb-4">
        Page Not Found
      </h2>
      <p className="text-[#c9a24d] mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#6aa84f]/20 hover:bg-[#6aa84f]/40 text-[#e0c068] font-semibold px-6 py-3 rounded-xl transition-all"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default memo(NotFound);
