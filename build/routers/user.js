var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js';
const userRouter = express.Router();
const userInstance = new User();
userRouter.get('/users', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userInstance.getAll();
    res.send(users);
}));
userRouter.get('/users/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userInstance.getById(req.params.id);
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send();
    }
}));
userRouter.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userInstance.login(req.body.username, req.body.password);
    if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.send({ user, token });
    }
    else {
        res.status(404).send();
    }
}));
userRouter.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userInstance.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
}));
userRouter.delete('/users/:id', auth, (req, res) => {
    const user = userInstance.delete(req.params.id);
    if (user) {
        res.send(user);
    }
    res.status(404).send();
});
userRouter.delete('/users', auth, (req, res) => {
    const users = userInstance.deleteAll();
    res.send(users);
});
export default userRouter;
