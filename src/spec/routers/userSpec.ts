import supertest from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../../app.js";
import {setupDatabase, userInstance, userOne, userOnePassword, userTwo, userTwoPassword} from "../fixtures/setup.js";
dotenv.config();
beforeEach(async () => {
    await setupDatabase();
});

describe("User router", () => {
    it("should get all users", async () => {
        const response = await supertest(app).get("/users").set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([userOne]);
    });
    it("should fail get all users for unauthenticated users", async () => {
        const response = await supertest(app).get("/users");
        expect(response.status).toBe(401);
    });
    it("should get user by id", async () => {
        const response = await supertest(app).get(`/users/${userOne.id}`).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userOne);
    });
    it("should fail get user by id for unauthenticated users", async () => {
        const response = await supertest(app).get(`/users/${userOne.id}`);
        expect(response.status).toBe(401);
    });
    it("should create user", async () => {
        const response = await supertest(app).post("/users").send(userTwo);
        expect(response.status).toBe(201);
        expect(bcrypt.compareSync(userTwoPassword, response.body.user.password)).toBe(true);
    });
    it("should login user", async () => {
        const response = await supertest(app).post("/users/login").send({username: userOne.username, password: userOnePassword});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({user: userOne, token: jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)});
    });
    it("should delete user", async () => {
        const response = await supertest(app).delete(`/users/${userOne.id}`).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        await supertest(app).get(`/users/${userOne.id}`).set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`).expect(404);
    });
    it("should fail delete user for unauthenticated users", async () => {
        const response = await supertest(app).delete(`/users/${userOne.id}`);
        expect(response.status).toBe(401);
    });
    it("should delete all users", async () => {
        const response = await supertest(app).delete("/users").set("Authorization", `Bearer ${jwt.sign({id: userOne.id}, process.env.JWT_SECRET as string)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    });
    it("should fail delete all users for unauthenticated users", async () => {
        const response = await supertest(app).delete("/users");
        expect(response.status).toBe(401);
    });
});