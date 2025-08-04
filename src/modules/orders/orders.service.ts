import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { OrderStatus } from '../../common/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getUserOrders(userId: number) {
    return this.orderRepository.find({
      where: { userId },
      relations: ['orderItems', 'orderItems.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOrderById(userId: number, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId },
      relations: ['orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }

  async createOrder(userId: number, createOrderDto: any) {
    const { items, totalAmount, shippingAddress, deliveryDate } = createOrderDto;

    // Create the order
    const order = this.orderRepository.create({
      userId,
      status: OrderStatus.PENDING,
      totalAmount,
      shippingAddress,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const orderItems = items.map((item: any) => {
      return this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      });
    });

    await this.orderItemRepository.save(orderItems);

    // Return the complete order with items
    return this.getOrderById(userId, savedOrder.id);
  }
} 