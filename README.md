# phillies-offer-calc
A small application to calculate a qualifying offer for our pending free agent: Pablo Sanchez.

# Getting Started 

## Server

If running for the first time:
* `docker compose build` to build the server image.
* `docker compose up -d` to start the server

Otherwise, just run `docker compose up -d` to start the server.

You should be able to reach the server at `localhost:8000`. 
For example: `localhost:8000/v1/salaries/`.

Run `docker compose down` to shut down the server with finished.

## Client

If runnning for the first time:
* `cd client/`
* `npm install`
* `npm run dev`

Otherwise, just `npm run dev` to start up the client application.

You should be able to reach the application at `localhost:5173`.

# Overview

The server is built using FastAPI. It makes a request to the `data.html` document provided in the requirements, transforms the data into a dictionary, and exposes an API endpoint to return that data to the client application. It also exposes as `/v1/player/{id}` endpoint to fetch more detailed data about a particulare player.

The client is a React based application. It fetches data from our server endpoint, and provides a preliminary UI for users to explore the qualifying offer and player information for a set player, Pablo Sanchez. Users can interactive with a chart and graph to compare salaries for "similar players". 

# Assumptions

The server `tranform_to_dict` function ignores records where salary data is blank (`''`), or lacking numeric values (`no salary data`).

# Architecture



# Future Enhancements

1. **Implement a DB on the backend**. This would provide a more scalable, performant way to read data. Something like a Postgres DB for this type of structured data would work fine. We could also use this to fetch our player-specific info (like stats). Maybe leverage an ORM to perform CRUD statements. 
2. **More services.** By this, I mean we could implement additional backend services to improve the insights provided by the tool. Imagine something like a "similar players service" which fetches players that are statistically similar to our target player. This could be the output of a model created by the Data Science team. Could enable users to get a better idea of the potential market value for the target player.
3. **Improved state management**. There are some areas in the frontend wherein it may be suitable to leverage a reducer of sorts. For example, updating the graphData and dispatching actions from the "Compare" and "Reset" buttons.


