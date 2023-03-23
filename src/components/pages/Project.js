import {useParams} from "react-router-dom";
import {
    useInvestmentList, useSaveProject,
    useViewProject,
} from "../../api/projectsApi";
import {Countdown} from "./ProjectDashboard/CountDownTimer";



const Project = () => {

    const saveProject = useSaveProject();
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
        const investmentList = data.investmentDtos;
        return (
            <>
            <h1>

                {pr.projectAlias} , {pr.endDate}
                {
                    investmentList.map((inv, i) =>(
                        <p key={i}>{inv.name + " "}{inv.procurementDeadline} </p>
                    ))
                }
                {/*projektas {id} = {project.projectAlias}*/}


            </h1>
            <Countdown endOfProject={pr.endDate}/>
            </>

            //darysiu su mui tabs. gal virsuj atskiras paperis ar kitas elementas, kuris savyje laiko projekto pavadinima ir kitus butinus elementus, pvz datas, numeri, kontaktus ir pan.
            // o sone - tabai: investicijos, pirkimai, MP ir pan. gal investiciju net nebus tabo, tiesiog pagrindinis puslapis projekto su inv sarasu
        )
    }
    }

export default Project