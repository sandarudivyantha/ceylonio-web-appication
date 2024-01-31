const multer = require('multer');

// Set up storage strategy
const storage = multer.memoryStorage(); // Use memory storage for handling file as buffer
const upload = multer({ storage: storage });

module.exports = upload;