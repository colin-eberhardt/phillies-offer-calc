import React from 'react';
import { Group } from '@visx/group';
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";

import { ISalaryData } from '../types/dataTypes';

interface IBarChart {
    width: number;
    height: number;
    data?:any
};

const BarChart = ({ width, height, data}:IBarChart) => {
    // Define margins of chart area
    const margin = { top: 30, bottom: 50, left: 100, right: 10 };

    // Bounds of svg
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // Accessors to get values
    const x = (d:ISalaryData) => d["player-name"];
    const y = (d:ISalaryData) => d["player-salary"];

    // Color assignments. Not dynamic at the moment
    const color = (name:string) => {
        switch(name){
            case "Sanchez, Pablo":
                return "#9f0712"
            case "Qualifying Offer":
                return "gray"
            default:
                return "#d4d4d4"
        }
    };

    // Create scales for bar chart
    const xScale = scaleBand({
        range: [margin.left, width - margin.left - margin.right],
        round: true,
        domain: data.map(x),
        padding: 0.4,
      });
    const yScale = scaleLinear({
        range: [yMax, margin.top],
        round: true,
        domain: [0, Math.max(...data.map(y))],
    });

    return (
        <div className='flex-1 flex flex-col rounded-lg shadow-xl bg-white'>
            <div className='flex flex-col m-2 p-4'>
                <span className='flex-3 text-2xl font-bold'>Salary Comparison</span>
                <p className='text-sm'>Compare the Qualifying Offer to salaries of similar players.</p>
            </div>
            <svg width={width} height={height}>
                <Group>
                    {data.map((d:ISalaryData) => {
                        const player = x(d);
                        const barHeight = yMax - yScale(y(d));
                        return (
                            <Bar 
                                key={d.id}
                                x={xScale(player)}
                                width={xScale.bandwidth()}
                                y={yMax - barHeight}
                                height={barHeight}
                                fill={color(d['player-name'])}
                                rx={4}
                            />
                        );
                    })}
                </Group>
                <AxisLeft scale={yScale} left={margin.left} tickLabelProps={{fontSize:16}}/>
                <AxisBottom scale={xScale} top={height - margin.top - margin.bottom} numTicks={7} tickLabelProps={{fontSize: 12, angle: -45, dy: 25, dx: -25}}/>
            </svg>
      </div>
    );
};

export default BarChart;
