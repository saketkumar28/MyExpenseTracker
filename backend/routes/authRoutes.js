const express = require('express'); // Fixed typo in 'express'
const { protect } = require('../middleware/authMiddleware'); // Ensure this path is correct

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUserInfo', protect ,getUserInfo);

router.post('/upload-image',upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // Construct the image URL
    res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: imageUrl, // Return the image URL
    });
}
);
module.exports = router;
