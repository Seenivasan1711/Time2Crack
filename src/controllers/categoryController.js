import asyncHandler from 'express-async-handler';
import { Category } from '../models/index.js';
import { getCache, setCache, invalidateCache } from '../config/redis.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  // Check cache first
  const cacheKey = 'categories:all';
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  
  // If not in cache, fetch from database
  const categories = await Category.findAll();
  
  // Store in cache
  await setCache(cacheKey, JSON.stringify(categories), 3600); // Cache for 1 hour
  
  res.json(categories);
});

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Check cache first
  const cacheKey = `category:${id}`;
  const cachedData = await getCache(cacheKey);
  
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  
  // If not in cache, fetch from database
  const category = await Category.findByPk(id);
  
  if (category) {
    // Store in cache
    await setCache(cacheKey, JSON.stringify(category), 3600); // Cache for 1 hour
    res.json(category);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  const category = await Category.create({
    name,
    description
  });
  
  // Invalidate categories cache
  await invalidateCache('categories:*');
  
  res.status(201).json(category);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  const category = await Category.findByPk(req.params.id);
  
  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;
    
    const updatedCategory = await category.save();
    
    // Invalidate relevant caches
    await invalidateCache(`category:${req.params.id}`);
    await invalidateCache('categories:*');
    
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  
  if (category) {
    await category.destroy();
    
    // Invalidate relevant caches
    await invalidateCache(`category:${req.params.id}`);
    await invalidateCache('categories:*');
    
    res.json({ message: 'Category removed' });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};