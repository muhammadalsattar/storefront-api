import express from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import Order from '../models/order.js';


const orderRouter = express.Router();
const orderInstance = new Order()

orderRouter.get('/orders/:userId', auth, async (req: express.Request, res: express.Response) => {
    try {
        const orders = await orderInstance.getByUserId(req.params.userId as unknown as number);
        res.send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

orderRouter.get('/orders/:userId/:status', auth, async (req: express.Request, res: express.Response) => {
    try {
        const orders = await orderInstance.getByStatus(req.params.userId as unknown as number ,req.params.status as unknown as string);
        res.send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

orderRouter.post('/checkout/:id', auth, async (req: express.Request, res: express.Response) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const userId = (decoded as JwtPayload).id
        const order = await orderInstance.complete(req.params.id as unknown as number, userId);
        res.send(order);
    }
    catch(err){
        res.status(401).send(err);
    }
});

export default orderRouter;