const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const cloudinaryEnabled = () =>
  Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

const bufferToDataUrl = (file) => {
  const mimeType = file.mimetype || 'image/jpeg';
  return `data:${mimeType};base64,${file.buffer.toString('base64')}`;
};

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  if (!cloudinaryEnabled()) {
    return res.status(201).json({
      imageUrl: bufferToDataUrl(req.file),
      publicId: null,
      provider: 'local-data-url',
    });
  }

  const uploadFromBuffer = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'ganpati-murti-collection',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

  const result = await uploadFromBuffer();
  res.status(201).json({ imageUrl: result.secure_url, publicId: result.public_id });
};

module.exports = { uploadImage };
