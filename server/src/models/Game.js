class Game {
    io;
    socket;
    currentSessions = []; // all active socket connections

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.currentSessions.push(socket);
    }

    initializeGame() {
        this.socket.on("createNewGame", (player) => this.onCreateNewGame(player));

        this.socket.on("playerConnects", (player) => this.onPlayerConnects(player));

        // socket.on("playerDisconnects", onPlayerDisconnects(io, socket, player));

        // socket.on("playerGivesUp", onPlayerGivesUp(io, socket, player));

        // socket.on("playerDraw", onPlayerDraw(io, socket, player));
    }

    onCreateNewGame(player) {
        if (!this.isCreator(player)) {
            console.log("No player has created a room yet!");
            return;
        }

        console.log("Game ID: " + player.gameId);

        this.socket.join(player.gameId);

        console.log(`First player ${player.name} has joined!`);

        this.socket.on("disconnecting", () => {
            console.log(this.socket.rooms);
        })
    }

    onPlayerConnects(player) {
        let room = this.getRoom(player.gameId);

        if (!room) {
            console.log("Room with such ID not found!");
            this.socket.emit("error", "Комната с таким кодом не найдена!");
            return;
        }

        if (this.io.sockets.adapter.rooms.get(room)?.size > 1) {
            console.log("You cannot join. There's already two players");
            this.socket.emit("error", "Данная комната уже переполнена!");
            return;
        }

        this.socket.join(player.gameId);

        // emit the start game event when all players are in lobby
        // emit event that notifies another player that second player connected
        this.socket.to(player.gameId).emit("startGame", player);
        this.socket.to(player.gameId).emit("playerConnected", player);

        console.log(`Second player ${player.name} has joined!`);
    }

    onPlayerDisconnects() {

    }

    isCreator(player) {
        return player && player.color === "white";
    }

    getRoom(gameId) {
        let result;

        for (let room of this.io.sockets.adapter.rooms.keys()) {
            if (room === gameId) {
                result = room;
            }
        }

        return result;
    }
}

export default Game;