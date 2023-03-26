import  * as React from 'react';
import { Form, Formik, Field} from 'formik';
import * as yup from 'yup';
import {Alert, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useSaveProject} from "../../api/projectsApi";
import {useState} from "react";




const validationSchema = yup.object({
    projectNo: yup
        .string('Projekto numeris')
        .required('privaloma nurodyti'),
    name: yup
        .string('Pilnas projekto pavadinimas')
        .required('privaloma nurodyti'),
    client: yup
        .string('Kliento pavadinimas')
        .required('privaloma nurodyti'),
    coordinator: yup
        .string('PV emailas')
        .email('reikia nurodyti emailą')
        .required('privaloma nurodyti'),
    projectAlias: yup
        .string('Vidinis projekto pavadinimas')
        .matches(/^\d+\.\d+\.\s[a-zA-Z]+(?:\s[a-zA-Z]+)*$/)
        .required('privaloma nurodyti'),
    startDate: yup
        .date('Pradžios data'),
    endDate: yup
        .date('Pabaigos data'),
    contractSigningDate: yup
        .date('Sutarties data'),
    eligibleCosts: yup
        .number('TFI')
        .required('privaloma nurodyti'),
    fundingRate: yup
        .number('Finansavimo intensyvumas')
        .max(1, 'Nurodyti 0.<...> formatu')
        .required('privaloma nurodyti'),
    grantAmount: yup
        .number('Finansavimo suma')
        .max(yup.ref('eligibleCosts'), 'Finansavimas negali būti didesnis už TFI!')
        .required('privaloma nurodyti'),
    indirectCostRate: yup
        .string('Netiesioginės išlaidos'),

});

export const FieldFormik = ({name, propsF}) => {

    const fieldName = name.toString().charAt(0).toUpperCase() + name.toString().slice(1);

    return (
        <>
            <Field label={fieldName}
                   name={name}
                   variant="standard"
                   fullWidth
                   margin="normal"
                   error={!!propsF.errors[name] && propsF.touched[name]}
                   helperText={propsF.touched[name] && propsF.errors[name]}
                   as={TextField}
            />
            <Box pb={2.5} />
        </>
    )
};

const NewProject = () => {
    const saveProject = useSaveProject();
    const [alertOpen, setAlertOpen] = useState(false);
    const [savedProjectAlias, setSavedProjectAlias] = useState("");
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

                            <FieldFormik name="projectNo" propsF={props}/>
                            <FieldFormik name="name" propsF={props}/>
                            <FieldFormik name="client" propsF={props}/>
                            <FieldFormik name="coordinator" propsF={props}/>
                            <FieldFormik name="projectAlias" propsF={props}/>
                            <FieldFormik name="startDate" propsF={props}/>
                            <FieldFormik name="endDate" propsF={props}/>
                            <FieldFormik name="contractSigningDate" propsF={props}/>
                            <FieldFormik name="eligibleCosts" propsF={props}/>
                            <FieldFormik name="fundingRate" propsF={props}/>
                            <FieldFormik name="grantAmount" propsF={props}/>
                            <FieldFormik name="indirectCostRate" propsF={props}/>

                            <Button color="primary" variant="contained" type="submit" form="projectForm">
                                Kurti
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
                    {"Projektas " + savedProjectAlias + " sukurtas!"}
                </Alert>
            </Snackbar>
        </Box>
            );
};

export default NewProject
