import asyncHandler from 'express-async-handler';
import OpenAI from 'openai';
import { Product, Category } from '../models/index.js';
import { logger } from '../utils/logger.js';
import { getAIResponse } from '../utils/aiProvider.js';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @desc    Chat with AI assistant
// @route   POST /api/assistant/chat
// @access  Public
export const chatWithAssistant = asyncHandler(async (req, res) => {
  const { message, image } = req.body;
  
  if (!message) {
    res.status(400);
    throw new Error('Please provide a message');
  }
  
  try {
    const reply = await getAIResponse({ message, image });
    res.json({ reply });
  } catch (error) {
    logger.error(`AI API error: ${error.message}`);
    res.status(500);
    throw new Error('Error communicating with AI service');
  }
});

// @desc    Get product recommendations
// @route   GET /api/assistant/recommendations
// @access  Public
export const getRecommendations = asyncHandler(async (req, res) => {
  const { productId, category, limit = 5 } = req.query;
  
  try {
    let relatedProducts;
    
    if (productId) {
      // Find the product
      const product = await Product.findByPk(productId, {
        include: [{ model: Category }]
      });
      
      if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }
      
      // Get related products in the same category
      relatedProducts = await Product.findAll({
        where: {
          categoryId: product.categoryId,
          id: { [Op.ne]: productId }
        },
        limit: parseInt(limit),
        include: [{ model: Category }]
      });
      
      // If not enough recommendations, supplement with popular products
      if (relatedProducts.length < limit) {
        const additionalProducts = await Product.findAll({
          where: {
            id: { [Op.ne]: productId },
            categoryId: { [Op.ne]: product.categoryId }
          },
          limit: parseInt(limit) - relatedProducts.length,
          include: [{ model: Category }]
        });
        
        relatedProducts = [...relatedProducts, ...additionalProducts];
      }
    } else if (category) {
      // Get products in the specified category
      relatedProducts = await Product.findAll({
        where: { categoryId: category },
        limit: parseInt(limit),
        include: [{ model: Category }]
      });
    } else {
      // Get random popular products
      relatedProducts = await Product.findAll({
        limit: parseInt(limit),
        include: [{ model: Category }],
        order: [
          ['createdAt', 'DESC']
        ]
      });
    }
    
    res.json({
      recommendations: relatedProducts
    });
  } catch (error) {
    logger.error(`Recommendation error: ${error.message}`);
    res.status(500);
    throw new Error('Error generating recommendations');
  }
});

export default {
  chatWithAssistant,
  getRecommendations
};