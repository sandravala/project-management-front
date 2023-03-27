import HTTP from "./";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";


const useProjects = () => {
    const getProjects = () =>
    HTTP.get("/projects")
        .then(response => response.data)
        .catch((error) => console.log(error.message));

    const context = useQuery('getProjects', getProjects, { refetchOnWindowFocus: false})
    return {...context, projects: context.data}
}


const useMyProjects = (id) => {
    
    async function getMyProjects(id) {
        try {
            const response = await HTTP.get(`/projects/my/?id=${id}`);
            return response.data
        } catch (error) {
            console.error(error);
        }
    };

    const context = useQuery('getMyProjects', () => getMyProjects(id), { refetchOnWindowFocus: false})
    return {...context, projects: context.data}
}


const useViewProject = (id) => {
    
    async function getProject(id) {
        try {
            const response = await HTTP.get(`/projects/${id}`);
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    const context = useQuery('viewProject', () => getProject(id))
    return {...context, project: context.data}
}



const useInvestmentList = (id) => {
    
    async function getInvestmentList(id) {
        try {
            const response = await HTTP.get(`/projects/${id}/iList`);
            return response.data
        } catch (error) {
            console.error(error);
        }
    
    }

    const context = useQuery('viewInvestmentList', () => getInvestmentList(id))
    return {...context}
}



const useSaveProject = (config) => {

    const saveProject = (project) => HTTP.post("/projects/save", project)

    const mutation = useMutation(saveProject, config);
    return mutation.mutateAsync
}



const useDeleteProject = () => {

    const deleteProject = (id) => HTTP.delete(`/projects/?id=${id}`)

    const queryClient = useQueryClient();
    const mutation = useMutation(deleteProject, {onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: ['getProjects'] })
        void queryClient.invalidateQueries({ queryKey: ['getMyProjects'] })
    }});
    return mutation.mutateAsync
}

const useSaveInvestment = (config) => {

    const saveInvestment = (investment) => HTTP.post(`/projects/${investment.projectId}/iList`, investment)
    // async function saveInvestment(id, investment) {
    //     try {
    //         console.log(" projects api id: " + id + "investment: " + investment);
    //         const response = await HTTP.post(`/projects/${id}/iList`, investment);
    //         return response.data
    //     } catch (error) {
    //         console.error(error);
    //     }
    
    // }

    const mutation = useMutation(saveInvestment, config);
    return mutation.mutateAsync
}



export { useProjects, useViewProject, useInvestmentList, useSaveProject, useDeleteProject, useMyProjects, useSaveInvestment }


