import db from "../db.js";

class UserController {
    static async authorise(req, res) {
        try {
            const data = req.body;
            console.log(req.body);
            await db.collection("users").doc().set(data);
            res.send("User was added successfuly");
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async getUser(req, res) {
        try {
            const id = req.params.id;
            const data = await db.collection("users").doc(id).get();

            if (!data) {
                res.status(404).send("User with this ID not found");
            } else {
                res.send(data.data());
            }
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
}

export default UserController;

