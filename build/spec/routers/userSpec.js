var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from "supertest";
import userRouter from "../../routers/user.js";
describe("User router", () => {
    it("should get users and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(userRouter).get("/users").expect(200);
    }));
    it("should get user by id and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(userRouter).get("/users/1").expect(200);
    }));
    it("should create user and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(userRouter).post("/users").send({
            firstName: "test",
            lastName: "test",
            username: "test",
            password: "test",
        }).expect(200);
    }));
    it("should delete user and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(userRouter).delete("/users/1").expect(200);
    }));
    it("should delete all users and return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        request(userRouter).delete("/users").expect(200);
    }));
});
