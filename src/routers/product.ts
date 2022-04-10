import express from 'express';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import Product from '../models/product.js';

const productRouter = express.Router();
const productInstance = new Product()

productRouter.get('/products', async (req: express.Request, res: express.Response) => {
    try {
        const products = await productInstance.getAll();
        res.send(products);
    } catch (err) {
        res.status(400).send(err);
    }
});

productRouter.get('/products/:id', async (req: express.Request, res: express.Response) => {
    try {
        const product = await productInstance.getById(req.params.id as unknown as number);
        res.send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

productRouter.post('/products', auth, async (req: express.Request, res: express.Response) => {
    try {
        const product = await productInstance.create(req.body);
        res.send(product);
    } catch (err) {
        res.status(400).send(err);
    }
});

productRouter.get('/products/category/:categoryId', async (req: express.Request, res: express.Response) => {
    try {
        const products = await productInstance.getByCategoryId(req.params.categoryId as unknown as number);
        res.send(products);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default productRouter;