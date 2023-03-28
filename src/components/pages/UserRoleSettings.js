import  * as React from 'react';
import { Form, Formik, Field} from 'formik';
import * as yup from 'yup';
import {Alert, Snackbar, TextField, MenuItem} from "@mui/material";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useSaveProject} from "../../api/projectsApi";
import {useState} from "react";
import { FieldFormik } from '../otherComponents/FieldFormik';
import { useTranslation } from 'react-i18next';
import { getAllUsers, UseGetAllUsers } from '../../api/userApi';
import { IconButtonStyled } from '../otherComponents/IconButtonStyled';
import CheckBoxGroup from '../otherComponents/CheckBoxGroup';
import { use } from 'i18next';
import { useEffect } from 'react';

const UserRoleSettings = () => {
    const {data: userList, isSuccess} = UseGetAllUsers();
    const { t } = useTranslation();
    const [selectedUserId, setSelectedUserId] = useState();
    const [values, setValues] = useState({});
    const [ userRoles, setUserRoles ] = useState(["ADMIN", "PM", "CLIENT"]);
    const [ hasRoles, setHasRoles ] = useState({admin: false, pm: false, client: false});

    const select = [{userId: 0, userName: "Pasirinkite vartotoją", userRoles: []}];
    const usersToSelect = () => {
                
        userList && userList.map(user => {
            
            select.push({
                userId: user.id,
                userName: user.name + " " + user.surname + ", " + user.organisation,
                userRoles: [...user.roles]
            });
        })
        return select;
    }

    const userHasRoles = (userRoles) => {

        const isAdmin = userRoles.indexOf("ADMIN") >= 0;
        const isPm = userRoles.indexOf("PM") >= 0;
        const isClient = userRoles.indexOf("CLIENT") >= 0;

        return setHasRoles({admin: isAdmin, pm: isPm, client: isClient });
        
    }



    const handleChangeValues = (e) => {
        setUserRoles(select[e.target.value].userRoles);
        userHasRoles(select[e.target.value].userRoles);
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log("handle change values");
        console.log({ ...values, [e.target.name]: e.target.value });

    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
        <Container sx={{ width: "500px", marginLeft: '0'}}>
            
            <TextField
            size="small"
            select
            defaultValue={0}
            fullWidth
            id={"user"}
            name={"user"}
            onChange={handleChangeValues}
        >
            {usersToSelect().map((option) => (
                <MenuItem key={option.userId} value={option.userId}>
                    {option.userName}
                </MenuItem>
            ))}
            </TextField>


            <CheckBoxGroup rolesActive={hasRoles} formLabel={"pasirinkti reikiamas roles"} helperText={"helper text"} userId={values.user}/>








        </Container>
            {/* <Snackbar open={alertOpen}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      autoHideDuration={15000}
                      onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{width: '100%'}}>
                    {"Projektas " + savedProjectAlias + " sukurtas!"}
                </Alert>
            </Snackbar> */}
        </Box>
            );


}

export default UserRoleSettings