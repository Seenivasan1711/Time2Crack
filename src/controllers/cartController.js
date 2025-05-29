import asyncHandler from 'express-async-handler';
import { Cart, CartItem, Product } from '../models/index.js';
import { logger } from '../utils/logger.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Find or create cart
  let [cart] = await Cart.findOrCreate({
    where: { userId },
    defaults: { userId }
  });
  
  // Get cart items with product details
  const cartItems = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product }]
  });
  
  res.json({
    id: cart.id,
    userId: cart.userId,
    items: cartItems,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
export const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;
  
  // Validate product
  const product = await Product.findByPk(productId);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }
  
  // Find or create cart
  let [cart] = await Cart.findOrCreate({
    where: { userId },
    defaults: { userId }
  });
  
  // Check if item already exists in cart
  let cartItem = await CartItem.findOne({
    where: { cartId: cart.id, productId }
  });
  
  if (cartItem) {
    // Update quantity
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    // Create new cart item
    cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
      price: product.price
    });
  }
  
  // Get updated cart
  const cartItems = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product }]
  });
  
  res.status(201).json({
    id: cart.id,
    userId: cart.userId,
    items: cartItems,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// @desc    Update cart item
// @route   PUT /api/cart/items/:id
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { quantity } = req.body;
  
  // Find user cart
  const cart = await Cart.findOne({ where: { userId } });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  
  // Find cart item
  const cartItem = await CartItem.findOne({
    where: { id, cartId: cart.id },
    include: [{ model: Product }]
  });
  
  if (!cartItem) {
    res.status(404);
    throw new Error('Cart item not found');
  }
  
  // Check stock
  if (cartItem.Product.stock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }
  
  // Update quantity
  if (quantity > 0) {
    cartItem.quantity = quantity;
    await cartItem.save();
  } else {
    await cartItem.destroy();
  }
  
  // Get updated cart
  const cartItems = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product }]
  });
  
  res.json({
    id: cart.id,
    userId: cart.userId,
    items: cartItems,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:id
// @access  Private
export const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  
  // Find user cart
  const cart = await Cart.findOne({ where: { userId } });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  
  // Find and remove cart item
  const cartItem = await CartItem.findOne({
    where: { id, cartId: cart.id }
  });
  
  if (!cartItem) {
    res.status(404);
    throw new Error('Cart item not found');
  }
  
  await cartItem.destroy();
  
  // Get updated cart
  const cartItems = await CartItem.findAll({
    where: { cartId: cart.id },
    include: [{ model: Product }]
  });
  
  res.json({
    id: cart.id,
    userId: cart.userId,
    items: cartItems,
    totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Find user cart
  const cart = await Cart.findOne({ where: { userId } });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  
  // Remove all cart items
  await CartItem.destroy({
    where: { cartId: cart.id }
  });
  
  res.json({
    id: cart.id,
    userId: cart.userId,
    items: [],
    totalItems: 0,
    totalPrice: 0
  });
});

export default {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};