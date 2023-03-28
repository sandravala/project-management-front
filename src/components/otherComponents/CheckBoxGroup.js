import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import Button from "@mui/material/Button";
import { getValue } from '@mui/system';

const CheckBoxGroup = ({rolesActive, userId, formLabel, helperText }) => {

// data =  {
//   admin: true/false,
//   pm: true/false,
//   client: true/false
// }

useEffect(() => {
  setState(rolesActive)
}, [rolesActive])

  const [state, setState] = React.useState({
    admin: rolesActive.admin,
    pm: rolesActive.pm,
    client: rolesActive.client
  });


  console.log("checkbox state");
  console.log( state);
  
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (async() => {

    const dataFiltered = Object.keys(state).filter(key => state[key]).map(key => key.toUpperCase());

    
    
    //const pushToArray = state.admin ? rolesToAdd.push("ADMIN") : state.pm ? rolesToAdd.push("PM") : state.client ? rolesToAdd.push("CLIENT") : null;

    console.log("user ");
    console.log(userId);
    console.log("roles");
    console.log( dataFiltered);
    // setValues({ ...values });
    // console.log(values);
    // await saveInvestment(invValues);
    // setRowIndex(-1);
})



  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">{formLabel}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={state.admin} onChange={handleChange} name="admin" />
            }
            label="ADMIN"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.pm} onChange={handleChange} name="pm" />
            }
            label="PM"
          />
          <FormControlLabel
            control={
              <Checkbox checked={state.client} onChange={handleChange} name="client" />
            }
            label="CLIENT"
          />
        </FormGroup>
        <FormHelperText>{"HELPER TEXT"}</FormHelperText>
      </FormControl>
      
      </Box>
      <Box sx={{ display: 'flex' }}><Button variant="contained" onClick={() => handleSubmit()}>submit change</Button></Box>
      </>
      );
      }

      export default CheckBoxGroup