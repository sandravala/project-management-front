import HTTP from "./";
import { useQuery} from "react-query";
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
    console.log(context)
    return {...context, project: context.data}
}


// async function getInvestmentList(id) {
//     try {
//         const response = await HTTP.get(`/projects/${id}`);
//         console.log(response.data)
//         return response.data
//     } catch (error) {
//         console.error(error);
//     }
//
// }
//
// const useInvestmentList = (id) => {
//     const context = useQuery('viewInvestmentList', () => getInvestmentList(id))
//     console.log(context)
//     return {...context, invLoading: context.isLoading, invIsEr: context.isError, invSuccess: context.isSuccess, invEr: context.error, investmentList: context.data}
// }


export { useProjects, useViewProject }


// const createProduct = (product) => HTTP.post("/products/create", product)

// const useCreateProduct = (config) => {
//     const mutation = useMutation(createProduct, config);
//     return mutation.mutateAsync
//}