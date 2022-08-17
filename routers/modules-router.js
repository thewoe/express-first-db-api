// Imports ---------------------------------------
import { Router } from 'express';
import Validator from '../validator/Validator.js';
import schema from '../validator/modules-schema.js';
import Accessor from '../model/database/Accessor.js';
import model from '../model/database/modules-model.js';
import Controller from '../controller/Controller.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// Configure validator ---------------------------
const validator = new Validator(schema);

// Configure accessor ----------------------------
const accessor = new Accessor(model);

// Configure controller --------------------------
const controller = new Controller(validator, accessor);

// Methods ---------------------------------------
// Create record
router.post('/', controller.post);

// Read specific record
router.get('/:id', controller.get);

// Update specific record
router.put('/:id', controller.put);

// Delete specific record
router.delete('/:id', controller.delete);

// List all modules
router.get('/', controller.list);

export default router;