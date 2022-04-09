import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js';

const userRouter = express.Router();
const userInstance = new User();

userRouter.get('/users', auth, async (req: express.Request, res: express.Response) => {
    const users = await userInstance.getAll();
    res.send(users);
});
userRouter.get('/users/:id', auth, async (req: express.Request, res: express.Response) => {
    const user = await userInstance.getById(req.params.id as unknown as number);
    if(user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});
userRouter.post('/users/login', async (req: express.Request, res: express.Response) => {
    const user = await userInstance.login(req.body.username, req.body.password);
    if(user){
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as Secret)
        res.send({user, token});
    }
    else {
        res.status(404).send();
    }
});
userRouter.post('/users', async (req: express.Request, res: express.Response) => {
    const user = await userInstance.create(req.body);
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as Secret)
    res.status(201).send({user, token});
});
userRouter.delete('/users/:id', (req: express.Request, res: express.Response) => {
    const user = userInstance.delete(req.params.id as unknown as number);
    if(user){
        res.send(user);
    }
    res.status(404).send();
});
userRouter.delete('/users', (req: express.Request, res: express.Response) => {
    const users = userInstance.deleteAll();
    res.send(users);
});

export default userRouter;