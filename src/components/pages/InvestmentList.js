import {useParams} from "react-router-dom";
import {
    useInvestmentList,
} from "../../api/projectsApi";



const InvestmentList = () => {

    const {id} = useParams()
    const { isLoading, isError, isSuccess, data, error } = useInvestmentList(id)

    if(isLoading) {
        return <span>Loading...</span>
    }


    if(isError) {
        return <span>Error: {error.message }</span>
    }

    if(isSuccess) {
        // const inv = {
        //     id: data.id,
        //     name: data.name,
        //     procurementType: data.procurementType,
        //     projectId: data.projectId
        // }

        const iListNull = !data.length && (
            <h1>No investments yet!</h1>
        );

        const iListFull =  data.map((inv, i) =>(
            <p key={i}>{(++i) + ", inv. pavadinimas: "}{inv.name + ", deadline: "}{inv.procurementDeadline + " "}{", projekto id: " + inv.projectId}</p>
        ));

        return (
            <h1>
                { iListNull || iListFull }
            </h1>
        )
    }
}

export default InvestmentList