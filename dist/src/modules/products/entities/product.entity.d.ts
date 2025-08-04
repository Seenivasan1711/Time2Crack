import { Category } from '../../categories/entities/category.entity';
import { ProductStatus, ProductType } from '../../../common/enums';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    slug: string;
    imageUrl: string;
    status: ProductStatus;
    type: ProductType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}
