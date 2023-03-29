import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"
import Login from "./Login"
import Grid from '@mui/material/Grid';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = ({noAccess}) => {
    
    const { state } = useLocation();
    // const { greeting } = state; 
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto);
    const {t} = useTranslation();
    // const [isgreeting, setisGreeting] = useState(greeting);


    // console.log("greeting: ");
    // console.log(greeting);

    const LogedinHomeGreeting = user?.id && !noAccess && state?.greeting && (

                    <>
                        <div><Typography variant="upperCaseBold">{t("homeGreeting") + user.name}</Typography></div>
                        <div><iframe src="https://giphy.com/embed/VOPK1BqsMEJRS" width="400" height="480" allowFullScreen></iframe></div>
                    </>   
    )


    const NoAccess = user?.id && noAccess && (

        <h1>no access</h1>
    )

    const LogedInHome = user?.id && !noAccess && (
        
        <h1>this is home page</h1>
    )

    const PublicHome = !user?.id && ( <Login/> )



    return (

        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                {PublicHome || LogedinHomeGreeting || LogedInHome || NoAccess}
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    );
       
    }

export default Home