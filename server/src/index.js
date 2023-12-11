import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import config from "./config.js";
import router from "./routes/index.js";
import Game from "./models/Game.js";

let game;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: config.frontend_url
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    game = new Game(io, socket);

    game.initializeGame();
});

server.listen(config.port, () => console.log("Server is running on port 3000"));