export interface ISalaryData {
    "id": string;
    "player-name": string;
    "player-salary": number;
    "player-year": string;
    "player-level": string;
};

export interface IPlayerStats {
    war: number;
    runs: number;
    hits: number;
    doubles: number;
    triples: number;
    hr: number;
    rbi: number;
    sb: number;
    ba: number;
    obp: number;
    slg: number;
};

export interface IPlayerData {
    stats: IPlayerStats;
    salaryData: ISalaryData
};