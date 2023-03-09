import {useParams} from "react-router-dom";
import {
    getProjectsN,
    useGetProject,
    useInvestmentList,
    useProjects,
    useViewProject,
    viewProject
} from "../../api/projectsApi";



const Project = () => {

    const {id} = useParams()
    const { isLoading, isError, isSuccess, data, error } = useViewProject(id)

    if(isLoading) {
        return <span>Loading...</span>
    }


    if(isError) {
        return <span>Error: {error.message }</span>
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
            indirectCostRate: data.indirectCostRate,
          }

        console.log(data.investmentDtos)

        const investmentList = data.investmentDtos;


        return (
            <h1>

                {pr.projectAlias}
                {
                    investmentList.map((inv, i) =>(
                        <p key={i}>{inv.name}</p>
                    ))
                }
                {/*projektas {id} = {project.projectAlias}*/}

            </h1>
        )
    }
    }

export default Project