import express from 'express';

import authRoutes from './authRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import paymentMethodRoutes from './paymentMethodRoutes.js';
import productRoutes from './productRoutes.js';
import shippingAddressRoutes from './shippingAddressRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use(cartRoutes);
router.use(orderRoutes);
router.use(paymentMethodRoutes);
router.use(productRoutes);
router.use(shippingAddressRoutes);
router.use(userRoutes);

export default router; 