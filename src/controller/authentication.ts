import express from 'express';

import {getUserByEmail, createUser} from '../modal/users';
import {random, authentication} from '../helper/auth';

export const login = async function (req: express.Request, res: express.Response) {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({"status": 400, "error": "Missing Username/Password"});
        }
        const currentUser = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!currentUser) {
            return res.json({"status": 400, "error": "User Not Found"});
        }
        const expectedHash = authentication(currentUser.authentication.salt, password);
        if (currentUser.authentication.password != expectedHash) {
            return res.json({"status": 403, "error": "Password Doesn't Match"});
        }
        const salt = random();
        currentUser.authentication.sessionToken = authentication(salt, currentUser._id.toString());
        await currentUser.save();
        res.cookie('template-node-api-session', currentUser.authentication.sessionToken, {domain: 'localhost', path: '/'});
        return res.json(currentUser).status(200).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const register = async function (req: express.Request, res: express.Response) {
    try {
        const {email, password, username} = req.body;
        if (!email || !password || !username) {
            return res.json({"status": 400, "error": "Missing Email, Username or Password"});
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.json({"status": 400, "error": "User Not Found"});
        }
        const salt = random();
        const newUser = createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });
        return res.json(newUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
