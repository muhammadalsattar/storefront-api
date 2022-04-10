import express from 'express';
import Category from "../models/category.js";

const categoryRouter = express.Router();
const categoryInstance = new Category();

categoryRouter.get('/categories', async (req: express.Request, res: express.Response) => {
    try {
        const categories = await categoryInstance.getAll();
        res.send(categories);
    } catch (err) {
        res.status(400).send(err);
    }
});
categoryRouter.get('/categories/:id', async (req: express.Request, res: express.Response) => {
    try{
        const category = await categoryInstance.getById(req.params.id as unknown as number);
        res.send(category);
    }
    catch(err){
        res.status(404).send(err);
    }
});
categoryRouter.post('/categories', async (req: express.Request, res: express.Response) => {
    try {
        const category = await categoryInstance.create(req.body);
        res.status(201).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default categoryRouter;