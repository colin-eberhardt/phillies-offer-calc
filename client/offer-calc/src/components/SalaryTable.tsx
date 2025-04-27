import React, { useState, useEffect } from 'react';
import { ISalaryData } from '../types/dataTypes';

interface ISalaryTableContainer {
    data: ISalaryData[];
    handleComparePlayers: (selectedPlayers: string[]) => void;
    handleReset: () => void;
}

interface ISalaryTable {
    data: ISalaryData[],
    selectedPlayers: string[];
    handleAddPlayer: (e:any) => void;
};

// Use some i18n translation eventually
const columnHeaderMap = new Map([
    ["player-name", "Player"],
    ["player-salary", "Salary"],
    ["player-year", "Year"],
    ["player-level", "Level"]
]);

// Table to show raw salary data. Users can select individual rows, then click 'Compare' and view their salaries against our player to see "market value"
const SalaryTable = ({data, selectedPlayers=[], handleAddPlayer}: ISalaryTable) => {
    // Create columns, remove id
    const columnHeaders = Object.keys(data[0]).filter((col:string) => col !== 'id');

    return (
        <table className='text-black table-auto text-left rtl:text-right'>
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
                    <th
                        key="add-player"
                        scope="col"
                        className="px-6 py-3"
                    />
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
                            <button
                                className='bg-transparent text-white cursor-pointer'
                                onClick={handleAddPlayer}
                                value={record.id}
                            >
                                {selectedPlayers.includes(record.id) ? '✅': '➕'}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

// Container to handle some state for the table
const SalaryTableContainer = ({data, handleComparePlayers, handleReset}:ISalaryTableContainer) => {
    const [ selectedPlayers, setSelectedPlayers ] = useState<string[]>([]);

    const handleAddPlayer = (e:any) => {
        setSelectedPlayers([...selectedPlayers, e.target.value])
    };

    const handleOnSubmit = () => {
        handleComparePlayers(selectedPlayers)
    };

    const handleOnReset = () => {
        handleReset();
        setSelectedPlayers([]);
    };      

    return (
        <div className='child flex-1 flex-col rounded-md shadow-xl bg-white'>
            <div className='flex justify-between m-2'>
              <span className='flex-3 text-2xl font-bold'>Salary Table</span>
            </div>
            <div className='overflow-auto h-[675px] rounded-md mx-2'>
              <SalaryTable 
                data={data} 
                handleAddPlayer={handleAddPlayer} 
                selectedPlayers={selectedPlayers}
              />
            </div>
            <div className='flex flex-1 gap-2 justify-center py-2 text-white font-bold'>
                <button
                  disabled={selectedPlayers.length === 0}
                  onClick={handleOnSubmit}
                  className='bg-red-800 cursor-pointer hover:bg-[#00004d] disabled:cursor-not-allowed'
                >
                  Compare
                </button>
                <button
                  disabled={selectedPlayers.length === 0}
                  onClick={handleOnReset}
                  className='bg-red-800 cursor-pointer hover:bg-[#00004d] disabled:cursor-not-allowed'
                >
                  Reset
                </button>
              </div>
          </div>
    )


}

export default SalaryTableContainer;
