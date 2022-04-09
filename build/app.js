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
import bodyParser from 'body-parser';
import userRouter from './routers/user.js';
import productRouter from './routers/product.js';
import orderRouter from './routers/order.js';
import Service from './models/services/service.js';
import jwt from 'jsonwebtoken';
import auth from './middleware/auth.js';
import categoryRouter from './routers/category.js';
import orderProductRouter from './routers/order_product.js';
const app = express();
const service = new Service();
app.use(bodyParser.json());
app.get('/cart', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const order = yield service.showCart(userId);
    res.send(order);
}));
app.get('/orders/order/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const order = yield service.showOrderProducts(req.params.id, userId);
    res.send(order);
}));
app.post('/purchase', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = (_c = req.header("Authorization")) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const orderProduct = yield service.purchase(userId, req.body.product_id, req.body.quantity);
        res.send(orderProduct);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
app.use(orderRouter);
app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderProductRouter);
export default app;
