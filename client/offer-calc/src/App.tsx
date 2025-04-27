import React, { useState, useEffect} from "react";
import "./App.css";
// import types
import { ISalaryData, IPlayerData } from "./types/dataTypes";
// Import hooks
import { useSalaryData } from "./hooks/useSalaryData";
import { usePlayerData } from "./hooks/usePlayerData";
// Import components

const App = () => {
  
  const [ salaryData, setSalaryData ] = useState<ISalaryData[]>();
  const [ offer, setOffer ] = useState<number>();

  const [ playerData, setPlayerData ] = useState<IPlayerData>();
  

  // Fetch data when the page loads. Re-fetches on page refresh.
  useEffect(() => {
    const fetchSalaries = async() => {
      const { salaryData, offer } = await useSalaryData();
      setSalaryData(salaryData);
      setOffer(offer);
    };
    fetchSalaries();
  }, [])

  useEffect(() => {
    const fetchPlayerData = async() => {
      const playerData = await usePlayerData('0');
      setPlayerData(playerData);
    };
    fetchPlayerData();
  }, [])
  
  
  return (
    salaryData && playerData && offer &&
      <main className="flex flex-col rounded-md w-[90vw]">
        <header className="flex-1 p-1 bg-green-50">
          Qualifying Offer Calculator
        </header>

        {/* Player Info Section */}
        <section className='flex flex-2 bg-yellow-200 items-center rounded-lg shadow-xl'>

          <div className='flex-2 flex flex-row w-[90%] mt-8 p-1 rounded-md player-info'>
            <div className='flex-1 flex flex-col justify-center items-center bg-blue-200 gap-4'>
                <img
                  className='rounded-lg size-72 shadow-lg'
                  src="./pablo-sanchez.jpeg"
                  alt='Pablo Sanchez Profile Picture'
                />
              <span className='text-[2rem] font-bold bg-red-800 px-8 py-1 rounded-full shadow-lg text-white'>
                Pablo Sanchez
              </span>
            </div>
          </div>
            {/* Player Stats */}
          <div className='flex-1 h-[30vh] flex flex-col flex-wrap justify-start items-start bg-blue-200 py-4 px-4 gap-2 text-black'>
            {Object.entries(playerData.stats).map(([key,value]) => (
              <div key={key} className="flex gap-1 my-2 py-1">
                <span className='font-bold text-lg'>{key}:</span>
                <span>{value}</span>
              </div>
            ))}
            something
          </div>
          {/* Financial Section */}
          <div className='flex-1 flex flex-col bg-blue-200 px-2 financial-data'>
            <div className='flex-1 flex flex-row items-center m-4 text-black text-2xl'>
                <span className='flex-1 ml-4'> Salary:</span>
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

        <section className='flex-5 flex flex-row w-[90%] my-4 gap-8 parent bg-red-500'>
          stuff
        </section>
      </main>
  )
}

export default App;