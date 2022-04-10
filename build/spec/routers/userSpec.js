var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../../app.js";
import { setupDatabase, userOne, userOnePassword, userTwo, userTwoPassword } from "../fixtures/setup.js";
dotenv.config();
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("User router", () => {
    it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get("/users").set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([userOne]);
    }));
    it("should fail get all users for unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get("/users");
        expect(response.status).toBe(401);
    }));
    it("should get user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/users/${userOne.id}`).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(userOne);
    }));
    it("should fail get user by id for unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).get(`/users/${userOne.id}`);
        expect(response.status).toBe(401);
    }));
    it("should create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).post("/users").send(userTwo);
        expect(response.status).toBe(201);
        expect(bcrypt.compareSync(userTwoPassword, response.body.user.password)).toBe(true);
    }));
    it("should login user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).post("/users/login").send({ username: userOne.username, password: userOnePassword });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ user: userOne, token: jwt.sign({ id: userOne.id }, process.env.JWT_SECRET) });
    }));
    it("should delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).delete(`/users/${userOne.id}`).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        yield supertest(app).get(`/users/${userOne.id}`).set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`).expect(404);
    }));
    it("should fail delete user for unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).delete(`/users/${userOne.id}`);
        expect(response.status).toBe(401);
    }));
    it("should delete all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).delete("/users").set("Authorization", `Bearer ${jwt.sign({ id: userOne.id }, process.env.JWT_SECRET)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    }));
    it("should fail delete all users for unauthenticated users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest(app).delete("/users");
        expect(response.status).toBe(401);
    }));
});
