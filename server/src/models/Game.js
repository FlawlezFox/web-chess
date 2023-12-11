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

        // socket.on("playerConnects", onPlayerConnects(io, socket, player));

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

        this.socket.on("disconnecting", () => {
            console.log(this.socket.rooms);
        })
    }

    onPlayerConnects() {

    }

    onPlayerDisconnects() {

    }

    isCreator(player) {
        return player && player.gameId;
    }
}

export default Game;