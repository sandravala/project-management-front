import React, { useEffect, useState } from "react";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

export const Countdown = ({endOfProject}) => {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const targetTime = new Date(endOfProject);
    const today = new Date(currentTime);


    const startYear = today.getFullYear();

    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = targetTime.getFullYear() - startYear;

    let monthDiff = targetTime.getMonth() - today.getMonth();

    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    let dayDiff = targetTime.getDate() - today.getDate();

    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[today.getMonth()];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        });

        return () => clearInterval(interval);
    }, []);

    return (
            <Stack direction="row" spacing={2} sx={{ alignItems: "end" }}>
                <Typography component={'span'} variant="normal">IKI PABAIGOS LIKO:</Typography>
                <Typography component={'span'} variant="countdown">{yearDiff}</Typography>
                <Typography component={'span'} variant="normal">M</Typography>
                <Typography component={'span'} variant="countdown">{monthDiff} </Typography>
                <Typography component={'span'} variant="normal">MĖN</Typography>
                <Typography component={'span'} variant="countdown">{dayDiff} </Typography>
                <Typography component={'span'} variant="normal">D</Typography>
            </Stack>
    );
};