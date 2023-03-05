import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useProjects} from "../../api/projectsApi";





const Projects = () => {

    const navigate = useNavigate()
    const { isLoading, projects} = useProjects()

    const loadingElement = isLoading && (
        <div style={{display: "flex", height: "80vh", width: "100%", alignItems: "center", justifyContent: "center"}}>
            <CircularProgress /><p>Products loading...</p>
        </div>
    )

    const rows = projects && projects.map((item) => {
        const link = "/projects/" + item.id;
        return {
            id: item.id,
            projectNo: item.projectNo,
            name: item.name,
            client: item.client,
            coordinator: item.coordinator,
            projectAlias: item.projectAlias,
            startDate: item.startDate,
            endDate: item.endDate,
            contractSigningDate: item.contractSigningDate,
            eligibleCosts: item.eligibleCosts,
            fundingRate: item.fundingRate,
            grantAmount: item.grantAmount,
            indirectCostRate: item.indirectCostRate,
            prLink: link
        };
    })


    const columns = [
        { field: "projectAlias", headerName: "Projektas", flex: 0.5 },
        { field: "name", headerName: "Projekto pavadinimas", flex: 1 },
        { field: "client", headerName: "Klientas", flex: 0.4 },
        { field: "coordinator", headerName: "Koordinuoja", flex: 0.5 },
        {
            field: "openProduct",
            flex: 0.5,
            headerName: "Peržiūrėti projekta",
            renderCell: ({row}) => <Button variant="text" onClick={() => navigate(row.prLink)}>Rodyti</Button>
        }
    ];

    return(
        loadingElement ||
        <div style={{height: "auto", width: "100%"}}>
            <DataGrid
                autoHeight
                getRowHeight={() => 'auto'}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            {/*<FormDialog />*/}
            {/*<FormikFormDialog />*/}
        </div>
    )
}

export default Projects