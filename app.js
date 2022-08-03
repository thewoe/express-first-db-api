// Imports ---------------------------------------
import express from 'express';
import cors from 'cors';
import modulesRouter from './routers/modules-router.js';
import usersRouter from './routers/users-router.js';

// Configure express app -------------------------
const app = express();

// Configure middleware --------------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({origin: '*'}));
app.use(express.json());

// Configure routes ------------------------------
app.use('/api/Modules', modulesRouter);
app.use('/api/Users', usersRouter);

// Start server ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));