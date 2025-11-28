import express from 'express';
import { body } from 'express-validator';
import validate from '../Middlewares/validation.js';
import { register, login } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', [
  body('email')
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),

  // Campos opcionales con validación
  body('role')
    .optional()
    .isIn(['admin', 'customer', 'guest']).withMessage('Role must be admin, customer, or guest'),
], validate, register);

router.post('/login', [
  body('email')
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('password is required')
], validate, login);

export default router;