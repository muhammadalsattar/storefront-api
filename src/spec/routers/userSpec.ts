import request from "supertest";
import userRouter from "../../routers/user.js";
import auth from '../../middleware/auth.js';

describe("User router", () => {
    it("should get users and return 200", async () => {
        request(userRouter).get("/users").expect(200);
    });
    it("should get user by id and return 200", async () => {
        request(userRouter).get("/users/1").expect(200);
    });
    it("should create user and return 200", async () => {
        request(userRouter).post("/users").send({
            firstName: "test",
            lastName: "test",
            username: "test",
            password: "test",
        }).expect(200);
    });
    it("should update user and return 200", async () => {
        request(userRouter).patch("/users/1").send({
            user: {
                username: "test",
                password: "test",
            },
        }).expect(200);
    });
    it("should delete user and return 200", async () => {
        request(userRouter).delete("/users/1").expect(200);
    });
    it("should delete all users and return 200", async () => {
        request(userRouter).delete("/users").expect(200);
    });
});