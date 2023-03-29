import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from "@mui/material/Button";
import {userLoggedOut} from "../../store/slices/UserSlice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from "@mui/material/Tooltip";
import {TextField, tooltipClasses} from "@mui/material";
import {i18n} from "../../index"
import {Translation, useTranslation} from "react-i18next";
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";

const Header = ({drawerWidth, open, toggleDrawer}) => {

    const navigate = useNavigate()
    const user = useSelector(({persistedUser}) => persistedUser?.userDto);
    const dispatch = useDispatch()
    const {t} = useTranslation();


    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            // color: 'rgba(94,86,86,0.87)',
            maxWidth: 220,
            border: '1px solid #dadde9',
            textTransform: "uppercase"
        },
    }));

    const loginButton = !user && (
        <StyledTooltip
            title={
                <React.Fragment>
                    <Typography variant="normal">{t("login")}</Typography>
                </React.Fragment>
            }
            placement="bottom-start"
        >
            <Button
                variant="contained"
                startIcon={<VpnKeyIcon/>}
                onClick={() => navigate("/home", {state: {greeting: false}})}
                color="lighterPrimary"
                sx={{
                    margin: 0,
                    padding: 2
                }}
            />
        </StyledTooltip>
    )

    const logout = () => {
        dispatch(userLoggedOut())
        navigate("/home", {state: {greeting: false}})
    }

    const logoutButton = user && (
        <>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{
                    mr: 3
                }}
            >
                {user.name + " " + user.surname}
            </Typography>
            <StyledTooltip
                title={
                    <React.Fragment>
                        <Typography variant="normal">{t("logout")}</Typography>
                    </React.Fragment>
                }
                placement="bottom-start"
            >
                <Button
                    variant="contained"
                    startIcon={<ExitToAppIcon/>}
                    onClick={logout}
                    color="lighterPrimary"
                    sx={{
                        margin: 0,
                        padding: 2
                    }}
                />
            </StyledTooltip>
        </>
    )

    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    <Link underline="none" color="inherit" component={RouterLink} to="/">
                        {t('siteTitle')}
                    </Link>
                </Typography>
                {loginButton || logoutButton}

            </Toolbar>
        </AppBar>
    )

}

export default Header

