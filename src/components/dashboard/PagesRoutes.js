import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Project from "../pages/Project";

const PagesRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/projects/:id" element={<Project />}/>

    </Routes>
)

export default PagesRoutes