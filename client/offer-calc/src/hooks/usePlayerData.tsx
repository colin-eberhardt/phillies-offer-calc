import { ISalaryData, IPlayerStats, IPlayerData } from "../types/dataTypes";

/**
 * Fetches player data from /v1/player/{id}.
 * 
 * @param {string} id - UUID of player 
 * @returns {Promise<IUseSalaryData>} Object containing player stats and salary.
 * 
 * @example
 * // Example usage of the hook
 * const { playerData, setPlayerData } = usePlayerData();
 */
export const usePlayerData = async (id:string):Promise<IPlayerData>=> {
    try{
        const response = await fetch(`http://localhost:8000/v1/player/${id}`);

        const playerData = await response.json();
    
        return playerData;
    }
    catch(error){
        return error;
    };
}
