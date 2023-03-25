import HTTP from "./";
import {useMutation, useQuery} from "react-query";
import axios from "axios";

const getProjects = () =>
    HTTP.get("/projects/all")
        .then(response => response.data)
        .catch((error) => console.log(error.message));

const useProjects = () => {
    const context = useQuery('getProjects', getProjects, { refetchOnWindowFocus: false})
    return {...context, projects: context.data}
}

async function getProject(id) {
    try {
        const response = await HTTP.get(`/projects/${id}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

const useViewProject = (id) => {
    const context = useQuery('viewProject', () => getProject(id))
    return {...context, project: context.data}
}


async function getInvestmentList(id) {
    try {
        const response = await HTTP.get(`/projects/${id}/iList`);
        return response.data
    } catch (error) {
        console.error(error);
    }

}

const useInvestmentList = (id) => {
    const context = useQuery('viewInvestmentList', () => getInvestmentList(id))
    return {...context}
}

const saveProject = (project) => HTTP.post("/projects/save", project)

const useSaveProject = (config) => {
    const mutation = useMutation(saveProject, config);
    return mutation.mutateAsync
}


export { useProjects, useViewProject, useInvestmentList, useSaveProject }


