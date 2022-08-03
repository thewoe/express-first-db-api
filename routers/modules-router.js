// Imports ---------------------------------------
import { Router } from 'express';
import model from '../controllers/modules-model.js';
import schema from '../controllers/modules-schema.js';
import records from '../data/tableOfModules.js';
import Controller from '../controllers/Controller.js';

// Configure CRUDL endpoints ---------------------
const router = Router();

// Configure controller ---- ---------------------
const controller = new Controller(model, schema, records);

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