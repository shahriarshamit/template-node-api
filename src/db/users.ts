import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    }
});

export const UserModel = new mongoose.Model('users', UserSchema);

export const getUsers = function () {
    return UserModel.find();
};

export const getUserByEmail = function (email: String) {
    return UserModel.findOne({email});
};

export const getUserBySessionToken = function (sessionToken: String) {
    return UserModel.findOne({
        'authentication.sessionToken': sessionToken
    });
};

export const getUserById = function (id: String) {
    return UserModel.findById(id);
};

export const createUser = function (values: Record<string, any>) {
    return new UserModel(values).save().then(function (user) {
        return user.toObject();
    });
};

export const updateUser = function(id: String, values: Record<string, any>) {
    return UserModel.findByIdAndUpdate(id, values);
};

export const deleteUser = function (id: String) {
    return UserModel.findOneAndDelete({_id: id});
};
