// Imports ---------------------------------------
import joi from 'joi';
import { tableOfUsers } from '../data/tableOfUsers.js';

// Schema ----------------------------------------
const idSchema = joi.number().integer().min(1).required();

const objSchema = joi.object({
  UserID: joi.number().integer(),
  UserFirstname: joi.string().min(1),
  UserLastname: joi.string().min(1),
  UserEmail: joi.string().email(),
  UserPassword: joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
  UserRegistered: joi.boolean(),
  UserUsertypeID: joi.number().integer(),
  UserLevel: joi.number().integer().min(3).max(7),
  UserImageURL: joi.string().uri()
});

const mutableAttributes = ['UserFirstname', 'UserLastname', 'UserEmail', 'UserPassword', 'UserRegistered', 'UserUsertypeID', 'UserLevel', 'UserImageURL'];

const createSchema = objSchema.and(...mutableAttributes);

const updateSchema = joi.object({
  id: idSchema,
  obj: objSchema.or(...mutableAttributes)
});

// Methods ---------------------------------------
const reportErrors = error => error.details.map((detail) => detail.message);

// Create record
const post = (req, res) => {
    // Validate request
    const { error } = createSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ Message: reportErrors(error) });
    // Access data model
    const newUser = { ...req.body, "UserID": tableOfUsers.reduce((max, curr) => curr.UserID > max.UserID ? curr : max).UserID + 1 };
    tableOfUsers.push(newUser);
    // Response to request
    res.json(newUser);
};

// Read specific record
const get = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id);
  if (error) return res.status(400).json({ Message: reportErrors(error) });
  // Access data model
  const user = tableOfUsers.find((user) => user.UserID === parseInt(req.params.id));
  if (!user) return res.status(404).json({ Message: `Record ${req.params.id} not found` });
  // Response to request
  res.json(user);
};

// Update specific record
const put = (req, res) => {
  // Validate request
  const { error } = updateSchema.validate({ id: req.params.id, obj: req.body }, { abortEarly: false });
  if (error) return res.status(400).json({ Message: reportErrors(error) });
  // Access data model
  const user = tableOfUsers.find((user) => user.UserID === parseInt(req.params.id));
  if (!user) return res.status(404).json({ Message: `Record ${req.params.id} not found` });
  mutableAttributes.map((key) => user[key] = req.body[key] || user[key]);
    // Response to request
  res.json(user);
};

// Delete specific record
const _delete = (req, res) => {
  // Validate request
  const { error } = idSchema.validate(req.params.id);
  if (error) return res.status(400).json({ Message: reportErrors(error) });
  // Access data model
  const index = tableOfUsers.findIndex((user) => user.UserID === parseInt(req.params.id));
  if (index < 0) return res.status(404).json({ Message: `Record ${req.params.id} not found` });
  tableOfUsers.splice(index, 1);
  // Response to request
  res.json({ Message: `Record ${req.params.id} deleted` });
};

// List all users
const list = (req, res) => {
    // Validate request
    // Access data model
    // Response to request
    res.json(tableOfUsers);
};

// Compose Controller ----------------------------
const controller = {};
controller.list = list;
controller.get = get;
controller.post = post;
controller.put = put;
controller.delete = _delete;

export default controller;