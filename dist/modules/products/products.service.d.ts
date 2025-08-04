import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    createSampleData(): Promise<void>;
}
