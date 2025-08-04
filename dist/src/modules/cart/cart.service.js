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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const product_entity_1 = require("../products/entities/product.entity");
let CartService = class CartService {
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }
    async getUserCart(userId) {
        return this.cartRepository.find({
            where: { userId },
            relations: ['product'],
        });
    }
    async addToCart(userId, productId, quantity) {
        const product = await this.productRepository.findOne({
            where: { id: productId, isActive: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const existingCartItem = await this.cartRepository.findOne({
            where: { userId, productId },
        });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            return this.cartRepository.save(existingCartItem);
        }
        else {
            const cartItem = this.cartRepository.create({
                userId,
                productId,
                quantity,
            });
            return this.cartRepository.save(cartItem);
        }
    }
    async updateCartItem(userId, cartItemId, quantity) {
        const cartItem = await this.cartRepository.findOne({
            where: { id: cartItemId, userId },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with ID ${cartItemId} not found`);
        }
        if (quantity <= 0) {
            await this.cartRepository.remove(cartItem);
            return { message: 'Cart item removed' };
        }
        cartItem.quantity = quantity;
        return this.cartRepository.save(cartItem);
    }
    async removeFromCart(userId, cartItemId) {
        const cartItem = await this.cartRepository.findOne({
            where: { id: cartItemId, userId },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with ID ${cartItemId} not found`);
        }
        await this.cartRepository.remove(cartItem);
        return { message: 'Cart item removed successfully' };
    }
    async clearCart(userId) {
        await this.cartRepository.delete({ userId });
        return { message: 'Cart cleared successfully' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map