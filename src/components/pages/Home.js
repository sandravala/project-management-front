import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import Login from "./Login"
import Grid from '@mui/material/Grid';

const Home = () => {
    
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto);
    const {t} = useTranslation();

    const LogedinHome = user?.id && (
        <>
            <div><Typography variant="upperCaseBold">{t("homeGreeting") + user.name}</Typography></div>
            <div><iframe src="https://giphy.com/embed/VOPK1BqsMEJRS" width="400" height="480" allowFullScreen></iframe></div>
        </>
    )

    const PublicHome = !user?.id && ( <Login/> )



    return (

        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                {PublicHome || LogedinHome}
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    );
       
    }

export default Home