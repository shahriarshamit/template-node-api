"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = exports.isAuthenticated = void 0;
const users_1 = require("../modal/users");
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['template-node-api-session'];
        if (!sessionToken) {
            return res.json({ "status": 403, "msg": "Authentication Error" });
        }
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            return res.json({ "status": 403, "msg": "User Not Found" });
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.isAuthenticated = isAuthenticated;
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = req.cookies['template-node-api-identity'];
        ;
        if (!currentUserId) {
            return res.json({ "status": 403, "msg": "User ID Not Found" });
        }
        if (currentUserId !== id) {
            return res.json({ "status": 403, "msg": "User is not Owner" });
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.isOwner = isOwner;
//# sourceMappingURL=index.js.map