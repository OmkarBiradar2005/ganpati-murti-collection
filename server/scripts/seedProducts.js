const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    modelNumber: 'Model 1',
    size: '12 inch',
    price: 2200,
    description: 'Compact eco-friendly idol with vibrant hand-painted details.',
    imageUrl: 'https://images.unsplash.com/photo-1627556592933-6a7bfe7f1d7b?auto=format&fit=crop&w=1200&q=80',
    availability: 'Available',
    featured: true,
  },
  {
    modelNumber: 'Model 2',
    size: '18 inch',
    price: 3800,
    description: 'Traditional posture with premium finish and attractive crown detailing.',
    imageUrl: 'https://images.unsplash.com/photo-1565809603307-0b8d6a1f2f6e?auto=format&fit=crop&w=1200&q=80',
    availability: 'Available',
    featured: true,
  },
  {
    modelNumber: 'Model 3',
    size: '2 feet',
    price: 6500,
    description: 'Grand centerpiece murti for home mandaps and community celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1558156573-1f8b5b5b0d22?auto=format&fit=crop&w=1200&q=80',
    availability: 'Sold Out',
    featured: false,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Sample products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedProducts();
}

module.exports = seedProducts;
