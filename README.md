# Buzzer App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Getting started

Run `npm install` to install app dependencies. This requires [Node.js](https://nodejs.org/en/) to be installed.

## Development server

Run `ng serve` for a dev server. The app will automatically reload if you change any of the source files.

Navigate to `http://localhost:4200/` for the player app, and `http://localhost:4200/host` for the host app.

## Running the multi-user app

In order to run the full working solution, you have to do the following.
Only in this version, will the user inputs in the player app be registered in the host app and vice-versa.

This is what you need to do:

1. Make sure every player is on the same WiFi-network
2. Get the IP of the network (run `ipconfig` in `cmd`, and look for `"IPv4 Address"`)
3. Update the `_ip` variable in `server.js` and take note of the `_port`
4. Update the `url` in `app.module.ts` to `"{ip}:{port}"`, where `ip` and `port` should be the values from `server.js`
5. Save your changes

Then you can build the app using:

`ng build`

And serve the builded app using:

`npm run start`

Then you can navigate to `http://{ip}:{port}` for the player app, and `http://{ip}:{port}/host` for the host app.

## Setup participants

In order to setup the participants, simply go to `utils/player-service.ts` and fill in the details using the `Player` interface.
- **displayName**: "Gamer name" - the name on the login screen
- **id**: "Real name" - mostly used behind the scenes, but also on the score tracker in the host app
- **buzzerSound**: Name of the sound-file for the players buzzer
- **points**: A variable to keep track of a players points. Should be 0 from the start.

After the participants has been setup go to `assets/buzzers` and add the buzzer sound files, and you should be good to go.

## Theming the app

You will find color variables in `assets/styles/_variables.scss`.\
These can be updated to change the theme of the app.

In addition, you will find global styles in `assets/styles/global-styles.scss`,\
player app specific styles in `player.component.scss` and host app specific styles in `host.component.scss`.

Lastly, there's the header in `assets/header.png`, which can be updated as well.