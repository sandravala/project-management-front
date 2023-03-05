import {useParams} from "react-router-dom";
import {getProjectsN, useGetProject, useProjects, useViewProject, viewProject} from "../../api/projectsApi";



const Project = () => {

    const {id} = useParams()
    const { isLoading, isError, isSuccess, data, error } = useViewProject(id)

    if(isLoading) {
        return <span>Loading...</span>
    }

    if(isError) {
        return <span>Error: {error.message}</span>
    }

    if(isSuccess) {
        const pr = {
            id: data.id,
            projectNo: data.projectNo,
            name: data.name,
            client: data.client,
            coordinator: data.coordinator,
            projectAlias: data.projectAlias,
            startDate: data.startDate,
            endDate: data.endDate,
            contractSigningDate: data.contractSigningDate,
            eligibleCosts: data.eligibleCosts,
            fundingRate: data.fundingRate,
            grantAmount: data.grantAmount,
            indirectCostRate: data.indirectCostRate
        }
        // const projectN = projects.map((item) => {
        //     return {
        //         id: item.id,
        //         projectNo: item.projectNo,
        //         name: item.name,
        //         client: item.client,
        //         coordinator: item.coordinator,
        //         projectAlias: item.projectAlias,
        //         startDate: item.startDate,
        //         endDate: item.endDate,
        //         contractSigningDate: item.contractSigningDate,
        //         eligibleCosts: item.eligibleCosts,
        //         fundingRate: item.fundingRate,
        //         grantAmount: item.grantAmount,
        //         indirectCostRate: item.indirectCostRate,
        //     };
        // })

        return (
            <h1>

                {pr.projectAlias}
                {/*projektas {id} = {project.projectAlias}*/}

            </h1>
        )
    }
    }

export default Project