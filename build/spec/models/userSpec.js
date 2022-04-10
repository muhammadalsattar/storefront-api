var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { setupDatabase, userInstance, userOne, userOnePassword, userTwoPassword, userTwo } from "../fixtures/setup.js";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield setupDatabase();
}));
describe("User model", () => {
    it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userInstance.getAll();
        expect(users).toEqual([userOne]);
    }));
    it("should get user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userInstance.getById(userOne.id);
        expect(user).toEqual(userOne);
    }));
    it("should create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userInstance.create(userTwo);
        expect(user.email).toEqual(userTwo.email);
        expect(user.username).toEqual(userTwo.username);
        expect(bcrypt.compareSync(userTwoPassword, user.password)).toBe(true);
    }));
    it("should login user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userInstance.login(userOne.username, userOnePassword);
        expect(user).toEqual(userOne);
    }));
    it("should delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userInstance.delete(userOne.id);
        expect(user).toEqual(userOne);
    }));
    it("should delete all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userInstance.deleteAll();
        expect(users).toEqual([]);
    }));
});
