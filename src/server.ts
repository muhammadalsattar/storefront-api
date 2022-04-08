import express from 'express'
import bodyParser from 'body-parser';
import userRouter from './routers/user.js';
import productRouter from './routers/product.js';
import orderRouter from './routers/order.js';
import Service from './models/services/cart.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import auth from './middleware/auth.js';



const app = express();
const service = new Service();

app.use(bodyParser.json());

app.get('/cart', auth, async (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
    const userId = (decoded as JwtPayload).id
    const cart = await service.showCart(userId);
    res.send(cart);
});
app.use(orderRouter);
app.use(userRouter);
app.use(productRouter);


export default app;
