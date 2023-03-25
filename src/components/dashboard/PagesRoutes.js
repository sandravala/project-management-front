import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import InvestmentList from "../pages/ProjectDashboard/InvestmentList";
import NewProject from "../pages/NewProject";

const PagesRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/projects/:id" element={<Project selectedTab={0}/>}/>
        <Route path="/projects/:id/iList" element={<Project selectedTab={1} />}/>
        <Route path="/projects/save" element={<NewProject />}/>


    </Routes>
)

export default PagesRoutes