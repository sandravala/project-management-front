import  * as React from 'react';
import { Form, Formik, Field} from 'formik';
import * as yup from 'yup';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useSaveProject} from "../../api/projectsApi";




const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
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
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
        <Container sx={{ width: "500px", marginLeft: '0'}}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const newProject = {
                        projectNo: "pr number",
                        name: "pr name",
                        client: "pr client",
                        coordinator: "pr coord",
                        projectAlias: "X.X. pr",
                        startDate: "2021-11-23",
                        endDate: "2022-11-01",
                        contractSigningDate: "2021-11-23",
                        eligibleCosts: 100,
                        fundingRate: 0.4,
                        grantAmount: 40,
                        indirectCostRate: 0,
                    };
                    console.log(saveProject(newProject));
                        console.log(values);

                }}

                //      onSubmit={async (product, {setSubmitting}) => {
                //                             await createProduct(product)
                //                             setSubmitting(false)
                //                             onClose()
                //                             fetchProducts()
                //                             setAlertOpen(true)
                //                         }}

                validationSchema={validationSchema}
            >
                {(props) => {
                    return (
                        <Form id="projectForm">
                            <FieldFormik name="email" propsF={props}/>
                            <FieldFormik name="password" propsF={props}/>

                            <Button color="primary" variant="contained" type="submit" form="projectForm">
                                Kurti
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
        </Box>
            );
};

export default NewProject
