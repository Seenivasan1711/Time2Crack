import { Product } from '../../products/entities/product.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    slug: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
