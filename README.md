# YourInvestor

This is a personal project to play with different technologies.

_Vite, vanilla-extract, react, react-router, express, axios and a bit of reverse engineering on MyInvestor._

![Nothing to see here](./nothing-to-see-here.gif)

## Run

1. Run `yarn` to install all the dependencies.
1. Run `node backend/proxy` and **leave it running on the background**.
   This is needed to bypass the web requests from the web client to the MyInvestor backend.
   The web app will talk with this backend.
1. Run `yarn dev` to start the frontend.
   Open the URL printed on the console.

## Build and deploy

1. Run `yarn build`.
1. Start the proxy with `yarn start:proxy`.
1. Start the web with `yarn start:web`.

## Login

The login also handles the SMS OTP.

![login](./login.png)

## Dashboard

A small demonstration getting the user accounts and rendering their alias or number and the balance.
![dashboard](./dashboard.png)
