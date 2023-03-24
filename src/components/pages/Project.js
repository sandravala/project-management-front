import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {
    useInvestmentList, useSaveProject,
    useViewProject,
} from "../../api/projectsApi";
import {Countdown} from "./ProjectDashboard/CountDownTimer";
import {DoughnutChart} from "./ProjectDashboard/DoghnutChart";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
import InvestmentList from "./InvestmentList";


const Project = () => {

    const saveProject = useSaveProject();
    const navigate = useNavigate();
    const {id} = useParams();
    const { isLoading, isError, isSuccess, data, error } = useViewProject(id);
    const [tabValue, setTabValue] = useState(0);

    const tabPath = ['', 'iList', ''];

    useEffect(() => {
        setTabValue(+tabPath[window.location.pathname.substring(1)] || 0);
    }, []);

    const handleChange = (event, newValue) => {
        window.history.replaceState({}, "", "/projects/" + id + "/" + tabPath[newValue]);
        setTabValue(newValue);
    };

    if(isLoading) {
        return <span>Loading...</span>
    }

    if(isError) {
        return <span>Error: {error.message }</span>
    }

    if(isSuccess) {
        const pr = {
            id: data.id,
            projectNo: data.projectNo,
            name: data.name,
            client: data.client,
            coordinator: data.coordinator,
            projectAlias: data.projectAlias,
            startDate: data.startDate,
            endDate: data.endDate,
            contractSigningDate: data.contractSigningDate,
            eligibleCosts: data.eligibleCosts,
            fundingRate: data.fundingRate,
            grantAmount: data.grantAmount,
            indirectCostRate: data.indirectCostRate,
          }
        const investmentList = data.investmentDtos;

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }));

        function TabPanel(props) {
            const { children, value, index, ...other } = props;

            return (
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    {...other}
                >
                    {value === index && (
                        <Box sx={{ p: 3 }}>
                            <Typography>{children}</Typography>
                        </Box>
                    )}
                </div>
            );
        }

        TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        };

        function a11yProps(index) {
            return {
                id: `simple-tab-${index}`,
                'aria-controls': `simple-tabpanel-${index}`,
            };
        }


        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <h1>{pr.projectAlias}</h1>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleChange}
                                        centered>
                                        <Tab label="BENDRA INFORMACIJA" {...a11yProps(0)} />
                                        <Tab label="PIRKIMAI" {...a11yProps(1)} />
                                        <Tab label="TERMINAI" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={tabValue} index={0}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Item>
                                                <DoughnutChart dataLabel="%" chartData={[30, 70]} colorLabels={["Isisavinta", "likutis"]}/>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item>
                                                <DoughnutChart dataLabel="%" chartData={[30, 70]} colorLabels={["Isisavinta", "likutis"]}/>
                                            </Item>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Item>
                                                <DoughnutChart dataLabel="%" chartData={[30, 70]} colorLabels={["Isisavinta", "likutis"]}/>
                                            </Item>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    <InvestmentList/>
                                </TabPanel>
                                <TabPanel value={tabValue} index={2}>
                                    Item Three
                                </TabPanel>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>

                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>xs=8</Item>
                        </Grid>
                    </Grid>
                </Box>
            <h1>

                 , {pr.endDate}
                {
                    investmentList.map((inv, i) =>(
                        <p key={i}>{inv.name + " "}{inv.procurementDeadline} </p>
                    ))
                }
                {/*projektas {id} = {project.projectAlias}*/}


            </h1>
            <Countdown endOfProject={pr.endDate}/>

            </>

            //darysiu su mui tabs. gal virsuj atskiras paperis ar kitas elementas, kuris savyje laiko projekto pavadinima ir kitus butinus elementus, pvz datas, numeri, kontaktus ir pan.
            // o sone - tabai: investicijos, pirkimai, MP ir pan. gal investiciju net nebus tabo, tiesiog pagrindinis puslapis projekto su inv sarasu
        )
    }
    }

export default Project