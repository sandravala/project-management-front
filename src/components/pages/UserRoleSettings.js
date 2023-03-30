import  * as React from 'react';
import {Alert, Snackbar, TextField, MenuItem, Button} from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useState} from "react";
import { useTranslation } from 'react-i18next';
import { UseSetRoles, UseGetAllUsers } from '../../api/userApi';
import Grid from '@mui/material/Grid';

const UserRoleSettings = () => {

    const {data: userList} = UseGetAllUsers();
    const setNewRolesRefetch = UseSetRoles();
    const { t } = useTranslation();
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [selectedUserName, setSelectedUserName] = useState();
    const [ hasRoles, setHasRoles ] = useState({admin: false, pm: false, client: false});
    const [ alertOpen, setAlertOpen ] = useState(false);
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
        userHasRoles(select[e.target.value].userRoles);
        setSelectedUserId(select[e.target.value].userId);
        setSelectedUserName(select[e.target.value].userName)
    }

    const handleChangeChecbox = (event) => {
        setHasRoles({
          ...hasRoles,
          [event.target.name]: event.target.checked,
        });
      };

    const handleSubmit = () => {
        setNewRolesRefetch(selectedUserId,dataFiltered);
        setAlertOpen(!alertOpen);
    }

    const dataFiltered = Object.keys(hasRoles).filter(key => hasRoles[key]).map(key => key.toUpperCase());

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
        <Container sx={{ width: "500px", marginLeft: '0'}}>
        <Grid container spacing={2}>
        <Grid item xs={5}>
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
            </Grid>
            <Grid item xs={7}>

                <Box sx={{ display: 'flex' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">{t("rolesChoose")}</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={hasRoles.admin} onChange={handleChangeChecbox} name="admin" />
                                }
                                label="ADMIN"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={hasRoles.pm} onChange={handleChangeChecbox} name="pm" />
                                }
                                label="PM"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={hasRoles.client} onChange={handleChangeChecbox} name="client" />
                                }
                                label="CLIENT"
                            />
                        </FormGroup>
                        <FormHelperText>{t("rolesHelperText")}</FormHelperText>
                    </FormControl>

                </Box>
                </Grid>
                </Grid>
                <Box sx={{ display: 'flex' }}><Button variant="contained" onClick={() => handleSubmit()}>{t("save")}</Button></Box>
        </Container>
            <Snackbar open={alertOpen}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      autoHideDuration={15000}
                      onClose={() => setAlertOpen(false)}>
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{width: '100%'}}>
                    {t("rolesAlert") + selectedUserName + t("roles") + dataFiltered}
                </Alert>
            </Snackbar>
        </Box>
            );


}

export default UserRoleSettings