import express from 'express';
import { body, param, query } from 'express-validator';
import validate from '../Middlewares/validation.js';
import {
  getAllUsers,
  getUserById,
  changePassword,
  updateUser,
  deleteUser,
  searchUser, 
  createUser,
} from '../Controllers/userController.js';
import authMiddleware from '../Middlewares/authMiddleware.js'; // Middleware de autenticación
import isAdmin from '../Middlewares/isAdminMiddleware.js'; // Middleware de admin

const router = express.Router();

// Validaciones comunes para actualizar perfil
const profileValidations = [
  body('email')
    .optional()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
];

// Obtener todos los usuarios (solo admin)
router.get('/users/getAll', authMiddleware, isAdmin, getAllUsers);

router.get('/users/search', authMiddleware, isAdmin, searchUser);

// Obtener usuario por ID (solo admin)
router.get('/users/:userId', [
  param('userId')
    .isMongoId().withMessage('User ID must be a valid MongoDB ObjectId')
], validate, authMiddleware, isAdmin, getUserById);


router.post('/users',profileValidations, validate, authMiddleware, isAdmin, createUser);
// Cambiar contraseña
router.put('/users/change-password', [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),

  body('newPassword')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
    .matches(/\d/).withMessage('New password must contain at least one number')
    .matches(/[a-zA-Z]/).withMessage('New password must contain at least one letter'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    })
], validate, authMiddleware, changePassword);

// Actualizar usuario (solo admin)
router.put('/users/:userId', [
  param('userId')
    .isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
  ...profileValidations,
  body('role')
    .optional()
    .isIn(['admin', 'customer']).withMessage('Role must be admin, customer, or guest'),
], validate, authMiddleware, isAdmin, updateUser);

// Eliminar usuario (solo admin)
router.delete('/users/:userId', [
  param('userId')
    .isMongoId().withMessage('User ID must be a valid MongoDB ObjectId')
], validate, authMiddleware, isAdmin, deleteUser);

export default router;