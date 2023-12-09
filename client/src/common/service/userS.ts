import { Player } from "../../models/Player";

const SERVER = import.meta.env.VITE_BACKEND_SERVER;

export async function authorise(player: Player) {
    fetch(`${SERVER}/api/user/authorise`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: player.name,
            color: player.color,
        })
    });
}