import express from 'express';
import OrderProduct from '../models/order_product.js';

const orderProductRouter = express.Router();
const orderProductInstance = new OrderProduct();

orderProductRouter.get('/orderproduct/order/:orderId', async (req: express.Request, res: express.Response) => {
    const orderProducts = await orderProductInstance.getByOrderId(req.params.orderId as unknown as number);
    res.send(orderProducts);
});
orderProductRouter.get('/orderproduct/product/:productId', async (req: express.Request, res: express.Response) => {
    const orderProducts = await orderProductInstance.getByProductId(req.params.productId as unknown as number);
    res.send(orderProducts);
});

export default orderProductRouter;