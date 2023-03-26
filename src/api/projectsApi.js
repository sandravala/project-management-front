import HTTP from "./";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";

const getProjects = () =>
    HTTP.get("/projects")
        .then(response => response.data)
        .catch((error) => console.log(error.message));

const useProjects = () => {
    const context = useQuery('getProjects', getProjects, { refetchOnWindowFocus: false})
    return {...context, projects: context.data}
}


async function getMyProjects(id) {
        try {
            const response = await HTTP.get(`/projects/my/?id=${id}`);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
;

const useMyProjects = (id) => {
    const context = useQuery('getMyProjects', () => getMyProjects(id), { refetchOnWindowFocus: false})
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

const deleteProject = (id) => HTTP.delete(`/projects/?id=${id}`)

const useDeleteProject = () => {

    const queryClient = useQueryClient();
    const mutation = useMutation(deleteProject, {onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: ['getProjects'] })
        void queryClient.invalidateQueries({ queryKey: ['getMyProjects'] })
    }});
    return mutation.mutateAsync
}


export { useProjects, useViewProject, useInvestmentList, useSaveProject, useDeleteProject, useMyProjects }


