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
import Order from '../models/order.js';
const orderRouter = express.Router();
const orderInstance = new Order();
orderRouter.get('/orders/:userId', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderInstance.getByUserId(req.params.userId);
        res.send(orders);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
orderRouter.get('/orders/:userId/:status', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderInstance.getByStatus(req.params.userId, req.params.status);
        res.send(orders);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
orderRouter.post('/checkout/:id', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const order = yield orderInstance.complete(req.params.id, userId);
        res.send(order);
    }
    catch (err) {
        res.status(401).send(err);
    }
}));
export default orderRouter;
