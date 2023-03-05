import HTTP from "./";
import {useMutation, useQuery} from "react-query";
import axios from "axios";

const getProjects = () =>
    HTTP.get("/projects/all")
        .then(response =>
            new Promise((resolve) => {
                setTimeout(() => resolve(response.data), 1000)
            }))

const useProjects = () => {
    const context = useQuery('getProjects', getProjects, { refetchOnWindowFocus: false})
    return {...context, projects: context.data}
}


async function GetProject(id) {
    try {
        const response = await HTTP.get(`/projects/${id}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error);
    }

}

const useViewProject = (id) => {
    const context = useQuery('viewProject', () => GetProject(id))
    console.log(context)
    return {...context, project: context.data}
}




// const createProduct = (product) => HTTP.post("/products/create", product)

// const useCreateProduct = (config) => {
//     const mutation = useMutation(createProduct, config);
//     return mutation.mutateAsync
//}

export { useProjects, useViewProject }