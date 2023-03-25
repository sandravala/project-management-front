import Grid from "@mui/material/Grid";
import {DoughnutChart} from "./DoghnutChart";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Countdown} from "./CountDownTimer";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";

export const GeneralProjectInfo = ({Item, Pr}) => {

    const twoTypographyElements = (text1, text2) => {
        return (
            <Stack>
                    <Typography component={'span'} variant="normal">{text1}</Typography>
                    <Typography component={'span'} variant="normal">{text2}</Typography>
            </Stack>
        )
    }

    const MyDivider = () => {
        return (
            <Divider sx={{
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'background.paper',
                mt: 1,
                mb: 1
            }}
            />
        )
    };

    const projectLength = new Date(Pr.endDate) - new Date(Pr.startDate);
    const timeElapsed = (new Date(Date.now()) - new Date(Pr.startDate)) / projectLength * 100;
    const timeLeft = (new Date(Pr.endDate) - new Date(Date.now())) / projectLength * 100;
    const iListLength = Pr.investmentList.length;

    const competition = "Konkursas";
    const procurementDone = "įvykdyta (pasirašyta sutartis)";

    const procurementCompetitionCounter = () => {
        let counter = 0;
            Pr.investmentList.map((inv) => {
                if (inv.procurementType === competition)
                    counter ++;
                return counter;
            })
        return counter;
    }

    const procurementStateCounter = () => {
        let counter = 0;
        Pr.investmentList.map((inv) => {
            if (inv.procurementState === procurementDone)
                counter ++;
            return counter;
        })
        return counter;
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
                {twoTypographyElements("PROJEKTO NR:", "PAVADINIMAS:")}
            </Grid>
            <Grid item xs={5.5}>
                {twoTypographyElements(Pr.projectNo, Pr.name)}
            </Grid>
            <Grid item xs={1.5}>
                {twoTypographyElements("SUTARTIS:", Pr.contractSigningDate)}
            </Grid>
            <Grid item xs={1.5}>
                {twoTypographyElements("PRADŽIA:", Pr.startDate)}
            </Grid>
            <Grid item xs={1.5}>
                {twoTypographyElements("PABAIGA:", Pr.endDate)}
            </Grid>
            <Grid item xs={12}>
                <MyDivider/>
            </Grid>

            <Grid item xs={4}>
                <Item>
                    <Typography component={'span'} variant="normal">PIRKIMO BUDAI</Typography>
                    <MyDivider/>
                    <DoughnutChart dataLabel="vnt." chartData={[procurementCompetitionCounter(), iListLength - procurementCompetitionCounter()]} colorLabels={["Konkursas", "Kita"]}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item>
                    <Typography component={'span'} variant="normal">PIRKIMU IVYKDYTA</Typography>
                    <MyDivider/>
                    <DoughnutChart dataLabel="vnt." chartData={[procurementStateCounter(), iListLength - procurementStateCounter()]} colorLabels={["Ivykdyti", "Neivykdyti"]}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item>
                    <Typography component={'span'} variant="normal">PROJEKTO TRUKME</Typography>
                    <MyDivider/>
                    <DoughnutChart dataLabel="%" chartData={[timeElapsed, timeLeft]} colorLabels={["Praejo laiko", "Liko laiko"]}/>
                </Item>
            </Grid>
        </Grid>
    );
}