import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Promise<import("./entities/product.entity").Product[]>;
    getProductById(id: string): Promise<import("./entities/product.entity").Product>;
}
