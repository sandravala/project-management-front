import * as React from 'react';
import {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Footer from "./Footer";
import Menu from "./Menu";
import Header from "./Header";
import PagesRoutes from "./PagesRoutes";


export default function Dashboard() {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const propPack = {
        drawerWidth: 200,
        open: open,
        toggleDrawer: toggle
    };


    return (

        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header {...propPack} />
            <Menu {...propPack} />

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth={false} sx={{mt: 4, mb: 4, maxWidth:'100%'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', height: "auto"}}>
                                <PagesRoutes/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Footer sx={{pt: 4}}/>
                </Container>
            </Box>
        </Box>
    );
}
