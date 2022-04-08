import express from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import Order from '../models/order.js';


const orderRouter = express.Router();
const orderInstance = new Order()

orderRouter.get('/orders/:userId', auth, async (req: express.Request, res: express.Response) => {
    const orders = await orderInstance.getByUserId(req.params.userId as unknown as number);
    res.send(orders);
});

orderRouter.get('/orders/:userId/status/:status', auth, async (req: express.Request, res: express.Response) => {
    const orders = await orderInstance.getByStatus(req.params.userId as unknown as number ,req.params.status as unknown as string);
    res.send(orders);
});

orderRouter.post('/orders', auth, async (req: express.Request, res: express.Response) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as Secret);
    const id = (decoded as JwtPayload).id;
    const order = await orderInstance.create(req.body, id);
    res.send(order);
});

export default orderRouter;