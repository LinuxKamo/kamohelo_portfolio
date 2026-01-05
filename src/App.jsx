import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CONTACTME, EXPECTIES, HOME, PROJECTS } from "./data/Page";
import Technologies from "./pages/Technologies";
import Projects from "./pages/Projects";
import ContactMe from "./pages/ContactMe";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path={HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={EXPECTIES} element={<Technologies/>}/>
          <Route path={PROJECTS} element={<Projects/>}/>
          <Route path ={CONTACTME} element={<ContactMe/>}/>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
