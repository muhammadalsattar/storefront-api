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
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
import Product from '../models/product.js';
const productRouter = express.Router();
const productInstance = new Product();
productRouter.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productInstance.getAll();
    res.send(products);
}));
productRouter.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productInstance.getById(req.params.id);
    res.send(product);
}));
productRouter.post('/products', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productInstance.create(req.body);
    res.send(product);
}));
productRouter.get('/products/category/:categoryId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productInstance.getByCategoryId(req.params.categoryId);
    res.send(products);
}));
export default productRouter;
