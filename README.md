# phillies-offer-calc
A small application to calculate a qualifying offer.

# Get Started 

## Server

Run `docker compose build` to build the server image for the first time.
Run `docker compose up -d` to start the server.

You should be able to reach the server at `localhost:8000`. 
For example: `localhost:8000/v1/salaries/`

## Client

If runnning for the first time:
    `cd client/`
    `npm install`
    `npm run build`

Otherwise, you can just `npm run build` to start up the client application.
