const { randomUUID } = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const seedProducts = require('./mockProducts');

const storePath = path.join(__dirname, 'localProducts.json');

const ensureStore = async () => {
  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(seedProducts, null, 2), 'utf8');
  }
};

const readProducts = async () => {
  await ensureStore();
  const raw = await fs.readFile(storePath, 'utf8');
  const parsed = JSON.parse(raw || '[]');
  return parsed.map((product) => ({
    ...product,
    createdAt: product.createdAt || new Date().toISOString(),
    _id: product._id || randomUUID(),
  }));
};

const writeProducts = async (products) => {
  await fs.writeFile(storePath, JSON.stringify(products, null, 2), 'utf8');
};

const getAllProducts = async () => readProducts();

const getProductById = async (id) => {
  const products = await readProducts();
  return products.find((product) => product._id === id) || null;
};

const createProduct = async (payload) => {
  const products = await readProducts();
  const newProduct = {
    _id: randomUUID(),
    createdAt: new Date().toISOString(),
    modelNumber: payload.modelNumber,
    size: payload.size,
    price: Number(payload.price),
    description: payload.description,
    imageUrl: payload.imageUrl,
    availability: payload.availability || 'Available',
    featured: Boolean(payload.featured),
  };

  products.unshift(newProduct);
  await writeProducts(products);
  return newProduct;
};

const updateProduct = async (id, payload) => {
  const products = await readProducts();
  const index = products.findIndex((product) => product._id === id);

  if (index === -1) {
    return null;
  }

  const updatedProduct = {
    ...products[index],
    ...payload,
    price: payload.price !== undefined ? Number(payload.price) : products[index].price,
    featured: payload.featured !== undefined ? Boolean(payload.featured) : products[index].featured,
  };

  products[index] = updatedProduct;
  await writeProducts(products);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const products = await readProducts();
  const index = products.findIndex((product) => product._id === id);

  if (index === -1) {
    return null;
  }

  const [deletedProduct] = products.splice(index, 1);
  await writeProducts(products);
  return deletedProduct;
};

const getFeaturedProducts = async () => {
  const products = await readProducts();
  return products.filter((product) => product.featured);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
};
