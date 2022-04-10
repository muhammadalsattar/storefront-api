import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js';

const userRouter = express.Router();
const userInstance = new User();

userRouter.get('/users', auth, async (req: express.Request, res: express.Response) => {
    try {
        const users = await userInstance.getAll();
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});
userRouter.get('/users/:id', auth, async (req: express.Request, res: express.Response) => {
    try {
        const user = await userInstance.getById(req.params.id as unknown as number);
        if(user) {
            res.send(user);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
userRouter.post('/users/login', async (req: express.Request, res: express.Response) => {
    try {
        const user = await userInstance.login(req.body.username, req.body.password);
        if(user){
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as Secret)
            res.send({user, token});
        }
        else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
userRouter.post('/users', async (req: express.Request, res: express.Response) => {
    try {
        const user = await userInstance.create(req.body);
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as Secret)
        res.status(201).send({user, token});
    } catch (err) {
        res.status(400).send(err);
    }
});
userRouter.delete('/users/:id', auth, (req: express.Request, res: express.Response) => {
    try {
        const user = userInstance.delete(req.params.id as unknown as number);
        if(user){
            res.send(user);
        }
        res.status(404).send();
    } catch (err) {
        res.status(400).send(err);
    }
});
userRouter.delete('/users', auth, (req: express.Request, res: express.Response) => {
    try {
        const users = userInstance.deleteAll();
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default userRouter;