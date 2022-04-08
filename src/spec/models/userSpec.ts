import User, {user} from "../../models/user.js";

const myUser = new User();


describe("User model", () => {
    it("should get all users", async () => {
        expect(myUser.getAll()).toBeDefined();
    });

    it("should get user by id", async () => {
        const newUser = await myUser.getById(1);
        expect(myUser.getById).toBeDefined();
        expect(newUser.id).toBe(1);
    });

    it("should create user", async () => {
        expect(myUser.create).toBeDefined();
    });

    it("should login user", async () => {
        expect(myUser.login("test", "test")).toBeDefined();
    });

    it("should update user", async () => {
        expect(myUser.update).toBeDefined();
    });

    it("should delete user", async () => {
        expect(myUser.delete).toBeDefined();
    });

    it('should delete all users', async () => {
        expect(myUser.deleteAll).toBeDefined();
    });
});