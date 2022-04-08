import Product, {product} from "../../models/product.js";

describe("Product model", () => {
    it("should get all products", async () => {
        const product = new Product();
        expect(product.getAll()).toBeDefined();
    });

    it("should get product by id", async () => {
        const product = new Product();
        const newProduct = await product.getById(1);
        expect(product).toBeDefined();
        expect(newProduct.id).toBe(1);
    });

    it("should create product", async () => {
        const product = new Product();
        const myProduct: product = {
            id: 6,
            name: "test",
            price: 10,
            category_id: 1
        };
        const newProduct = await product.create(myProduct);
        expect(newProduct).toBeDefined();
        expect(newProduct.name).toBe("test");
        expect(newProduct.price).toBe(10);
        expect(newProduct.category_id).toBe(1);
    });

    it("should get products by category id", async () => {
        const product = new Product();
        const products = await product.getByCategoryId(1);
        expect(product.getByCategoryId).toBeDefined();
        expect(products[0].category_id).toBe(1);
    });
});
