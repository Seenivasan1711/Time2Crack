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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const product_entity_1 = require("../products/entities/product.entity");
const enums_1 = require("../../common/enums");
let OrdersService = class OrdersService {
    constructor(orderRepository, orderItemRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }
    async getUserOrders(userId) {
        return this.orderRepository.find({
            where: { userId },
            relations: ['orderItems', 'orderItems.product'],
            order: { createdAt: 'DESC' },
        });
    }
    async getOrderById(userId, orderId) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId, userId },
            relations: ['orderItems', 'orderItems.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        return order;
    }
    async createOrder(userId, createOrderDto) {
        const { items, totalAmount, shippingAddress, deliveryDate } = createOrderDto;
        const order = this.orderRepository.create({
            userId,
            status: enums_1.OrderStatus.PENDING,
            totalAmount,
            shippingAddress,
            deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        });
        const savedOrder = await this.orderRepository.save(order);
        const orderItems = items.map((item) => {
            return this.orderItemRepository.create({
                orderId: savedOrder.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            });
        });
        await this.orderItemRepository.save(orderItems);
        return this.getOrderById(userId, savedOrder.id);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map