import express from 'express';

import {getUserByEmail, createUser} from '../modal/users';
import {random, authentication} from '../helper/auth';

export const register = async function (req: express.Request, res: express.Response) {
    try {
        const {email, password, username} = req.body;
        if (!email || !password || !username) {
            return res.status(400);
        } else {
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return res.status(400);
            } else {
                const salt = random();
                const newUser = createUser({
                    username,
                    email,
                    authentication: {
                        salt,
                        password: authentication(salt, password),
                    }
                });
                return res.status(200).json(newUser).end();
            }
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
