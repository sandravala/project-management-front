import * as React from 'react';
import Box from '@mui/material/Box';


import Button from "@mui/material/Button";
import { getValue } from '@mui/system';
import { setRoles } from '../../api/userApi';


import { useEffect } from 'react';
const CheckBoxGroup = ({rolesActive, userId, formLabel, helperText, onSubmit }) => {

  // const setNewRoles = setRoles;


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
  
  


  

  const handleSubmit = (() => {

    

    // console.log("data filtered");
    // console.log({dataFiltered});

    // // setNewRoles(userId, dataFiltered);



    // console.log("user ");
    // console.log(userId);
    // console.log("roles");
    // console.log( dataFiltered);

})



  return (
    <>

      </>
      );
      }

      export default CheckBoxGroup