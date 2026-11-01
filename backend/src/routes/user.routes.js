import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();


router.get('/profile', authMiddleware, userController.getProfile);

export default router;