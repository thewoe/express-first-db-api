// Imports ---------------------------------------
import express from 'express';
import modulesRouter from './routes/modules.js';
import usersRouter from './routes/users.js';

// Configure express app -------------------------
const app = express();

// Configure middleware --------------------------
app.use(express.json());

// Configure routes ------------------------------
app.use('/api/modules', modulesRouter);
app.use('/api/users', usersRouter);

// Start server ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));