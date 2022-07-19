// Imports ---------------------------------------
import { Router } from 'express';
import { tableOfUsers } from '../data/tableOfUsers.js';

// Configure CRUDL endpoints ---------------------
const router = Router();
// List all users
router.get('/', (req, res) => {
    // Validate request
    // Access data model
    // Response to request
    res.json(tableOfUsers);
});

// Read specific record
router.get('/:id', (req, res) => {
    // Validate request
    // Access data model
    const user = tableOfUsers.find((user) => user.UserID === parseInt(req.params.id));
    if (!user) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
    // Response to request
    res.json(user);
});

// Create record
router.post('/', (req, res) => {
    // Validate request
    // Access data model
    const newUser = { ...req.body, "UserID": tableOfUsers.reduce((maxval,current) => Math.max(maxval,current)) + 1 };
    tableOfUsers.push(newUser);
    // Response to request
    res.json(newUser);
});

// Update specific record
router.put('/:id', (req, res) => {
    // Validate request
    // Access data model
    const user = tableOfUsers.find((user) => user.UserID === parseInt(req.params.id));
    if (!user) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
    user.UserFirstname = req.body.UserFirstname || user.UserFirstname;
    user.UserLastname = req.body.UserLastname || user.UserLastname;
    user.UserEmail = req.body.UserEmail || user.UserEmail;
    user.UserPassword = req.body.UserPassword || user.UserPassword;
    user.UserRegistered = req.body.UserRegistered || user.UserRegistered;
    user.UserUsertypeID = req.body.UserUsertypeID || user.UserUsertypeID;
    user.UserLevel = req.body.UserLevel || user.UserLevel;
    user.UserImageURL = req.body.UserImageURL || user.UserImageURL;
    // Response to request
    res.json(user);
});

// Delete specific record
router.delete('/:id', (req, res) => {
    // Validate request
    // Access data model
    const arrayIndex = tableOfUsers.findIndex((user) => user.UserID === parseInt(req.params.id));
    if (arrayIndex < 0) return res.status(404).json({ Message: `Record ${req.params.id} not found`});
    tableOfUsers.splice(arrayIndex, 1);
    // Response to request
    res.json({ Message: `Record ${req.params.id} deleted`});
});

export default router;