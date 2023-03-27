import * as React from "react";
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Snackbar,
    TextField,
} from "@mui/material";
import {Formik, Form} from "formik";
import { FieldFormik } from "../../form/FieldFormik";
import * as yup from 'yup';
import { useTranslation } from "react-i18next";
import { useSaveInvestment } from "../../../api/projectsApi";

const NewInvestmentModal = ({ open, onClose, projectId }) => {

const {t} = useTranslation();
const saveInvestment = useSaveInvestment();

const productValidationSchema = yup.object().shape({
    procurementDeadline: yup
    .date('Pabaigos data')
    .required()
})

    const [alertOpen, setAlertOpen] = React.useState(false);
    
    const initialValues = {
        id: null,
        procurementType: "",
        name: "",
        plannedCostAmount: 0,
        actualContractCosts: 0,
        fundingRate: 0,
        fundingAmount: 0,
        procurementDeadline: "",
        procurementState: "",
        projectId: parseInt(projectId)
    }

    const title = t("newInvModalTitle")

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

    const fieldNames = [
        {
            label: t("invPrType"),
            name: "procurementType",
            type: "select",
            select: procurementTypes
        },
        {
            label: t("invName"),
            name: "name",
            type: "text",
            select: []
        },
        {
            label: t("invEligibleCosts"),
            name: "plannedCostAmount",
            type: "text",
            select: []
        },
        {
            label: t("invActualCosts"),
            name: "actualContractCosts",
            type: "text",
            select: []
        },
        {
            label: t("invRate"),
            name: "fundingRate",
            type: "text",
            select: []
        },
        {
            label: t("invFundingAmount"),
            name: "fundingAmount",
            type: "text",
            select: []
        },
        {
            label: t("invDeadline"),
            name: "procurementDeadline",
            type: "date",
            select: []
        },
        {
            label: t("invState"),
            name: "procurementState",
            type: "select",
            select: procurementStates
        },
    ]

    return (
        <>
            <Dialog fullWidth="true" open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>

                <Formik initialValues={initialValues}
                        onSubmit={async (values, {setSubmitting}) => {
                            const newInvToAdd = {...initialValues, ...values};
                            console.log("formik id: " + projectId + " inv: "+newInvToAdd);
                            await saveInvestment(newInvToAdd)

                            setSubmitting(false)
                            onClose()
                            setAlertOpen(true)
                        }}
                        validationSchema={productValidationSchema}
                        >
                    {(props) => {
                        return (
                            <>
                                <DialogContent>
                                    <Form id="projectForm">
                                        {
                                            fieldNames.map((field) => {
                                                return <FieldFormik
                                                    key={field.name}
                                                    type={field.type}
                                                    select={field.select}
                                                    label={field.label}
                                                    name={field.name}
                                                    propsF={props} />
                                            })
                                        }
                                        <Button color="primary" variant="contained" type="submit" form="projectForm">
                                            Kurti
                                        </Button>
                                    </Form>

                                    {props.isSubmitting && <CircularProgress color="inherit"/>}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={onClose}>{t("cancel")}</Button>
                                    <Button disabled={props.isSubmitting} onClick={props.submitForm}>{t("save")}</Button>
                                </DialogActions>
                            </>
                        )
                    }
                    }
                </Formik>
            </Dialog>
            <Snackbar open={alertOpen}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      autoHideDuration={6000}
                      onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{width: '100%'}}>
                    Product created!!!
                </Alert>
            </Snackbar>
        </>
    )
}

export default NewInvestmentModal;
