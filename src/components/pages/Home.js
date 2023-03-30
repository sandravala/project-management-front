import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import Login from "./Login"
import Grid from '@mui/material/Grid';
import { useLocation } from "react-router-dom";
import MyList from "../otherComponents/MyList";

const Home = ({noAccess}) => {
    
    const { state } = useLocation();
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto);
    const {t} = useTranslation();

    const LogedinHomeGreeting = user?.id && state?.greeting && !noAccess && (

                    <>
                        <div><Typography variant="upperCaseBold">{t("homeGreeting") + user.name}</Typography></div>
                        <div><iframe src="https://giphy.com/embed/VOPK1BqsMEJRS" width="400" height="480" allowFullScreen></iframe></div>
                    </>   
    )


    const NoAccess = user?.id && noAccess && (

        <h1>{t("noAccess")}</h1>
    )

    const LogedInHome = user?.id && !noAccess && (
        <>
        <MyList 
        items={[
            { primary: t("hItemOne"), secondary: "" },
            { primary: t("hItemTwo"), secondary: t("rolesNeeded") + "ADMIN" },
            { primary: t("hItemTree"), secondary: t("rolesNeeded") + "ADMIN" },
            { primary: t("hItemFour"), secondary: t("rolesNeeded") + "ADMIN, PM, CLIENT" },
            { primary: t("hItemFive"), secondary: t("rolesNeeded") + "ADMIN, PM" },
            { primary: t("hItemSix"), secondary: t("rolesNeeded") + "ADMIN, PM, CLIENT" },
            { primary: t("hItemSeven"), secondary: t("rolesNeeded") + "ADMIN" },
            { primary: t("hItemEight"), secondary: t("rolesNeeded") + "ADMIN" },
            { primary: t("hItemNine"), secondary: "" },
        ]} 
        header={t("homePage")}/>
        </>
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