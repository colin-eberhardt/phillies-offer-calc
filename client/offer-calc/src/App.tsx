import React, { useState, useEffect} from "react";
import "./App.css";
// import types
import { ISalaryData, IPlayerData } from "./types/dataTypes";
// Import hooks
import { useSalaryData } from "./hooks/useSalaryData";
import { usePlayerData } from "./hooks/usePlayerData";
// Import components
import SalaryTable from "./components/SalaryTable";
import PlayerPanel from "./components/PlayerPanel";
import BarChart from "./components/BarChart";

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
    // Gotta fix this mess
    salaryData && playerData && offer &&
      <main className="flex flex-col rounded-lg w-[90vw] gap-1 p-2">
        
        <header className="flex-1 p-1 rounded-md bg-white">
          <span className="text-2xl font-bold">Qualifying Offer Calculator</span>
        </header>

        <PlayerPanel playerData={playerData} offer={offer}/>

        <section className='flex-5 flex flex-row my-4 gap-8 parent'>
          {/* Table */}
          <div className='child flex-1 flex-col rounded-md shadow-xl bg-white'>
            <div className='flex justify-between m-2'>
              <span className='flex-3 text-2xl font-bold'>Salary Table</span>
            </div>
            <div className='overflow-auto h-[675px] rounded-md mx-2'>
              <SalaryTable 
                data={salaryData} 
                // handleAddPlayer={handleAddPlayer} 
                // selectedPlayers={selectedPlayers}
              />
            </div>
            <div className='flex flex-1 gap-2 justify-center py-2 text-white font-bold'>
                <button
                  // disabled={selectedPlayers.length === 0}
                  // onClick={handleComparePlayers}
                  className='bg-red-800 hover:bg-red-900 disabled:cursor-not-allowed'
                >
                  Compare
                </button>
                <button
                  // disabled={selectedPlayers.length === 0}
                  // onClick={handleReset}
                  className='bg-red-800 hover:bg-red-900 disabled:cursor-not-allowed'
                >
                  Reset
                </button>
              </div>
          </div>
          
          {/* Chart */}
          <div className='flex-1 flex justify-center rounded-lg  shadow-xl bg-white'>
            <BarChart 
              width={725} 
              height={650} 
              // data={graphData} 
            />
          </div>
        </section>
      </main>
  )
}

export default App;