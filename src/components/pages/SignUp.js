import {
    Button,
    Dialog,
    Snackbar,
    DialogContent
} from "@mui/material";
import Box from "@mui/material/Box";
import {Field, Form, Formik} from "formik";
import * as React from "react";
import * as Yup from 'yup'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signUp} from "../../api/userApi";
import {userLoggedIn} from "../../store/slices/UserSlice";
import { FieldFormik } from '../otherComponents/FieldFormik';
import { useTranslation } from "react-i18next";
import MyAlert from "../otherComponents/MyAlert";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const SignUp = ({ open, onClose }) => {

const {t} = useTranslation();
const navigate = useNavigate();
const [alertOpen, setAlertOpen] = React.useState(false);
const [formOpen, setFormOpen] = React.useState(true);
const [alertMessage, setAlertMessage] = React.useState("");


const onAlertClick = () => {
    onClose();
    setAlertOpen(false);
    setTimeout(() => setFormOpen(true), 3000);
}

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const loginValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    surname: Yup.string()
        .required(),
    password: Yup.string()
        .matches(PASSWORD_REGEX)
        .required(),
    organisation: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
})


const fieldNames = [
    { label: t("userName"), name: "name", type: "text", select: [] },
    { label: t("userSurname"), name: "surname", type: "text", select: [] },
    { label: t("userPassword"), name: "password", type: "password", select: [] },
    { label: t("userOrganisation"), name: "organisation", type: "text", select: [] },
    { label: t("userEmail"), name: "email", type: "text", select: [] },
]

    return (
        <>
            <Dialog fullWidth={true} open={open} onClose={onClose}>

                            
                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        password: '',
                        organisation: '',
                        email: ''
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log("signup data", values)

                        const signUpResult = await signUp(values);
                        setAlertMessage(() => t(signUpResult))
                        setFormOpen(false)
                        setAlertOpen(true)
                        setSubmitting(false)
                    }}
                    validationSchema={loginValidationSchema}>
                    {(props) => (

                        <DialogContent>
                            {formOpen && (
                                <Form>
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
                                        <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
                                            {t("save")}
                                        </Button>
                                        <Button onClick={onClose} variant="outlined" sx={{ marginTop: 2, marginLeft: 2 }}>
                                            {t("cancel")}
                                        </Button>
                                    </Form>
                                    )}

                                    {alertOpen && ( <MyAlert message={alertMessage} handleClose={onAlertClick} /> )}
                        </DialogContent>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}


export default SignUp