class Game {
    io;
    socket;
    currentSessions = []; // all active socket connections
    currentRoom;

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.currentRoom = "";
        this.currentSessions.push(socket);
    }   

    initializeGame() {
        this.socket.on("createNewGame", (player) => this.onCreateNewGame(player));

        this.socket.on("playerConnects", (player) => this.onPlayerConnects(player));

        this.socket.on("sendDataToSecondPlayer", (player) => {this.onSendDataToSecondPlayer(player)});

        this.socket.on("playerLeftGamePage", () => this.onPlayerLeftGamePage());

        this.socket.on("disconnect", () => {
            this.onPlayerDisconnects();
        });

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

        console.log(`First player ${player.name} has joined! His socket: ${this.socket.id}`);
    }

    onPlayerConnects(player) {
        let room = this.getRoom(player.gameId);

        this.currentRoom = room;

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

        // emit event that notifies another player that second player connected
        this.socket.to(player.gameId).emit("playerConnected", player);

        console.log(`Second player ${player.name} has joined! His socket: ${this.socket.id}`);

        console.log(this.io.sockets.adapter.rooms);
    }

    onSendDataToSecondPlayer(player) {
        // emit event with data from player
        console.log("Requested data: " + player.name + " " + player.gameId);
        this.currentRoom = player.gameId;
        this.socket.to(player.gameId).emit("getDataOfFirstPlayer", player);
    }

    onPlayerDisconnects() {
        this.socket.to(this.currentRoom).emit("playerDisconnected");

        if (this.currentRoom) {
            this.socket.leave(this.currentRoom);
        }

        console.log(`Player left...`);
    }

    onPlayerLeftGamePage() {
        this.socket.disconnect();
        console.log("Player left game page...");
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