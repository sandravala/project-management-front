import  * as React from 'react';
import { Form, Formik, Field} from 'formik';
import * as yup from 'yup';
import {Alert, Snackbar, TextField, MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useSaveProject} from "../../api/projectsApi";
import {useState} from "react";
import { FieldFormik } from '../otherComponents/FieldFormik';
import { useTranslation } from 'react-i18next';

const NewProject = () => {

    const saveProject = useSaveProject();
    const [alertOpen, setAlertOpen] = useState(false);
    const [savedProjectAlias, setSavedProjectAlias] = useState("");
    const {t} = useTranslation();

const validationSchema = yup.object({
    projectNo: yup
        .string()
        .required(t("required")),
    name: yup
        .string()
        .required(t("required")),
    client: yup
        .string()
        .required(t("required")),
    coordinator: yup
        .string()
        .email()
        .required(t("required")),
    projectAlias: yup
        .string()
        .matches(/^\d+\.\d+\.\s[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, t("yupAlias"))
        .required(t("required")),
    startDate: yup
        .date(),
    endDate: yup
        .date(),
    contractSigningDate: yup
        .date(),
    eligibleCosts: yup
        .number()
        .required(t("required")),
    fundingRate: yup
        .number()
        .max(1, t("yupFundingRate"))
        .required(t("required")),
    grantAmount: yup
        .number()
        .max(yup.ref('eligibleCosts'), 'Finansavimas negali būti didesnis už TFI!')
        .required(t("required")),
    indirectCostRate: yup
        .string(),

});

const fieldNames = [
    { label: t("projectNo"), name: "projectNo", type: "text", select: []  },
    { label: t("projectName"), name: "name", type: "text", select: []  },
    { label: t("client"), name: "client", type: "text", select: []  },
    { label: t("coordinator"), name: "coordinator", type: "text", select: []  },
    { label: t("projectAlias"), name: "projectAlias", type: "text", select: []  },
    { label: t("startDate"), name: "startDate", type: "date", select: []  },
    { label: t("endDate"), name: "endDate", type: "date", select: []  },
    { label: t("contractSigningDate"), name: "contractSigningDate", type: "date", select: []  },
    { label: t("invEligibleCosts"), name: "eligibleCosts", type: "text", select: []  },
    { label: t("invRate"), name: "fundingRate", type: "text", select: [] },
    { label: t("invFundingAmount"), name: "grantAmount", type: "text", select: []  },
    { label: t("indirectCostRate"), name: "indirectCostRate", type: "text", select: []  },
];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
        <Container sx={{ width: "500px", marginLeft: '0'}}>
            <Formik
                initialValues={{
                    projectNo: "",
                    name: "",
                    client: "",
                    coordinator: "",
                    projectAlias: "",
                    startDate: "",
                    endDate: "",
                    contractSigningDate: "",
                    eligibleCosts: 0,
                    fundingRate: 0,
                    grantAmount: 0,
                    indirectCostRate: 0
                }}

                onSubmit={async (values, { setSubmitting }) => {
                    const projectToSave = {
                        projectNo: values.projectNo,
                        name: values.name,
                        client: values.client,
                        coordinator: values.coordinator,
                        projectAlias: values.projectAlias,
                        startDate: values.startDate,
                        endDate: values.endDate,
                        contractSigningDate: values.contractSigningDate,
                        eligibleCosts: parseInt(values.eligibleCosts),
                        fundingRate: parseInt(values.fundingRate),
                        grantAmount: parseInt(values.grantAmount),
                        indirectCostRate: parseInt(values.indirectCostRate)
                    };
                    await saveProject(projectToSave);
                    setSavedProjectAlias(projectToSave.projectAlias);
                    setSubmitting(false)
                    setAlertOpen(true)
                }}

                validationSchema={validationSchema}
            >
                {(props) => {
                    return (
                        <Form id="projectForm">
                            {
                                fieldNames.map((field) => {
                                    return <FieldFormik 
                                    key={field.name}
                                    type={field.type} 
                                    select={field.select} 
                                    label={field.label} 
                                    name={field.name}
                                    propsF={props}/>
                                })
                            }                           
                            <Button color="primary" variant="contained" type="submit" form="projectForm">
                                {t("save")}
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
            <Snackbar open={alertOpen}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      autoHideDuration={15000}
                      onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{width: '100%'}}>
                    {t("project") + savedProjectAlias + t("created")}
                </Alert>
            </Snackbar>
        </Box>
            );
};

export default NewProject
