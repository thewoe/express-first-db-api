// Imports ---------------------------------------
import express from 'express';

// Configure express app -------------------------
const app = express();
import { tableOfModules } from './data/tableOfModules.js';

// Configure middleware --------------------------

// Configure CRUDL endpoints ---------------------
// List all modules
app.get('/api/modules', (req, res) => {
    // Validate request
    // Access data model
    // Response to request
    res.json(tableOfModules);
});

// Read specific record
app.get('/api/modules/:id', (req, res) => {
    // Validate request
    // Access data model
    const module = tableOfModules.find((module) => module.ModuleID === parseInt(req.params.id));
    if (!module) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
    // Response to request
    res.json(module);
});


// Start server ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));