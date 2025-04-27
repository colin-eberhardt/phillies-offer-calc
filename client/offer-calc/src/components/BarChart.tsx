import React from 'react';

interface IBarChart {
    width: number;
    height: number;
    data?:any
};

const BarChart = ({ width, height, data}:IBarChart) => {
    return (
        <div>
            some stuff here
        </div>
    );
}

export default BarChart;
