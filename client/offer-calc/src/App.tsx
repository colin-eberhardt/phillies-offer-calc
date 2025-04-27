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
    if(offer){
      const fetchPlayerData = async() => {
        const playerData = await usePlayerData('0');
        setPlayerData(playerData);
        setGraphData([playerData.salaryData, {"player-name": "Qualifying Offer", "player-salary": offer, "id": "1", "player-level": "MLB", "player-year":"2016"}])
      };
      fetchPlayerData();
    };
  }, [salaryData]);

  // Event handlers
  const handleComparePlayers = (selectedPlayers: string[]) => { 
    // Accepts a list of player UUIDs, and sets graphData with their respective salary records
    if(salaryData){
      let data:ISalaryData[] = [];
      for(const id of selectedPlayers){
        if(!graphData.find((record:ISalaryData) => record.id === id)){
          const playerSalary = salaryData.filter((record:ISalaryData) => record.id === id);
          data.push(...playerSalary)
        };
      };
      // const filteredSalaries = salaryData?.filter((record:ISalaryData) => selectedPlayers.includes(record.id)) || [];
      setGraphData([...graphData, ...data]);
    };
  };

  const handleReset = () => {
    // Reset the graphData
    const filteredSalaries = graphData.filter((record:ISalaryData) => record.id === '1' || record.id==='0');
    setGraphData(filteredSalaries);
  }
  
  return (
    // Gotta fix this mess
    salaryData && playerData && offer &&
      <main className="flex flex-col rounded-lg w-[90vw] gap-1 p-2">
        
        <header className="flex-1 p-1 rounded-md bg-white">
          <span className="text-2xl font-bold">Qualifying Offer Calculator</span>
        </header>

        <PlayerPanel playerData={playerData} offer={offer}/>

        <section className='flex-4 flex flex-row my-4 gap-4 parent'>
          <SalaryTableContainer 
            data={salaryData}
            handleComparePlayers={handleComparePlayers}
            handleReset={handleReset}
          />
          <BarChart 
            width={725} 
            height={700} 
            data={graphData}
          />
        </section>
      </main>
  )
}

export default App;