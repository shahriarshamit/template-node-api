import express from 'express';

import {getUsers, getUserById, deleteUserById} from '../modal/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
