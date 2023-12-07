import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import config from "./config";

const app = express();

const server = http.createServer();

app.use(cors);

const io = new Server(server);

io.on("connection", (socket) => {
    console.log();
});

app.listen(config.port, () => console.log("Server is running "));