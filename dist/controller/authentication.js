"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../modal/users");
const auth_1 = require("../helper/auth");
const login = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ "status": 400, "msg": "Missing Username/Password" });
        }
        const currentUser = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!currentUser) {
            return res.json({ "status": 400, "msg": "User Not Found" });
        }
        const expectedHash = (0, auth_1.authentication)(currentUser.authentication.salt, password);
        if (currentUser.authentication.password != expectedHash) {
            return res.json({ "status": 403, "msg": "Password Doesn't Match" });
        }
        const salt = (0, auth_1.random)();
        currentUser.authentication.sessionToken = (0, auth_1.authentication)(salt, currentUser._id.toString());
        await currentUser.save();
        res.cookie('template-node-api-session', currentUser.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.cookie('template-node-api-identity', currentUser._id, { domain: 'localhost', path: '/' });
        return res.json(currentUser).status(200).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.login = login;
const register = async function (req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.json({ "status": 400, "msg": "Missing Email, Username or Password" });
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            return res.json({ "status": 400, "msg": "User Not Found" });
        }
        const salt = (0, auth_1.random)();
        const newUser = (0, users_1.createUser)({
            username,
            email,
            authentication: {
                salt,
                password: (0, auth_1.authentication)(salt, password),
            }
        });
        return res.json(newUser).status(200).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map