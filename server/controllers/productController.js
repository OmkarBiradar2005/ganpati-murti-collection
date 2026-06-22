const Product = require('../models/Product');
const localProductsStore = require('../data/localProductsStore');

const dbEnabled = () => Boolean(process.env.MONGODB_URI);

const applyFilters = (items, filters) => {
  const { featured, availability, modelNumber, size, minPrice, maxPrice } = filters;

  return items.filter((product) => {
    const matchesFeatured = featured === undefined
      || (featured === 'true' && product.featured)
      || (featured === 'false' && !product.featured);
    const matchesAvailability = availability ? product.availability === availability : true;
    const matchesModel = modelNumber ? product.modelNumber.toLowerCase().includes(String(modelNumber).toLowerCase()) : true;
    const matchesSize = size ? product.size.toLowerCase().includes(String(size).toLowerCase()) : true;
    const matchesMin = minPrice ? Number(product.price) >= Number(minPrice) : true;
    const matchesMax = maxPrice ? Number(product.price) <= Number(maxPrice) : true;

    return matchesFeatured && matchesAvailability && matchesModel && matchesSize && matchesMin && matchesMax;
  });
};

const getProducts = async (req, res) => {
  if (!dbEnabled()) {
    const products = applyFilters(await localProductsStore.getAllProducts(), req.query).sort((a, b) => Number(b.featured) - Number(a.featured));
    return res.json(products);
  }

  const { featured, availability, modelNumber, size, minPrice, maxPrice } = req.query;
  const filter = {};

  if (featured === 'true') filter.featured = true;
  if (featured === 'false') filter.featured = false;
  if (availability) filter.availability = availability;
  if (modelNumber) filter.modelNumber = { $regex: modelNumber, $options: 'i' };
  if (size) filter.size = { $regex: size, $options: 'i' };
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);

  const products = await Product.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json(products);
};

const getProductById = async (req, res) => {
  if (!dbEnabled()) {
    const product = await localProductsStore.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

const createProduct = async (req, res) => {
  if (!dbEnabled()) {
    const product = await localProductsStore.createProduct(req.body);
    return res.status(201).json(product);
  }

  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  if (!dbEnabled()) {
    const product = await localProductsStore.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

const deleteProduct = async (req, res) => {
  if (!dbEnabled()) {
    const product = await localProductsStore.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ message: 'Product deleted successfully' });
  }

  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ message: 'Product deleted successfully' });
};

const getFeaturedProducts = async (req, res) => {
  if (!dbEnabled()) {
    return res.json(await localProductsStore.getFeaturedProducts());
  }

  const products = await Product.find({ featured: true }).sort({ createdAt: -1 });
  res.json(products);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
};
