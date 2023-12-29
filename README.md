# Chess multiplayer web-game

Simple implementation of chess for browsers. No need of registration to play, just enter your nick and create/join the room. You can create a room with unique ID or join the room by ID. Every player is given 1 minute time for each move. The moves history is downloadable.

## What was used

**For front-end:** 

- React + Vite + TypeScript

- Socket.io (client version) for handling events between players

- Styles for the app were written on plain CSS

**For back-end:** 

- Node.js + Express + JavaScript

- Firebase

- Socket.io

## Installation

### Front-end

Open client folder

```sh
cd ./client
```

Install dependencies by running

```sh
npm ci
```

Configure the backend server by changing `VITE_BACKEND_SERVER` in `.env` file, if needed

Run the client by entering this command

```sh
npm run dev
```

### Back-end

Open server folder

```sh
cd ./server
```

Install dependencies by running

```sh
npm ci
```

Configure the `.env` file:

- change file name from `.env.example` to `.env`

- set express server configuration (if needed) or leave it by default

- set the Firebase database configuration:

    - create your own Firebase database

    - add `users` collection

    - go to the project settings and copy your Firebase configuration to the file

Run the server by entering this command

```sh
npm run dev
```