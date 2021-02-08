const express = require('express')
const upload = require("../middleware/upload");

const router = express.Router()
const userController =   require('../controllers/user.controller');

const uploadController = require("../controllers/upload");
// Retrieve all users
router.get('/', userController.findAll);
// Create a new user
router.post('/',upload.single("file"),  userController.create);
// Retrieve a single user with id
router.get('/:id', userController.findById);
// Update a user with id
router.put('/:id', userController.update);
// Delete a user with id
router.delete('/:id', userController.delete);

router.post("/uploadImage", upload.single("file"), userController.UploadImage);
router.post("/upload", upload.single("file"), uploadController.uploadFiles);
module.exports = router