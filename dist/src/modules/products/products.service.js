"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAll() {
        return this.productRepository.find({
            where: { isActive: true },
            relations: ['category'],
        });
    }
    async findById(id) {
        const product = await this.productRepository.findOne({
            where: { id, isActive: true },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async createSampleData() {
        const existingProducts = await this.productRepository.count();
        if (existingProducts > 0) {
            return;
        }
        const sampleProducts = [
            {
                name: 'Premium Sparklers Pack',
                description: 'High-quality sparklers for celebrations and parties',
                price: 299.99,
                stock: 15,
                slug: 'premium-sparklers-pack',
                imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
                isActive: true,
            },
            {
                name: 'Fireworks Display Kit',
                description: 'Complete fireworks kit for grand celebrations',
                price: 199.99,
                stock: 20,
                slug: 'fireworks-display-kit',
                imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
                isActive: true,
            },
            {
                name: 'Traditional Laddu',
                description: 'Authentic traditional laddu made with pure ingredients',
                price: 249.99,
                stock: 8,
                slug: 'traditional-laddu',
                imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg',
                isActive: true,
            },
            {
                name: 'Gulab Jamun Mix',
                description: 'Premium gulab jamun mix for homemade sweets',
                price: 29.99,
                stock: 50,
                slug: 'gulab-jamun-mix',
                imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
                isActive: true,
            },
            {
                name: 'Chocolate Cake',
                description: 'Delicious chocolate cake for celebrations',
                price: 129.99,
                stock: 12,
                slug: 'chocolate-cake',
                imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
                isActive: true,
            },
            {
                name: 'Ice Cream Sundae',
                description: 'Premium ice cream sundae with toppings',
                price: 49.99,
                stock: 30,
                slug: 'ice-cream-sundae',
                imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg',
                isActive: true,
            },
        ];
        for (const productData of sampleProducts) {
            const product = this.productRepository.create(productData);
            await this.productRepository.save(product);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map