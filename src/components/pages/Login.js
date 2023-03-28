import { Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Field, Form, Formik} from "formik";
import * as React from "react";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../api/userApi";
import {userLoggedIn} from "../../store/slices/UserSlice";
import { useTranslation } from "react-i18next";
import {useState} from "react";
import SignUp from "./SignUp";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(({user}) => user?.userDto);
    const {t} = useTranslation();
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .required()
    })


    return (
        <>

            <Box
                noValidate
                autoComplete="off"
                sx={{
                    width: 300
                }}
            >

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log("login data", values)

                        const user = await login(values)
                        console.log("user", user)
                        dispatch(userLoggedIn(user))

                        setSubmitting(false)

                        navigate("/")
                    }}
                    validationSchema={loginValidationSchema}>
                    {({errors, touched}) => (
                        <Form style={{
                            alignItems: "center"
                        }}>
                            <Field id="email"
                                   name="email"
                                   label="Email"
                                   variant="standard"
                                   fullWidth
                                   error={!!errors.email && touched.email}
                                   helperText={touched.email && errors.email}
                                   as={TextField}
                            />
                            <Field id="password"
                                   name="password"
                                   label="Password"
                                   type="password"
                                   variant="standard"
                                   fullWidth
                                   error={!!errors.password && touched.password}
                                   helperText={touched.password && errors.password}
                                   as={TextField}
                            />
                            <Button type="submit" sx={{
                                marginTop: 2
                            }} variant="contained">{t("login")}</Button>
                            <SignUp open={openSignUp} onClose={() => setOpenSignUp(false)} onAlertClose={() => setOpenAlert(false)}/>
                            <Button 
                            type="button" 
                            sx={{
                                marginTop: 2,
                                marginLeft: 2
                            }} 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => setOpenSignUp(true)}
                            >
                                {t("signup")}
                            </Button>
                        </Form>
                    )}
                </Formik>
                
            </Box>

        </>
    )
}


export default Login