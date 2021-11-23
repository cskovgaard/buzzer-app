# Buzzer App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Getting started

Run `npm install` to install app dependencies. This requires [Node.js](https://nodejs.org/en/) to be installed.

## Development server

Run `ng serve` for a dev server. The app will automatically reload if you change any of the source files.

Navigate to `http://localhost:4200/` for the player app, and `http://localhost:4200/host` for the host app.

## Running the multi-user app

In order to run the full working solution, you have to do the following.
Only in this version, will the user inputs in the player app be registered in the host app.

First build the app using:

`ng build`

Then serve the builded app using:

`npm run start`

Then you can navigate to `http://localhost:3000/` for the player app, and `http://localhost:3000/host` for the host app.

## Setup participants

In order to setup the participants, simply go to `utils/player-service.ts` and fill in the details using the `Player` interface.
- **DisplayName**: "Gamer name" - the name on the login screen
- **id**: "Real name" - mostly used behind the scenes, but also on the score tracker in the host app
- **buzzerSound**: Name of the sound-file for the players buzzer
- **points**: A variable to keep track of a players points. Should be 0 from the start.

After the participants has been setup go to `assets/buzzers` and add the buzzer sound files, and you should be good to go.

## Styling the app

You will find global styles in `styles.scss`, player app specific styles in `player.component.scss` and host app specific styles in `host.component.scss`.

Lastly, there's the banner in `assets/banner.png`, which can be updated as well.