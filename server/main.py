import random
from typing import Annotated

import requests
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from server.utils.utils import convert_to_int, transform_to_dict

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/v1/salaries/')
async def get_salary_data(row_count: int = Query(1400, le=1500, description="Max number of items to return")):
    """
        Transform HTML to get salary data.

        Parameters
        --------------
        row_count: `int` options
            Number of records to return. Defualt is 1400, max is 1500. 

        Returns
        --------------
        data: `dict`
            Dictionary containing:
                `data`: a sorted list of salary records
    """
    url = "https://questionnaire-148920.appspot.com/swe/data.html"
    
    try:
        response = requests.get(url)
        print(response)
        response.raise_for_status()
    except requests.exceptions.HTTPError as errh:
        raise HTTPException(status_code=404, detail="Item not found")
    except requests.exceptions.ReadTimeout as errrt: 
        print("Time out") 
    except requests.exceptions.ConnectionError as conerr: 
        print("Connection error") 
    except requests.exceptions.RequestException as errex: 
        print("Exception request") 
    else: 
        # Transform into a dict for proof of concept, then sort by salary
        data = transform_to_dict(response.content)
        data['data'] = sorted(data['data'], key=lambda item: item['player-salary'], reverse=True)[:row_count]
        
        return data

@app.get('/v1/player/{player_id}')
async def get_player_data(player_id:str):
    """
        Get data for an individual player.

        Parameters:
        --------------

        player_id: `string`
            UUID for a player
        
        Returns
        --------------

        data: `dict`
            Dictionary containing:
                stats: `dict` of season statistics for 2016
                salaryData: `dict` of player salary info for most recent season (2016)
    """
    data = {}
    
    # Hard coding some stats for our athlete. Ideally, we'd read from a DB
    data['stats'] = {
        "war": 1.6,
        "runs": 84,
        "hits": 123,
        "doubles": 24,
        "triples": 2,
        "hr": 24,
        "rbi": 86, 
        "sb": 21,
        "ba": .243,
        "obp": .373,
        "slg": .441
    }

    # Hard coding some salary data for our athlete. Ideally, we'd read from a DB
    data["salaryData"]  = {"player-name":"Sanchez, Pablo","player-salary":12237432, "player-year":"2016", "player-level": "MLB","id":"0"}

    return data

    