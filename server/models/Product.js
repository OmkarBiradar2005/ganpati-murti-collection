const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    modelNumber: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    availability: { type: String, enum: ['Available', 'Sold Out'], default: 'Available' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ modelNumber: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
