import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {PROJECTS } from "./data/Page";
import Projects from "./pages/Projects";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
          <Route index element={<Home />} />
          <Route path={PROJECTS} element={<Projects/>}/>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
