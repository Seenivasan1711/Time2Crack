import express from 'express';
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);

// Admin routes
router.get('/admin/all', admin, getOrders);
router.put('/:id/status', admin, updateOrderStatus);
router.put('/:id/payment', admin, updatePaymentStatus);

export default router;