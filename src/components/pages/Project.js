import { useNavigate, useParams} from "react-router-dom";
import { useSaveProject,
    useViewProject,
} from "../../api/projectsApi";
import {Countdown} from "./ProjectDashboard/CountDownTimer";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState} from "react";
import Typography from "@mui/material/Typography";
import InvestmentList from "./ProjectDashboard/InvestmentList";
import {GeneralProjectInfo} from "./ProjectDashboard/GeneralProjectInfo";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import IconButton from "@mui/material/IconButton";
import {Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useTranslation} from "react-i18next";

const Project = ({selectedTab}) => {

    const saveProject = useSaveProject();
    const navigate = useNavigate();
    const {id} = useParams();
    const { isLoading, isError, isSuccess, data, error } = useViewProject(id);
    const [tabValue, setTabValue] = useState(selectedTab);
    const {t} = useTranslation();

    const tabPath = ['', 'iList'];

    const handleChange = (event, newValue) => {
        window.history.replaceState({}, "", "/projects/" + id + "/" + tabPath[newValue]);
        setTabValue(newValue);
    };

    if(isLoading) {
        return <span>{t("projectLoading")}</span>
    }

    if(isError) {
        return <span>{t("error")} {error.message }</span>
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
            investmentList: data.investmentDtos
          }

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
                            <Typography component={'span'}>{children}</Typography>
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
                'aria-controls': `simple-tabpanel-${index}`
            };
        }


        return (

                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                            <Grid item xs={4}>
                                <IconButton aria-label="back" 
                                            sx={{
                                                padding: 0,
                                                color: "#0c2248",
                                                "& :hover": {
                                                    color: "#fd2929",
                                                    boxShadow: "rgb(126,134,157)",
                                                }
                                            }}
                                            onClick={() => navigate(-1)}
                                >
                                    <KeyboardBackspaceSharpIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Typography component={'span'} variant="upperCaseBold">{pr.projectAlias}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4}>
                                <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                                <Countdown endOfProject={pr.endDate}/>
                                </Box>
                            </Grid>
                        </Stack>
                        <Grid item xs={12}>
                            <Divider sx={{
                                width: '100%',
                                maxWidth: '100%',
                                bgcolor: 'background.paper',
                                paddingTop: 2
                            }}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleChange}
                                    centered>
                                    <Tab label={t("projectGeneralInfo")} {...a11yProps(0)} />
                                    <Tab label={t("projectProcurement")} {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabValue} index={0}>
                                <GeneralProjectInfo Item={Item} Pr={pr}/>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <InvestmentList coordinator={pr.coordinator}/>
                            </TabPanel>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
        )
    }
    }

export default Project