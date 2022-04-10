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
import Category from "../models/category.js";
const categoryRouter = express.Router();
const categoryInstance = new Category();
categoryRouter.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryInstance.getAll();
        res.send(categories);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
categoryRouter.get('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryInstance.getById(req.params.id);
        res.send(category);
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
categoryRouter.post('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryInstance.create(req.body);
        res.status(201).send(category);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
export default categoryRouter;
