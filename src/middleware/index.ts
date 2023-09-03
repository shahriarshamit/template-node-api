import express from 'express';

import {getUserBySessionToken} from '../modal/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['template-node-api-session'];
        if (!sessionToken) {
            return res.json({"status": 403, "msg": "Authentication Error"});
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.json({"status": 403, "msg": "User Not Found"});
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;
        const currentUserId = req.cookies['template-node-api-identity'];;
        if (!currentUserId) {
            return res.json({"status": 403, "msg": "User ID Not Found"});
        }
        if (currentUserId !== id) {
            return res.json({"status": 403, "msg": "User is not Owner"});
        }
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}