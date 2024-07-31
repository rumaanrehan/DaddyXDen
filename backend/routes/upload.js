const multer = require('multer');
const path = require('path');
const express = require('express');
const app  =express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Creating upload endpoint for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

//ROUTE 1 :Get image URL: POST "http://localhost:4000/api/upload"
app.post("/upload", upload.array('product', 5), (req, res) => {  // Allow up to 5 files
  if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: 0, message: 'No files uploaded' });
  }

  const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);

  res.json({
      success: 1,
      image_urls: imageUrls
  });
}); 


module.exports = app;