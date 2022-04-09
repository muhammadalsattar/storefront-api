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
import OrderProduct from '../models/order_product.js';
const orderProductRouter = express.Router();
const orderProductInstance = new OrderProduct();
orderProductRouter.get('/orderproduct/order/:orderId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProducts = yield orderProductInstance.getByOrderId(req.params.orderId);
    res.send(orderProducts);
}));
orderProductRouter.get('/orderproduct/product/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProducts = yield orderProductInstance.getByProductId(req.params.productId);
    res.send(orderProducts);
}));
export default orderProductRouter;
