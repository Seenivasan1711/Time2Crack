import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { Order, OrderItem, Cart, CartItem, Product } from '../models/index.js';
import { sendToKafka } from '../config/kafka.js';
import { logger } from '../utils/logger.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, paymentMethod } = req.body;
  
  // Find user cart
  const cart = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        as: 'items',
        include: [{ model: Product }]
      }
    ]
  });
  
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('No items in cart');
  }
  
  // Calculate total amount
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Create order
  const order = await Order.create({
    userId,
    totalAmount,
    shippingAddress,
    paymentMethod,
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: 'pending',
    paymentStatus: 'pending'
  });
  
  // Create order items from cart
  const orderItems = await Promise.all(
    cart.items.map(async (item) => {
      // Create product snapshot
      const productSnapshot = {
        id: item.Product.id,
        title: item.Product.title,
        price: item.Product.price,
        imageUrl: item.Product.imageUrl
      };
      
      // Update product stock
      const product = await Product.findByPk(item.productId);
      product.stock -= item.quantity;
      await product.save();
      
      // Create order item
      return OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        productSnapshot,
        quantity: item.quantity,
        price: item.price
      });
    })
  );
  
  // Clear cart
  await CartItem.destroy({
    where: { cartId: cart.id }
  });
  
  // Schedule delivery using Kafka
  await sendToKafka('scheduled_deliveries', {
    orderId: order.id,
    userId,
    deliveryDate: order.deliveryDate,
    status: order.status,
    items: orderItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }))
  });
  
  // Return order details
  const createdOrder = await Order.findByPk(order.id, {
    include: [
      {
        model: OrderItem,
        as: 'items'
      }
    ]
  });
  
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: OrderItem,
        as: 'items'
      }
    ]
  });
  
  if (order) {
    // Check if order belongs to user or user is admin
    if (order.userId === req.user.id || req.user.role === 'admin') {
      res.json(order);
    } else {
      res.status(403);
      throw new Error('Not authorized to access this order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  const { count, rows: orders } = await Order.findAndCountAll({
    where: { userId: req.user.id },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: OrderItem,
        as: 'items'
      }
    ]
  });
  
  res.json({
    orders,
    page,
    pages: Math.ceil(count / limit),
    total: count
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const order = await Order.findByPk(req.params.id);
  
  if (order) {
    order.status = status;
    
    // If order is delivered, update delivery date to now
    if (status === 'delivered') {
      order.deliveryDate = new Date();
    }
    
    const updatedOrder = await order.save();
    
    // Publish to Kafka for delivery updates
    if (['processing', 'shipped', 'delivered'].includes(status)) {
      await sendToKafka('scheduled_deliveries', {
        orderId: order.id,
        userId: order.userId,
        deliveryDate: order.deliveryDate,
        status: order.status
      });
    }
    
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private/Admin
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body;
  
  const order = await Order.findByPk(req.params.id);
  
  if (order) {
    order.paymentStatus = paymentStatus;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders (admin)
// @route   GET /api/orders/admin
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  const { count, rows: orders } = await Order.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: OrderItem,
        as: 'items'
      }
    ]
  });
  
  res.json({
    orders,
    page,
    pages: Math.ceil(count / limit),
    total: count
  });
});

export default {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getOrders
};