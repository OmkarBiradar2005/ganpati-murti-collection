const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { uploadImage } = require('../controllers/uploadController');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;
