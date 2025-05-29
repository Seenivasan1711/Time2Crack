import express from 'express';
import {
  chatWithAssistant,
  getRecommendations
} from '../controllers/assistantController.js';

const router = express.Router();

router.post('/chat', chatWithAssistant);
router.get('/recommendations', getRecommendations);

export default router;