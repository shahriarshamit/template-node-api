import express from 'express';

import {getAllUsers, getUser, updateUser, deleteUser} from '../controller/user';
import {isAuthenticated, isOwner} from '../middleware'

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/:id', isAuthenticated, isOwner, getUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};