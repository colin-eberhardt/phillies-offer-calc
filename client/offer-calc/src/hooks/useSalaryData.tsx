import { ISalaryData } from "../types/dataTypes";

interface IUseSalaryData {
    salaryData: ISalaryData[];
    offer: number;
};

/**
 * A helper function that calculates the average salary (qualifying offer).
 *
 * @param {ISalaryData[]} salaryData - An array of player salaries.
 * @returns {number} The average of salaryData, or the qualifying offer.
 */
const findOffer = (salaryData: ISalaryData[]) => (
    salaryData.reduce((acc: number, record:ISalaryData)=> acc+=record['player-salary'],0) / salaryData.length
);

/**
 * Fetches salary data from /v1/salaries, calculates qualifying offerand returns salaryData and offer.
 * 
 * @returns {Promise<IUseSalaryData>} Description of what the hook returns.
 * 
 * @example
 * // Example usage of the hook
 * const { salaryData, setSalaryData } = useSalaryData();
 */
export const useSalaryData = async():Promise<IUseSalaryData> => {

    try{
        // Get the salaries from our endpoint
        const response = await fetch("http://localhost:8000/v1/salaries/");
        const { data:salaryData} = await response.json();
        console.log(salaryData)
    
    
        // Calc the qualifying offer
        const offer = findOffer(salaryData.slice(0,125));
       
        return {salaryData, offer}
    }
    catch(error){
        return error
    };
};