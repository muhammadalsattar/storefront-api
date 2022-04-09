var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../../models/user.js";
const myUser = new User();
describe("User model", () => {
    it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(myUser.getAll()).toBeDefined();
    }));
    it("should get user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield myUser.getById(1);
        expect(myUser.getById).toBeDefined();
        expect(newUser.id).toBe(1);
    }));
    it("should create user", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(myUser.create).toBeDefined();
    }));
    it("should login user", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(myUser.login("test", "test")).toBeDefined();
    }));
    it("should delete user", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(myUser.delete).toBeDefined();
    }));
    it('should delete all users', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(myUser.deleteAll).toBeDefined();
    }));
});
