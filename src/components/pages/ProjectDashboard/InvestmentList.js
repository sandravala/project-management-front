import { useParams} from "react-router-dom";
import {
    useDeleteInv,
    useInvestmentList, 
    useSaveInvestment
} from "../../../api/projectsApi";
import * as React from "react";
import {
    Button,
    CircularProgress, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";

import {useState} from "react";
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DoneOutlineSharpIcon from '@mui/icons-material/DoneOutlineSharp';
import {useTranslation} from "react-i18next";
import NewInvestmentModal from "./NewInvestmentModal";
import Box from "@mui/material/Box";
import { useSelector} from "react-redux";
import { IconButtonStyled } from "../../otherComponents/IconButtonStyled";
import FieldSimple from "../../otherComponents/FieldSimple";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const InvestmentList = () => {

    const user = useSelector(({user}) => user?.userDto)
    const {id} = useParams()
    const { isLoading, data } = useInvestmentList(id)
    const saveInvestment = useSaveInvestment()
    const deleteInvestment = useDeleteInv()
    
    const [rowIndex, setRowIndex] = useState(-1)
    const [openInvModal, setOpenInvModal] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
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
    const {t} = useTranslation()


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
        Object.assign(invValues, initialValues);
        setInvValues(invValues);
        setRowIndex(rowIndex);
    }

    const handleChangeValues = (e) => {
        setInvValues({ ...invValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (async(invId) => {
        setInvValues({ ...invValues, [id]: invId });
        await saveInvestment(invValues);
        setRowIndex(-1);
    })

    const handleDelete = ((invId) => {
        deleteInvestment(invId);
    })

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
        { id: 4, field: "fundingAmount", label: t("invFundingAmount"), flex: 0.3, align: "left" },
        { id: 5, field: "procurementDeadline", label: t("invDeadline"), flex: 0.3, align: "left" },
        { id: 6, field: "procurementState", label: t("invState"), flex: 1, align: "left" },
    ];

    return (
        loadingElement ||
        <Paper sx={{ width: '100%', height: '70%', overflow: 'hidden' }}>
            <NewInvestmentModal open={openInvModal} onClose={() => setOpenInvModal(false)} projectId={id} />
            <div style={{ marginTop: "10px", marginBottom: "10px", textAlign: "right" }}>
                {user?.id && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{
                            border: "2px solid"
                        }}
                        onClick={() => {
                            setOpenInvModal(true);
                        }}
                    >
                        {t("addNewInv")}
                    </Button>
                )}
            </div>
            
            <Box sx={{ overflow: "auto" }}>
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
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
                                    {/* { user?.id && ( */}
                                    <TableCell
                                        key={7}
                                        align="center"
                                        style={{ flex: 0.5 }}
                                    >
                                        {t("invEdit")}
                                    </TableCell>
                                    {/* )} */}
                                    {/* { user?.id && ( */}
                                    <TableCell
                                        key={8}
                                        align="center"
                                        style={{ flex: 0.5 }}
                                    >
                                        {t("delete")}
                                    </TableCell>
                                    {/* )} */}
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index + row.name}>
                                                {columns.map((column) => {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <FieldSimple
                                                                rowData={row[column.field]}
                                                                columnName={column.field}
                                                                selectList={[procurementStates, procurementTypes]}
                                                                handleChangeValues={handleChangeValues}
                                                                i={index}
                                                                row={rowIndex}
                                                            />
                                                        </TableCell>
                                                    );
                                                })}

                                                {/* { user?.id && ( */}
                                                <TableCell key={7} align="center" >
                                                    {
                                                        index !== rowIndex ?
                                                            <IconButtonStyled icon={<EditSharpIcon />} OnClickFunction={() => handleEdit(index, row)} />
                                                            :
                                                            <IconButtonStyled icon={<DoneOutlineSharpIcon />} OnClickFunction={() => handleSubmit(row.id)} />
                                                    }
                                                </TableCell>
                                                {/* )} */}
                                                {/* { user?.id && ( */}
                                                <TableCell key={8} align="center" >
                                                            <IconButtonStyled icon={<DeleteOutlineOutlinedIcon />} OnClickFunction={() => handleDelete(row.id)} />
                                                </TableCell>
                                                {/* )} */}
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
                </Box>
            </Box>
        </Paper>
    );

}


export default InvestmentList