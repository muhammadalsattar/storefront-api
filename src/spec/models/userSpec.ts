import bcrypt from "bcrypt";
import {setupDatabase, userInstance, userOne, userOnePassword, userTwoPassword, userTwo } from "../fixtures/setup.js";

beforeEach(async () => {
    await setupDatabase();
});


describe("User model", () => {
    it("should get all users", async () => {
        const users = await userInstance.getAll();
        expect(users).toEqual([userOne]);
    });
    it("should get user by id", async () => {
        const user = await userInstance.getById(userOne.id);
        expect(user).toEqual(userOne);
    });
    it("should create user", async () => {
        const user = await userInstance.create(userTwo);
        expect(user.email).toEqual(userTwo.email);
        expect(user.username).toEqual(userTwo.username);
        expect(bcrypt.compareSync(userTwoPassword, user.password)).toBe(true);
    });
    it("should login user", async () => {
        const user = await userInstance.login(userOne.username, userOnePassword);
        expect(user).toEqual(userOne);
    });
    it("should delete user", async () => {
        const user = await userInstance.delete(userOne.id);
        expect(user).toEqual(userOne);
    });
    it("should delete all users", async () => {
        const users = await userInstance.deleteAll();
        expect(users).toEqual([]);
    });
});