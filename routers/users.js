// Imports ---------------------------------------
import { Router } from 'express';
import controller from '../controllers/users-controller.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// Create record
router.post('/', controller.post);

// Read specific record
router.get('/:id', controller.get);

// Update specific record
router.put('/:id', controller.put);

// Delete specific record
router.delete('/:id', controller.delete);

// List all users
router.get('/', controller.list);

export default router;