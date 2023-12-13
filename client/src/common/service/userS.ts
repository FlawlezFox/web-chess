import { Player } from "../../models/Player";

const SERVER = import.meta.env.VITE_BACKEND_SERVER;

export async function authorise(player: Player) {
    fetch(`${SERVER}/api/user/authorise`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: player.id,
            name: player.name,
            color: player.color,
        })
    });
}

export async function getUser(id: string) {
    const user = await fetch(`${SERVER}/api/user/getUser/${id}`);

    return user.json();
}