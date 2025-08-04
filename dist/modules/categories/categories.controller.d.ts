import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<import("./entities/category.entity").Category[]>;
    getCategoryById(id: string): Promise<import("./entities/category.entity").Category>;
}
