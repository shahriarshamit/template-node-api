import express from 'express';

import {getUsers, getUserById, deleteUserById} from '../modal/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.json({"status": 400, "msg": "User ID Not Found"});
        }
        const user = await getUserById(id);
        if (!user) {
            return res.json({"status": 400, "msg": "User Not Found"});
        }
        return res.json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.json({"status": 400, "msg": "User ID Not Found"});
        }
        const {username} = req.body;
        if (!username) {
            return res.json({"status": 400, "msg": "Username Not Found"});
        }
        const user = await getUserById(id);
        if (!user) {
            return res.json({"status": 400, "msg": "User Not Found"});
        }
        user.username = username;
        await user.save();
        return res.json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.json({"status": 400, "msg": "User ID Not Found"});
        }
        const deletedUser = await deleteUserById(id);
        if (!deletedUser) {
            return res.json({"status": 400, "msg": "User Deletion Error"});
        }
        return res.json({"status": 200, "msg": "User Deleted", "data": deletedUser});
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
