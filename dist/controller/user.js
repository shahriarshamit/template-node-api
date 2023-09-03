"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const users_1 = require("../modal/users");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, users_1.getUsers)();
        return res.json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ "status": 400, "msg": "User ID Not Found" });
        }
        const user = await (0, users_1.getUserById)(id);
        if (!user) {
            return res.json({ "status": 400, "msg": "User Not Found" });
        }
        return res.json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ "status": 400, "msg": "User ID Not Found" });
        }
        const { username } = req.body;
        if (!username) {
            return res.json({ "status": 400, "msg": "Username Not Found" });
        }
        const user = await (0, users_1.getUserById)(id);
        if (!user) {
            return res.json({ "status": 400, "msg": "User Not Found" });
        }
        user.username = username;
        await user.save();
        return res.json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.json({ "status": 400, "msg": "User ID Not Found" });
        }
        const deletedUser = await (0, users_1.deleteUserById)(id);
        if (!deletedUser) {
            return res.json({ "status": 400, "msg": "User Deletion Error" });
        }
        return res.json({ "status": 200, "msg": "User Deleted", "data": deletedUser });
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map