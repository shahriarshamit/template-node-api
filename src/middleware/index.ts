import express from 'express';
import {merge, get} from 'lodash';

import {getUserBySessionToken} from '../modal/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['template-node-api-session'];
        if (!sessionToken) {
            return res.json({"status": 403, "error": "Authentication Error"});
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.json({"status": 403, "error": "User Not Found"});
        }
        merge(req, {identity: existingUser});
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

//export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//    try {
//        const {id} = req.params;
//        const currentUserId = get(req, 'identity._id') as string;
//        if (!currentUserId) {
//            return res.json({"status": 403, "error": "User ID Not Found"});
//        }
//        if (currentUserId.toString() !== id) {
//            return res.json({"status": 403, "error": "Authentication Error"});
//        }
//        next();
//    } catch (error) {
//        console.log(error);
//        return res.sendStatus(400);
//    }
//}