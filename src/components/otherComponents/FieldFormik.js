import {Field} from 'formik';
import * as React from "react";
import Box from "@mui/material/Box";
import {TextField, MenuItem} from "@mui/material";

import IconButton from '@mui/material/IconButton';

import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




export const FieldFormik = ({type, select, label, name, propsF}) => {


    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault()};


    const selectField = (
        <>
            <Field
            label={label}
            name={name}
            variant="standard"
            fullWidth
            margin="normal"
            select
            error={!!propsF.errors[name] && propsF.touched[name]}
            helperText={propsF.touched[name] && propsF.errors[name]}
            as={TextField}
        >
                {select.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
        </Field>
        <Box pb={2.5} />
        </>
    )

    const dateField = (
        <>
        <Field  
                label={label}
               name={name}
               variant="standard"
               type="date"
               InputProps={{inputProps: { min: "2010-05-01", max: "2070-05-04"} }}
               fullWidth
               margin="normal"
               InputLabelProps={{ shrink: true }}
               error={!!propsF.errors[name] && propsF.touched[name]}
               helperText={propsF.touched[name] && propsF.errors[name]}
               as={TextField}
        />
        <Box pb={2.5} />
        </>
    )

    const simpleTextField = (        
        <>
        <Field
                label={label}
                name={name}
                variant="standard"
                fullWidth
                margin="normal"
                error={!!propsF.errors[name] && propsF.touched[name]}
                helperText={propsF.touched[name] && propsF.errors[name]}
                as={TextField}
        />
        <Box pb={2.5} />
        </>)

        const passwordField = (
            <>
            <Field
                    label={label}
                    name={name}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    error={!!propsF.errors[name] && propsF.touched[name]}
                    helperText={propsF.touched[name] && propsF.errors[name]}
                    InputProps={{
                        endAdornment : 
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          
                      }}
                    
                    as={TextField}
            />
            <Box pb={2.5} />
            </>


        )

    return type === "text" ? simpleTextField : type === "date" ? dateField : type === "select" ? selectField : passwordField;

};
