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
    const margin = { top: 50, bottom: 35, left: 100, right: 10 };

    // Bounds of svg
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // Accessors to get values
    const x = (d:ISalaryData) => d["player-name"];
    const y = (d:ISalaryData) => d["player-salary"];

    // Color assignments
    const color = (id:string) => {
        switch(id){
            case "0":
                return "#9f0712"
            case "1":
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
        <div className='max-h-[700px]'>
            <div className='text-2xl font-bold bg-gray-200 w-full py-4'>Salary Comparison</div>
            <svg width={width} height={height}>
                <Group>
                    {data.map((d) => {
                        const player = x(d);
                        const barHeight = yMax - yScale(y(d));
                        return (
                            <Bar 
                                key={`${player}-bar`}
                                x={xScale(player)}
                                width={xScale.bandwidth()}
                                y={yMax - barHeight}
                                height={barHeight}
                                fill={color(d.id)}
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
