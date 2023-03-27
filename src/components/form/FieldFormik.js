import {Field} from 'formik';
import Box from "@mui/material/Box";
import {TextField, MenuItem} from "@mui/material";

export const FieldFormik = ({type, select, label, name, propsF}) => {

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

    return type === "text" ? simpleTextField : type === "date" ? dateField : selectField;

};
