import {useNavigate, useParams} from "react-router-dom";
import {
    useInvestmentList, useProjects,
} from "../../../api/projectsApi";
import * as React from "react";
import {
    CircularProgress, MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TextField
} from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import { DateField } from '@mui/x-date-pickers/DateField';
import {useTranslation} from "react-i18next";



const InvestmentList = () => {

    const {id} = useParams()
    const { isLoading, isError, isSuccess, data, error } = useInvestmentList(id)
    const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [invValues, setInvValues] = useState({
        id: null,
        procurementType: "",
        name: "",
        plannedCostAmount: 0,
        actualContractCosts: 0,
        fundingRate: 0,
        fundingAmount: 0,
        procurementDeadline: "",
        procurementState: "",
        projectId: parseInt(id)
    });
    const {t} = useTranslation();

    const [rowIndex, setRowIndex] = useState(-1);


    const loadingElement = isLoading && (
        <div style={{display: "flex", height: "80vh", width: "100%", alignItems: "center", justifyContent: "center"}}>
            <CircularProgress /><span>Projects loading...</span>
        </div>
    )

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (rowIndex, initialValues) => {
        console.log(initialValues);
        Object.assign(invValues, initialValues);
        setInvValues(invValues);
        console.log(invValues);
        setRowIndex(rowIndex);
        //setEditing(!editing); // cia paskui reikes nuimti, palikti tik row index ir kita mygtuka
    }

    const handleChangeValues = (e) => {
        setInvValues({ ...invValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (invId) => {
        setInvValues({ ...invValues, [id]: invId });
        console.log(invValues);
        setRowIndex(-1);
    }

    if(isError) {
        return <span>Error: {error.message }</span>
    }

    const procurementStates = [
        "planuojama",
        "vykdoma",
        "įvykdyta (pasirašyta sutartis)",
        "atsisakyta"
    ]

    const procurementTypes = [
        "Pirkimas iš pasirinkto tiekėjo",
        "Konkursas"
    ]

        const rows = data && data.map((item) => {
            const link = "/projects/" + item.id;
            return {
                id: item.id,
                procurementType: item.procurementType,
                name: item.name,
                plannedCostAmount: item.plannedCostAmount,
                actualContractCosts: item.actualContractCosts,
                fundingRate: item.fundingRate,
                fundingAmount: item.fundingAmount,
                procurementDeadline: item.procurementDeadline,
                procurementState: item.procurementState,
                projectId: item.projectId
            };
        })


        const columns = [
            { id: 0, field: "name", label: t("invName"), flex: 0.5, align: "left" },
            { id: 1, field: "procurementType", label: t("invPrType"), flex: 1, align: "left" },
            { id: 2, field: "plannedCostAmount", label: t("invEligibleCosts"), flex: 0.3, align: "left" },
            { id: 3, field: "actualContractCosts", label: t("invActualCosts"), flex: 0.3, align: "left" },
            // { id: 4, field: "fundingRate", label: "Finansavimo %", flex: 0.3, align: "left" },
            { id: 5, field: "fundingAmount", label: t("invFundingAmount"), flex: 0.3, align: "left" },
            { id: 6, field: "procurementDeadline", label: t("invDeadline"), flex: 0.3, align: "left" },
            { id: 7, field: "procurementState", label: t("invState"), flex: 1, align: "left" },
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
                                    {t("invEdit")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index + row.name}>
                                            {columns.map((column) => {

                                                const value = isNaN(row[column.field]) ? row[column.field] : row[column.field].toLocaleString('lt-LT', { style: 'currency', currency: 'EUR' });

                                                const DropDownState = column.field === "procurementState" && (
                                                    <TextField
                                                        size="small"
                                                        select
                                                        defaultValue={value}
                                                        id={column.field}
                                                        name={column.field}
                                                        onChange={handleChangeValues}
                                                    >
                                                        {procurementStates.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                )
                                                const DropDownType = column.field === "procurementType" && (
                                                    <TextField
                                                        size="small"
                                                        select
                                                        defaultValue={value}
                                                        id={column.field}
                                                        name={column.field}
                                                        onChange={handleChangeValues}
                                                    >
                                                        {procurementTypes.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                )
                                                const MyDateField = column.field === "procurementDeadline" && (
                                                    <TextField
                                                        size="small"
                                                        type="date"
                                                        defaultValue={value}
                                                        id={column.field}
                                                        name={column.field}
                                                        InputProps={{inputProps: { min: "2010-05-01", max: "2030-05-04"} }}
                                                        onChange={handleChangeValues}
                                                    />
                                                )
                                                const MyTextField = column.field !== "procurementState" && (
                                                    <TextField size="small" defaultValue={value} id={column.field} name={column.field} onChange={handleChangeValues}/>
                                                )


                                                const cell = index === rowIndex ? MyDateField || DropDownState || DropDownType || MyTextField : value;
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {cell}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell key={4} align="center" >
                                                {
                                                    index !== rowIndex ?
                                                <IconButton
                                                    sx={{
                                                        color: "#0c2248",
                                                        "& :hover": {
                                                            color: "#fd2929",
                                                            boxShadow: "rgb(126,134,157)",
                                                        }
                                                    }}
                                                    onClick={() => handleEdit(index, row)}>
                                                    <EditSharpIcon/>
                                                </IconButton>
                                                        :
                                                <IconButton
                                                    sx={{
                                                        color: "#0c2248",
                                                        "& :hover": {
                                                            color: "#fd2929",
                                                            boxShadow: "rgb(126,134,157)",
                                                        }
                                                    }}
                                                    onClick={() => handleSubmit(row.id)}>
                                                    <DoneOutlineSharpIcon/>
                                                </IconButton>

                                                }
                                            </TableCell>
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


// const iListNull = !data.length && (
//     <h1>No investments yet!</h1>
// );
//
// const iListFull =  data.map((inv, i) =>(
//     <span key={i}>{(++i) + ", inv. pavadinimas: "}{inv.name + ", deadline: "}{inv.procurementDeadline + " "}{", projekto id: " + inv.projectId}</span>
// ));
export default InvestmentList