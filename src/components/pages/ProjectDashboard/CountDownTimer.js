import React, { useEffect, useState } from "react";

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
        <>
            <p>Deadline comes in</p>
            <p className="counter">
                <span>{yearDiff}Y </span>
                <span>{monthDiff}M </span>
                <span>{dayDiff}D </span>

            </p>
        </>
    );
};