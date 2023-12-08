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
}

export default UserController;

