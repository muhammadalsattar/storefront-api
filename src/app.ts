import express from 'express'
import bodyParser from 'body-parser';
import userRouter from './routers/user.js';
import productRouter from './routers/product.js';
import orderRouter from './routers/order.js';
import Service from './models/services/service.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import auth from './middleware/auth.js';
import categoryRouter from './routers/category.js';
import orderProductRouter from './routers/order_product.js';



const app = express();
const service = new Service();

app.use(bodyParser.json());

app.get('/cart', auth, async (req: express.Request, res: express.Response) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const userId = (decoded as JwtPayload).id
        const order = await service.showCart(userId);
        res.send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});
app.get('/orders/order/:id', auth, async (req: express.Request, res: express.Response) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const userId = (decoded as JwtPayload).id;
        const order = await service.showOrderProducts(req.params.id as unknown as number, userId);
        res.send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});
app.post('/purchase', auth, async (req: express.Request, res: express.Response) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const userId = (decoded as JwtPayload).id
        const orderProduct = await service.purchase(userId, req.body.product_id as unknown as number, req.body.quantity as unknown as number);
        res.send(orderProduct);
    } catch(e){
        res.status(400).send(e);
    }
});

app.use(orderRouter);
app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderProductRouter)


export default app;
