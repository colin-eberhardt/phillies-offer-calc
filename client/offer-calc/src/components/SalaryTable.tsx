import React, { useState, useEffect } from 'react';
import { ISalaryData } from '../types/dataTypes';

interface ISalaryTable {
    data: ISalaryData[],
    selectedPlayers?: number[];
    handleAddPlayer?: () => void;
};

// Use some i18n translation eventually
const columnHeaderMap = new Map([
    ["player-name", "Player"],
    ["player-salary", "Salary"],
    ["player-year", "Year"],
    ["player-level", "Level"]
]);

// Table to show raw salary data. Users can select individual rows, then click 'Compare' and view their salaries against our player to see "market value"
const SalaryTable = ({data, selectedPlayers, handleAddPlayer}: ISalaryTable) => {
    // Create columns, remove id
    const columnHeaders = Object.keys(data[0]).filter((col:string) => col !== 'id');

    return (
        <table className='text-black w-full table-auto text-left rtl:text-right'>
            <thead className='bg-gray-200 h-12'>
                <tr>
                    {columnHeaders.map((column:string) => 
                        <th 
                            key={column}
                            scope='col'
                            className="px-6 py-3">
                                {columnHeaderMap.get(column)}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((record:any) => 
                    <tr key={record.id} className='odd:bg-white even:bg-gray-100'>
                        {Object.entries(record).map(([key, value]:any[]) => {
                            if(key !=='id'){
                                let textContent = key ==='player-salary' ? `$${new Intl.NumberFormat().format(value)}` : value;
                                return <td key={value} className="px-6 py-2">{textContent}</td>
                            }}
                        )}
                        <td>
                            {/* <button
                                className='bg-transparent text-white'
                                onClick={handleAddPlayer}
                                value={record.id}
                            >
                                {selectedPlayers.includes(record.id) ? '✅': '➕'}
                            </button> */}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default SalaryTable;
