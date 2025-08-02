import { Category } from '../../categories/entities/category.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    slug: string;
    imageUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}
