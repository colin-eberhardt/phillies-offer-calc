import React from 'react';
import { IPlayerData } from '../types/dataTypes';

interface IPlayerPanel {
    playerData: IPlayerData
    offer: number;
};

// TODO: Replace this with translation like i18n
const statNameMap = {
    "war": "WAR",
    "runs": "Runs",
    "hits": "Hits",
    "doubles": "2B",
    "triples": "3B",
    "hr": "HR",
    "rbi": "RBI",
    "sb": "SB",
    "ba": "BA",
    "obp": "OBP",
    "slg": "SLG"
};

const PlayerPanel = ({playerData, offer}:IPlayerPanel) => {
    return (
        <section className='flex-2 flex flex-row bg-white p-2 rounded-md player-info'>
            <div className='flex-1 flex flex-col justify-center items-center gap-4'>
                <img
                    className='rounded-lg size-72 shadow-lg'
                    src="./pablo-sanchez.jpeg"
                    alt='Pablo Sanchez Profile Picture'
                />
                <span className='text-[2rem] font-bold bg-red-800 px-8 py-1 rounded-full shadow-lg text-white'>
                Pablo Sanchez
                </span>
            </div>
            <div className='flex-1 flex flex-col py-4 px-4 gap-2 text-black h-[28vh]'>
                <div className='flex-1 text-2xl w-full border-b-2 pb-2'>2016 Stats</div>
                <div className='flex-1 flex flex-col flex-wrap justify-start items-start w-full h-full p-2'>
                    {Object.entries(playerData.stats).map(([key,value]) => (
                        <div key={key} className="flex w-1/4 justify-between items-center gap-1 my-2 py-1 text-xl">
                            <span className='font-light'>{statNameMap[key]}:</span>
                            <span className='font-bold'>{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex-1 flex flex-col px-2 financial-data'>
                <div className='flex-1 flex flex-row items-center m-4 text-black text-2xl'>
                    <span className='flex-1 ml-4'>{playerData.salaryData['player-year']} Salary:</span>
                    <div className='flex flex-1 justify-center py-4 mx-2 font-bold'>
                        <span>{`$${parseFloat((playerData.salaryData["player-salary"] / 1000000).toFixed(2))}M`}</span>
                    </div>
                </div>
                <div className='flex-1 flex flex-row items-center p-4 text-black text-2xl'>
                    <span className='flex-1 ml-4'>Qualifying Offer:</span>
                    <div className='flex flex-1 justify-center py-4 mx-2 font-bold'>
                        <span>{`$${parseFloat((offer / 1000000).toFixed(2))}M`}</span>
                    </div>
                </div>
                <div className='flex-1 flex flex-row items-center p-4 text-black text-2xl'>
                    <span className='flex-1 ml-4'>Draft Pick Value:</span>
                    <div className='flex flex-1 justify-center py-4 mx-2 font-bold'>
                        <span>$5-15M</span>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default PlayerPanel;
