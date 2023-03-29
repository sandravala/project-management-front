import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {useDeleteProject, useProjects} from "../../api/projectsApi";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useState} from "react";
import { useSelector } from 'react-redux';


const Projects = () => {
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto);
    const hasAccess = (roles) => user?.roles.some(r => roles.includes(r));

    const navigate = useNavigate()
    const { isLoading, projects } = useProjects()
    const deleteProject = useDeleteProject();



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const loadingElement = isLoading && (
        <div style={{display: "flex", height: "80vh", width: "100%", alignItems: "center", justifyContent: "center"}}>
            <CircularProgress /><span>Projects loading...</span>
        </div>
    )

    const allRows = projects && projects.map((item) => {
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

    const filteredRows = allRows?.filter(row => {
        return row.client === user?.organisation;
      });

    const rows = hasAccess(["CLIENT"]) ? filteredRows : allRows;

    const columns = [
        { id: 0, field: "projectAlias", label: "Projektas", flex: 0.5, align: "left" },
        { id: 1, field: "name", label: "Projekto pavadinimas", flex: 1, align: "left" },
        { id: 2, field: "client", label: "Klientas", flex: 0.4, align: "left" },
        { id: 3, field: "coordinator", label: "Koordinuoja", flex: 0.5, align: "left" },
    ];



    return (
        loadingElement ||
        <Paper sx={{ width: '100%', height: '70%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{
                            "& th": {
                                fontSize: "1rem",
                                color: "rgb(255,255,255)",
                                backgroundColor: "rgb(12,34,72)"
                                }
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ flex: column.flex }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key={4}
                                align="center"
                                style={{flex: 0.5}}
                            >
                                Peržiūrėti projekta
                            </TableCell>

                            { hasAccess(["ADMIN"]) &&
                                    <TableCell
                                        key={5}
                                        align="center"
                                        style={{ flex: 0.5 }}
                                    >
                                        Istrinti projekta
                                    </TableCell>
                            }
                            


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index + row.name}>
                                        {columns.map((column) => {
                                            const value = row[column.field];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={4} align="center" >
                                            <IconButton
                                                sx={{
                                                    color: "#0c2248",
                                                    "& :hover": {
                                                        color: "#fd2929",
                                                        boxShadow: "rgb(126,134,157)",
                                                    }
                                                }}
                                                onClick={() => navigate(row.prLink)}>
                                                <VisibilityOutlinedIcon/>
                                            </IconButton>
                                        </TableCell>
                                        
                                        { hasAccess(["ADMIN"]) &&
                                        <TableCell key={5} align="center" >
                                            <IconButton
                                                sx={{
                                                    color: "#0c2248",
                                                    "& :hover": {
                                                        color: "#fd2929",
                                                        boxShadow: "rgb(126,134,157)",
                                                    }
                                                }}
                                                onClick={() => deleteProject(row.id)}>
                                                <DeleteOutlineOutlinedIcon/>
                                            </IconButton>
                                        </TableCell>
                                        }
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default Projects

