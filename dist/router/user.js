"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controller/user");
const middleware_1 = require("../middleware");
exports.default = (router) => {
    router.get('/users', middleware_1.isAuthenticated, user_1.getAllUsers);
    router.get('/users/:id', middleware_1.isAuthenticated, middleware_1.isOwner, user_1.getUser);
    router.patch('/users/:id', middleware_1.isAuthenticated, middleware_1.isOwner, user_1.updateUser);
    router.delete('/users/:id', middleware_1.isAuthenticated, middleware_1.isOwner, user_1.deleteUser);
};
//# sourceMappingURL=user.js.map