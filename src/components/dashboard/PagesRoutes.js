import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import InvestmentList from "../pages/ProjectDashboard/InvestmentList";
import NewProject from "../pages/NewProject";
import MyProjects from "../pages/MyProjects";
import {useSelector} from "react-redux";
import Login from "../pages/Login";
import UserRoleSettings from "../pages/UserRoleSettings";
import ProtectedRoute from "./ProtectedRoute";


const PagesRoutes = () => {

const user = useSelector(({persistedUser}) => persistedUser?.userDto);

return (
    <Routes>

        <Route path="/home" element={<Home noAccess={false}/>}/>
        <Route path="/" element={<Home noAccess={true}/>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/projects" element={
            <ProtectedRoute roles={["ADMIN", "PM", "CLIENT"]}>
                <Projects />
            </ProtectedRoute>   
        }/>
        <Route path="/projects/my" element={<MyProjects user={user}/>}/>
        <Route path="/projects/:id" element={<Project selectedTab={0}/>}/>
        <Route path="/projects/:id/iList" element={<Project selectedTab={1} />}/>
        <Route path="/projects/save" element={
                <ProtectedRoute roles={["ADMIN"]}>
                        <NewProject />
                </ProtectedRoute>}/>
        <Route path="/users" element={
        <ProtectedRoute roles={["ADMIN"]}>
                        <UserRoleSettings/>
        </ProtectedRoute>
        }/>

    </Routes>
)
}

export default PagesRoutes