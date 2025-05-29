import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { Product, Category } from '../models/index.js';
import { getCache, setCache, invalidateCache } from '../config/redis.js';
import { logger } from '../utils/logger.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  // Check cache first
  const cacheKey = `products:page${page}:limit${limit}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  
  // If not in cache, fetch from database
  const { count, rows: products } = await Product.findAndCountAll({
    limit,
    offset,
    include: [{ model: Category, attributes: ['id', 'name'] }]
  });
  
  const result = {
    products,
    page,
    pages: Math.ceil(count / limit),
    total: count
  };
  
  // Store in cache
  await setCache(cacheKey, JSON.stringify(result), 3600); // Cache for 1 hour
  
  res.json(result);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Check cache first
  const cacheKey = `product:${id}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  
  // If not in cache, fetch from database
  const product = await Product.findByPk(id, {
    include: [{ model: Category, attributes: ['id', 'name'] }]
  });
  
  if (product) {
    // Store in cache
    await setCache(cacheKey, JSON.stringify(product), 3600); // Cache for 1 hour
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
  const { query, category } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  // Check cache first
  const cacheKey = `products:search:${query || ''}:category:${category || ''}:page${page}:limit${limit}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  
  // Build query conditions
  const whereConditions = {};
  
  if (query) {
    whereConditions[Op.or] = [
      { title: { [Op.iLike]: `%${query}%` } },
      { description: { [Op.iLike]: `%${query}%` } }
    ];
  }
  
  if (category) {
    whereConditions.categoryId = category;
  }
  
  // If not in cache, fetch from database
  const { count, rows: products } = await Product.findAndCountAll({
    where: whereConditions,
    limit,
    offset,
    include: [{ model: Category, attributes: ['id', 'name'] }]
  });
  
  const result = {
    products,
    page,
    pages: Math.ceil(count / limit),
    total: count
  };
  
  // Store in cache
  await setCache(cacheKey, JSON.stringify(result), 3600); // Cache for 1 hour
  
  res.json(result);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock, categoryId, imageUrl } = req.body;
  
  const product = await Product.create({
    title,
    description,
    price,
    stock,
    categoryId,
    imageUrl
  });
  
  // Invalidate relevant caches
  await invalidateCache('products:*');
  
  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock, categoryId, imageUrl } = req.body;
  
  const product = await Product.findByPk(req.params.id);
  
  if (product) {
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.categoryId = categoryId || product.categoryId;
    product.imageUrl = imageUrl || product.imageUrl;
    
    const updatedProduct = await product.save();
    
    // Invalidate relevant caches
    await invalidateCache(`product:${req.params.id}`);
    await invalidateCache('products:*');
    
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  
  if (product) {
    await product.destroy();
    
    // Invalidate relevant caches
    await invalidateCache(`product:${req.params.id}`);
    await invalidateCache('products:*');
    
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export default {
  getProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct
};