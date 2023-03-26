import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({colorLabels, dataLabel, chartData}) => {

    const dataSet = {
        labels: colorLabels,
    datasets: [
        {
            label: dataLabel,
            data: chartData,
            backgroundColor: [
                'rgb(192,31,31)',
                'rgb(12,34,72)',
            ],
        },
    ],
};

    return <Doughnut data={dataSet} />;

}
