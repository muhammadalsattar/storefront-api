import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer ", "");
        jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret);
        next();
    }
    catch(e){
        res.status(401).send('Not authorized');
    }
};

export default auth;