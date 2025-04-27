import React, { useState, useEffect} from "react";
import "./App.css";
// import types
import { ISalaryData, IPlayerData } from "./types/dataTypes";
// Import hooks
import { useSalaryData } from "./hooks/useSalaryData";
import { usePlayerData } from "./hooks/usePlayerData";
// Import components
import PlayerPanel from "./components/PlayerPanel";
import SalaryTableContainer from "./components/SalaryTable";
import BarChart from "./components/BarChart";


const App = () => {
  
  const [ salaryData, setSalaryData ] = useState<ISalaryData[]>();
  const [ offer, setOffer ] = useState<number>();

  const [ playerData, setPlayerData ] = useState<IPlayerData>();
  const [ graphData, setGraphData ] = useState<ISalaryData[]>([]);


  // Event handlers
  const handleComparePlayers = (selectedPlayers: string[]) => { 
    // Accepts a list of player UUIDs, and sets graphData with their respective salary records
    const filteredSalaries = salaryData?.filter((record:ISalaryData) => selectedPlayers.includes(record.id));
    setGraphData([...graphData, ...filteredSalaries || []]);
  };

  const handleReset = () => {
    const filteredSalaries = graphData.filter((record:ISalaryData) => record.id === '1' || record.id==='0');
    setGraphData(filteredSalaries);
  }
  

  // Fetch data when the page loads. Re-fetches on page refresh.
  useEffect(() => {
    const fetchSalaries = async() => {
      const { salaryData, offer } = await useSalaryData();
      setSalaryData(salaryData);
      setOffer(offer);
      // setGraphData([...graphData, {"id": '1', "player-name": "Qualifying Offer", "player-salary": offer || 0, "player-year": "2016", "player-level":"MLB"}])
    };
    fetchSalaries();
  }, [])

  useEffect(() => {
    const fetchPlayerData = async() => {
      const playerData = await usePlayerData('0');
      setPlayerData(playerData);
      setGraphData([...graphData, playerData.salaryData])
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
          <SalaryTableContainer 
            data={salaryData}
            handleComparePlayers={handleComparePlayers}
            handleReset={handleReset}
          />
          
          {/* Chart */}
          <div className='flex-1 flex justify-center rounded-lg  shadow-xl bg-white'>
            <BarChart 
              width={725} 
              height={650} 
              data={graphData}
            />
          </div>
        </section>
      </main>
  )
}

export default App;