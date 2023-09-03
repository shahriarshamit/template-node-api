"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});
exports.UserModel = mongoose_1.default.model('users', UserSchema);
const getUsers = function () {
    return exports.UserModel.find();
};
exports.getUsers = getUsers;
const getUserByEmail = function (email) {
    return exports.UserModel.findOne({ email });
};
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = function (sessionToken) {
    return exports.UserModel.findOne({
        'authentication.sessionToken': sessionToken
    });
};
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = function (id) {
    return exports.UserModel.findById(id);
};
exports.getUserById = getUserById;
const createUser = function (values) {
    new exports.UserModel(values).save().then(function (user) {
        return user.toObject();
    });
};
exports.createUser = createUser;
const updateUserById = function (id, values) {
    return exports.UserModel.findByIdAndUpdate(id, values);
};
exports.updateUserById = updateUserById;
const deleteUserById = function (id) {
    return exports.UserModel.findOneAndDelete({ _id: id });
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=users.js.map