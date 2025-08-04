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
                name: 'Wireless Noise-Cancelling Headphones',
                description: 'Premium wireless headphones with active noise cancellation for an immersive audio experience.',
                price: 299.99,
                stock: 15,
                slug: 'wireless-noise-cancelling-headphones',
                imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                isActive: true,
            },
            {
                name: 'Smart Fitness Watch',
                description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
                price: 199.99,
                stock: 20,
                slug: 'smart-fitness-watch',
                imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                isActive: true,
            },
            {
                name: 'Ergonomic Office Chair',
                description: 'Comfortable office chair with lumbar support and adjustable height for better posture.',
                price: 249.99,
                stock: 8,
                slug: 'ergonomic-office-chair',
                imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                isActive: true,
            },
            {
                name: 'Organic Cotton T-Shirt',
                description: 'Soft and breathable t-shirt made from 100% organic cotton.',
                price: 29.99,
                stock: 50,
                slug: 'organic-cotton-tshirt',
                imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                isActive: true,
            },
            {
                name: 'Professional Blender',
                description: 'High-powered blender for smoothies, soups, and more with multiple speed settings.',
                price: 129.99,
                stock: 12,
                slug: 'professional-blender',
                imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                isActive: true,
            },
            {
                name: 'Leather Wallet',
                description: 'Genuine leather wallet with multiple card slots and RFID protection.',
                price: 49.99,
                stock: 30,
                slug: 'leather-wallet',
                imageUrl: 'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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